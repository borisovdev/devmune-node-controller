import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import routerRewardContract, { routeBasePath as routerRewardContractBasePath } from './routes/rewardContract';
import { getEnvConfig } from "./utils/envs";

dotenv.config(getEnvConfig());

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.get("/", (req, res) => {
  res.send(`Hello, node controller!\n`);
});

app.use(routerRewardContractBasePath, routerRewardContract);

app.listen(port, () => {
  process.stdout.write(`App listening on port ${port}\n`);
});
