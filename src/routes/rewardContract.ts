import express from "express";
import web3 from "../services/web3";
import { AbiItem } from "web3-utils";

const router = express.Router();

router.get(`/`, (req, res) => {
  web3.eth.net.getId((err, id) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }

    res.status(200).json({ network_id: 1000 });
  });
});

router.get(`/test-http`, async (req, res) => {
  try {
    const abi = await import("../contracts/artifacts/ALocalnetTestHttp.json");

    const testHttpContract = new web3.eth.Contract(
      abi.default as AbiItem[],
      "0x7320ADf9A5f6021157410154ee1B0E0E0DBc8524",
      {
        from: "0x329163a9af542BbfAD345aa11e43035c3d682Ee7",
      }
    );

    const result = await testHttpContract.methods
      .requestHelloOracle()
      .call({
        from: "0x329163a9af542BbfAD345aa11e43035c3d682Ee7",
      })
      res.json(result);
  } catch (err) {
    // @ts-ignore
    res.status(500).json({ message: `${err.message}` });
  }
});

export const routeBasePath = "/reward-contract";
export default router;
