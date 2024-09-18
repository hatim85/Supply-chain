require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    icp: {
      url: "https://testnet.bitfinity.network",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 355113,
      gasPrice: 1000000000
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      gas: 12000000,  // Increase gas limit
      gasPrice: 8000000000,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
