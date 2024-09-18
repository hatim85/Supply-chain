// scripts/deploy.js

const hre = require("hardhat");

async function main() {
    // Get the deployer's account
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy TokenRewards contract
    const TokenRewards = await hre.ethers.getContractFactory("TokenRewards");
    const tokenRewards = await TokenRewards.deploy();
    await tokenRewards.waitForDeployment();
    console.log("TokenRewards deployed to:", tokenRewards.target);

    // Deploy RewardPenalty contract
    const RewardPenalty = await hre.ethers.getContractFactory("RewardPenalty");
    const rewardPenalty = await RewardPenalty.deploy(tokenRewards.target);
    await rewardPenalty.waitForDeployment();
    console.log("RewardPenalty deployed to:", rewardPenalty.target);

    // Deploy PharmaChain contract
    const PharmaChain = await hre.ethers.getContractFactory("PharmaChain");
    const pharmaChain = await PharmaChain.deploy(tokenRewards.target);
    await pharmaChain.waitForDeployment();
    console.log("PharmaChain deployed to:", pharmaChain.target);

    // Deploy Drug contract
    const Drug = await hre.ethers.getContractFactory("Drug");
    const drug = await Drug.deploy();
    await drug.waitForDeployment();
    console.log("Drug deployed to:", drug.target);

    // Deploy BatchManager contract
    const Batch = await hre.ethers.getContractFactory("Batch");
    const batch = await Batch.deploy(
        drug.target,         // target of the deployed Drug contract
        rewardPenalty.target
    );
    await batch.waitForDeployment();
    console.log("Batch deployed to:", batch.target);

    // Deploy IoT contract
    const IoT = await hre.ethers.getContractFactory("IoT");
    const iot = await IoT.deploy(rewardPenalty.target);
    await iot.waitForDeployment();
    console.log("IoT deployed to:", iot.target);

    // Deploy Hospital contract
    const Hospital = await hre.ethers.getContractFactory("Hospital");
    const hospital = await Hospital.deploy(rewardPenalty.target);
    await hospital.waitForDeployment();
    console.log("Hospital deployed to:", hospital.target);

    // Deploy Manufacturer contract
    const Manufacturer = await hre.ethers.getContractFactory("Manufacturer");
    const manufacturer = await Manufacturer.deploy(rewardPenalty.target,drug.target,batch.target);
    await manufacturer.waitForDeployment();
    console.log("Manufacturer deployed to:", manufacturer.target);

    // Deploy Wholesaler contract
    const Wholesaler = await hre.ethers.getContractFactory("Wholesaler");
    const wholesaler = await Wholesaler.deploy(rewardPenalty.target);
    await wholesaler.waitForDeployment();
    console.log("Wholesaler deployed to:", wholesaler.target);


    // Deploy Distributor contract
    const Distributor = await hre.ethers.getContractFactory("Distributor");
    const distributor = await Distributor.deploy(rewardPenalty.target);
    await distributor.waitForDeployment();
    console.log("Distributor deployed to:", distributor.target);
}

// Run the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

//     PS D:\Blockchain projects\Supply-chain> npx hardhat run scripts/deploy.js --network icp      
// Compiled 8 Solidity files successfully (evm target: paris).
// Deploying contracts with the account: 0x0cb22E03E88854C1400fB94ad66cdeC930a61BE7
// TokenRewards deployed to: 0x7F555dB484Cd60dbDBC4BdDcCCF15Addf232BBC3
// RewardPenalty deployed to: 0x685aF160cDe8f785C5363cB2e4a50fD9B5D94676
// PharmaChain deployed to: 0x64427Fb138Bc773E12ee875F9470D375cD1955Ec
// Drug deployed to: 0x67FCa62c658a56d5Cf087239626b60e5E74Fbb18
// Batch deployed to: 0xb7DB91D55212C907C196b0A32Ae39259e6B55CC4
// IoT deployed to: 0xFA24da4A74aBcD8171AA2Fbd9895e80270ECC8A5
// Hospital deployed to: 0x901732aCD559263cf7498B0710d5dD61ABaCFfFA
// Manufacturer deployed to: 0xBac55D78D3c43b949c3B82AB74e75b2cae579506
// Wholesaler deployed to: 0x991c5Cded504cEB18FEC7CB33f0d057D9071266c
// Distributor deployed to: 0xCC46f1F6068852CDc65E8Dc56660e9513b161066