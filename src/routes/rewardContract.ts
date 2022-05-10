import express from "express";
import web3 from '../services/web3';

const router = express.Router();

router.get(`/test-network`, (req, res) => {
  web3.eth.net.getId((err, id) => {
    if (err) {
      res.status(500).json({message: err.message});
      return;
    }

    res.status(200).json({network_id: id});
  });
});

export const routeBasePath = "contracts";
export default router;
