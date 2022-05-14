import { Request, Response } from "express";
import ExternalAdapterInterface from "./ExternalAdapterInterface";
import ContributionItemDto from "../dtos/external-adapters/ContributionItemDto";
import ContributorsRatingDataGatewayInterface, {
  MergedPullRequestsFromDateRequestOptions,
} from "../gateways/external-adapters/ContributorsRatingDataGatewayInterface";
import ContributorRatingInterface from "./ContributorRatingInterface";
import ContributorRatingItemDto from "../dtos/external-adapters/ContributorRatingItemDto";

export default class ContributorsRatingExternalAdapter
  implements ExternalAdapterInterface, ContributorRatingInterface
{
  constructor(private dataGateway: ContributorsRatingDataGatewayInterface) {}

  /**
   *
   */
  async handleNodeRequest(req: Request, res: Response): Promise<void> {
    try {
      const optionsFromSmartContract = req.body.data;
      const optionsForGetRating: MergedPullRequestsFromDateRequestOptions = {
        repo: optionsFromSmartContract.repo,
        repoOwner: optionsFromSmartContract.repo_owner,
        recordsLimit: optionsFromSmartContract.records_limit,
        fromDate: optionsFromSmartContract.from_date_time,
        usersInRatingLimit: optionsFromSmartContract.users_in_rating_limit,
      };

      const contributorsRating = await this.getContributorsRatingFromDate(
        optionsForGetRating
      );

      res.status(200).json({
        jobRunID: req.body.id,
        data: contributorsRating,
      });
    } catch (ex) {
      res.status(500).json({
        jobRunID: req.body.id,
        status: "errored",
        // @ts-ignore
        error: ex.message,
      });
    }
  }

  /**
   *
   * @param options
   */
  async getContributorsRatingFromDate(
    options: MergedPullRequestsFromDateRequestOptions
  ): Promise<ContributorRatingItemDto[]> {
    const contributionItemsForCreateRating =
      await this.dataGateway.getAllMergedContributionsFromDate(options);

    const usersContributions =
      this._createUserContributionsFromContributionItems(
        contributionItemsForCreateRating
      );
    const contributorsRating =
      this._createContributionsRatingFromUsersContributions(usersContributions, options);

    return contributorsRating;
  }

  /**
   *
   * @param usersContributions
   * @returns
   */
  private _createContributionsRatingFromUsersContributions(
    usersContributions: UserContributionsRating,
    options: MergedPullRequestsFromDateRequestOptions
  ): ContributorRatingItemDto[] {
    return Object.entries(usersContributions)
      .map(([userLogin, contributionItems]) => {
        return {
          user_login: userLogin,
          weight: contributionItems.length,
          contributions: contributionItems,
        };
      })
      .sort((a, b) => {
        return b.weight - a.weight;
      })
      .slice(0, options.usersInRatingLimit);
  }

  /**
   *
   * @param contributions
   * @returns
   */
  private _createUserContributionsFromContributionItems(
    contributions: ContributionItemDto[]
  ): UserContributionsRating {
    return contributions.reduce((acc, pullRequest) => {
      const userLogin = pullRequest.user_login;

      if (!(userLogin in acc)) {
        acc[userLogin] = [pullRequest];
        return acc;
      }

      acc[userLogin].push(pullRequest);
      return acc;
    }, {} as UserContributionsRating);
  }
}

type UserContributionsRating = {
  [key: string]: ContributionItemDto[];
};
