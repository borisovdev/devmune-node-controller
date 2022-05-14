import express, { Application } from "express";
import dotenv from "dotenv";
import routerRewardContract, {
  routeBasePath as routerRewardContractBasePath,
} from "./routes/rewardContract";
import routerRating, {
  routeBasePath as routeRatingBasePath,
} from "./routes/rating";
import { getEnvConfig } from "./utils/envs";

dotenv.config(getEnvConfig());

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello, node controller!\n`);
});

app.use(routerRewardContractBasePath, routerRewardContract);
app.use(routeRatingBasePath, routerRating);

app.listen(port, () => {
  process.stdout.write(`App listening on port ${port}\n`);
});
