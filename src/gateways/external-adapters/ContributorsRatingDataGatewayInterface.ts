import ContributionItemDto from "../../dtos/external-adapters/ContributionItemDto";
import ContributorRatingItemDto from "../../dtos/external-adapters/ContributorRatingItemDto";

export type MergedPullRequestsFromDateRequestOptions = {
  repoOwner: string;
  repo: string;
  fromDate: string; // YYYY-MM-DD
  recordsLimit: number;
  usersInRatingLimit: number;
};

export default interface ContributorsRatingDataGatewayInterface {
  getAllMergedContributionsFromDate(
    options: MergedPullRequestsFromDateRequestOptions
  ): Promise<ContributionItemDto[]>;
}
