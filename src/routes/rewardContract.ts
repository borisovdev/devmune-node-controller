import express from "express";
import web3 from "../services/web3";
import { AbiItem } from "web3-utils";

const router = express.Router();

router.get(`/`, async (req, res) => {
  res.status(200).json({ network_id: 42000 });
  // web3.eth.net.getId((err, id) => {
  //   if (err) {
  //     res.status(500).json({ message: err.message });
  //     return;
  //   }

  //   res.status(200).json({ network_id: 42000 });
  // });
});

router.get(`/test-http`, async (req, res) => {
  try {
    const abi = await import("../contracts/artifacts/ALocalnetTestHttp.json");

    const testHttpContract = new web3.eth.Contract(
      abi.default as AbiItem[],
      "0x3b2172C076e6A0C99627D21472Cc911620713A0B"
    );
    const testHttpContractMethodTestAbi = testHttpContract.methods.requestTestData().encodeABI();

    /**
     * @todo may use @ethereumjs/tx for signing transactions
     */
    const signedTestHttpContractMethodCallTransaction = await web3.eth.accounts.signTransaction({
      to: testHttpContract.options.address,
      data: testHttpContractMethodTestAbi,
      gas: 200000,
    }, "d6243f1e1582ac961236eb280e5ee6ee899480164c2f58332e4600634f2ad467");

    // @ts-ignore
    web3.eth.sendSignedTransaction(signedTestHttpContractMethodCallTransaction.rawTransaction)
      .on("receipt", (receipt: any) => {
        res.status(200).json(receipt);
      })
      .on("error", (err: Error) => {
        res.status(500).json({message: err.message});
      })
  } catch (err) {
    // @ts-ignore
    res.status(500).json({ message: `${err.message}` });
  }
});

export const routeBasePath = "/reward-contract";
export default router;
