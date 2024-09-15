# PharmaChain - Supply Chain on Blockchain

## Table of Contents
- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Usage](#usage)
- [Smart Contract Deployment](#smart-contract-deployment)
- [License](#license)

## About the Project

PharmaChain is a decentralized supply chain management platform built on blockchain technology. It is designed to securely track the movement of pharmaceutical products from manufacturers to pharmacies or hospitals. The project leverages the **Bitfinity Testnet** to ensure transparency, immutability, and verifiability of drug shipments using smart contracts.

By utilizing blockchain, the project aims to:
- Prevent fraud in the pharmaceutical industry.
- Enhance transparency across the entire supply chain.
- Ensure the authenticity and integrity of pharmaceutical drugs from production to delivery.


## Tech Stack

- **Blockchain Framework**: Hardhat
- **Smart Contracts**: Solidity (with OpenZeppelin Contracts)
- **Frontend**: React.js
- **Styling**: TailwindCSS
- **Libraries**:
  - Ethers.js (to interact with Ethereum blockchain)
  - React Router (for routing)
  - OpenZeppelin Contracts (for standard smart contract features)
  - Vite (for bundling and development)

## Installation


### Prerequisites

Ensure you have the following tools installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher) - for running JavaScript code on the server.
- [MetaMask](https://metamask.io/) - for connecting to the blockchain network.
- [Git](https://git-scm.com/) - for version control and repository management.
- A code editor like [VS Code](https://code.visualstudio.com/).


### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/hatim85/Supply-chain.git
   cd Supply-chain

2. **Install Dependencies**:
npm install

3. **Install Frontend Dependencies**:
cd ICP-Frontend
npm install

4. **Set Up Environment Variables: Create a .env file and add the following**:
VITE_APP_INFURA_PROJECT_ID=your_infura_project_id
VITE_APP_CONTRACT_ADDRESS=your_deployed_contract_address_on_bitfinity_testnet

5. **Run the Application: To start the frontend**:
npm run dev


## Usage
1. Connect Wallet: Ensure MetaMask is installed and connected to the Bitfinity Testnet. You can then interact with the PharmaChain application to:
Track drug shipments from manufacturers to distributors.
Approve transfer requests.
View transaction histories and drug movement data.

2. Managing Supply Chain: Use the frontend interface to create new drug batches, approve requests, and transfer drugs across different participants (e.g., manufacturers, distributors).

3. Track Shipments: The smart contracts ensure that all transaction data is recorded on the blockchain, making it easy to track the movement of each batch of drugs.


## Smart Contract Deployment
The PharmaChain smart contracts have been deployed on the Bitfinity Testnet.

# Deployment on Bitfinity Testnet
To deploy the contracts on the Bitfinity Testnet, follow these steps:

1. Configure Hardhat: In your hardhat.config.js, add the configuration for the Bitfinity Testnet:

require("@nomicfoundation/hardhat-ethers");

module.exports = {
  networks: {
    bitfinityTestnet: {
      url: "https://testnet.bitfinity.network",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  solidity: "0.8.19",
};

2. Deploy Contracts: To deploy the contracts on Bitfinity, run the following command:
npx hardhat run scripts/deploy.js --network bitfinityTestnet

3. Update Environment Variables: After deploying the contract, update the .env file in the ICP-Frontend directory with the deployed contract address:
VITE_CONTRACT_ADDRESS=your_deployed_contract_address