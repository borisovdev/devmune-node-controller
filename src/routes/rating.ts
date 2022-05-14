import express from "express";
import ContributorsRatingExternalAdapter from "../external-adapters/ContributorsRatingExternalAdapter";
import ContibutorsRatingDataGithubApiGateway from "../gateways/external-adapters/ContibutorsRatingDataGithubApiGateway";
import ContributorsRatingExternalAdapterMapper from "../mappers/external-adapters/ContributorsRatingExternalAdapterMapper";

const router = express.Router();

const ratingExternalAdapter = new ContributorsRatingExternalAdapter(
  new ContibutorsRatingDataGithubApiGateway(
    new ContributorsRatingExternalAdapterMapper()
  )
);

router.get(`/`, (req, res) => {
  res.status(200).json({
    message: "hi",
  });
});

router.post(`/`, ratingExternalAdapter.handleNodeRequest.bind(ratingExternalAdapter));

export const routeBasePath = "/rating";
export default router;
