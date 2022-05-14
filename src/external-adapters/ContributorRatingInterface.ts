import ContributorRatingItemDto from "../dtos/external-adapters/ContributorRatingItemDto";
import { MergedPullRequestsFromDateRequestOptions } from "../gateways/external-adapters/ContributorsRatingDataGatewayInterface";

export default interface ContributorRatingInterface {
  getContributorsRatingFromDate(
    options: MergedPullRequestsFromDateRequestOptions
  ): Promise<ContributorRatingItemDto[]>;
}
