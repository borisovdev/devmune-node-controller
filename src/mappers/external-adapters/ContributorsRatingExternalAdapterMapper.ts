import ContributionItemDto from "../../dtos/external-adapters/ContributionItemDto";
import { PullRequestsSearchItemsDto } from "../../gateways/external-adapters/ContibutorsRatingDataGithubApiGateway";
import ContributorsRatingExternalAdapterMapperInterface from "./ContributorsRatingExternalAdapterMapperInterface";

export default class ContributorsRatingExternalAdapterMapper
  implements ContributorsRatingExternalAdapterMapperInterface
{
  /**
   *
   * @param dto
   * @returns
   */
  createContributorItemDtoFromPullRequestDto(
    dto: PullRequestsSearchItemsDto[0]
  ): ContributionItemDto {
    const dtoForFill = new ContributionItemDto();
    dtoForFill.body = dto.body || "";
    dtoForFill.title = dto.title;
    dtoForFill.id = dto.id;
    dtoForFill.url = dto.url;
    // @ts-ignore
    dtoForFill.user_login = dto.user.login;
    // @ts-ignore
    dtoForFill.closed_at_time = dto.closed_at;
    dtoForFill.created_at_time = dto.created_at;
    return dtoForFill;
  }
}
