import Web3 from "web3";

const web3: Web3 = new Web3(Web3.givenProvider || process.env.WEB3_CONNECTION_URL);

export default web3;
