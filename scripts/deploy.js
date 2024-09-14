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
    const distributor = await Distributor.deploy(batch.target,rewardPenalty.target);
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