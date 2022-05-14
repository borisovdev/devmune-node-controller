import { paths } from "@octokit/openapi-types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import ContributionItemDto from "../../dtos/external-adapters/ContributionItemDto";
import ContributorRatingItemDto from "../../dtos/external-adapters/ContributorRatingItemDto";
import ContributorsRatingExternalAdapterMapperInterface from "../../mappers/external-adapters/ContributorsRatingExternalAdapterMapperInterface";
import ContributorsRatingDataGatewayInterface, {
  MergedPullRequestsFromDateRequestOptions,
} from "./ContributorsRatingDataGatewayInterface";

export type PullRequestsSearchItemsDto =
  paths["/search/issues"]["get"]["responses"]["200"]["content"]["application/json"]["items"];

export default class ContibutorsRatingDataGithubApiGateway
  implements ContributorsRatingDataGatewayInterface
{
  constructor(
    private mapper: ContributorsRatingExternalAdapterMapperInterface
  ) {}

  /**
   *
   * @param options
   * @returns
   */
  async getAllMergedContributionsFromDate(
    options: MergedPullRequestsFromDateRequestOptions
  ): Promise<ContributionItemDto[]> {
    const pullRequestsForMappingToContributionItems =
      await this._fetchAllMergedPullsFromDate(options);

    return pullRequestsForMappingToContributionItems.map((pullRequest) => {
      return this.mapper.createContributorItemDtoFromPullRequestDto(
        pullRequest
      );
    });
  }
  /**
   *
   * @param options
   * @returns
   */
  private _buildRequestOptionsGetAllMergedPullsFromDate = (
    options: MergedPullRequestsFromDateRequestOptions
  ): AxiosRequestConfig => {
    return {
      url: `https://api.github.com/search/issues?q=repo:${options.repoOwner}/${options.repo}+is:pr+is:merged+merged:>=${options.fromDate}&per_page=${options.recordsLimit}`,
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    };
  };

  /**
   *
   * @param options
   * @returns
   */
  private async _fetchAllMergedPullsFromDate(
    options: MergedPullRequestsFromDateRequestOptions
  ): Promise<PullRequestsSearchItemsDto> {
    const response = await axios.request<
      any,
      AxiosResponse<
        paths["/search/issues"]["get"]["responses"]["200"]["content"]["application/json"]
      >
    >(this._buildRequestOptionsGetAllMergedPullsFromDate(options));
    const pullRequests = response.data.items;

    return pullRequests;
  }
}
