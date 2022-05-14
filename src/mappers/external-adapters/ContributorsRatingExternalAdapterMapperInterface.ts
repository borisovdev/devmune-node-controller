import ContributionItemDto from "../../dtos/external-adapters/ContributionItemDto";
import { PullRequestsSearchItemsDto } from "../../gateways/external-adapters/ContibutorsRatingDataGithubApiGateway";

export default interface ContributorsRatingExternalAdapterMapperInterface {
  createContributorItemDtoFromPullRequestDto(dto: PullRequestsSearchItemsDto[0]): ContributionItemDto;
}
