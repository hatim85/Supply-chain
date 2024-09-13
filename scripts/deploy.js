async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    // console.log("Account balance:", (await deployer.getBalance()).toString());
  
    // Deploy TokenRewards contract
    const TokenRewards = await ethers.getContractFactory("TokenRewards");
    const tokenRewards = await TokenRewards.deploy();
    await tokenRewards.waitForDeployment();
    console.log("TokenRewards deployed to:", tokenRewards.target);
  
    // Deploy PharmaChain contract
    const PharmaChain = await ethers.getContractFactory("PharmaChain");
    const pharmaChain = await PharmaChain.deploy(tokenRewards.target); // Pass TokenRewards contract address if needed
    await pharmaChain.waitForDeployment();
    console.log("PharmaChain deployed to:", pharmaChain.target);
  
    // Deploy Drugs contract
    const Drugs = await ethers.getContractFactory("Drugs");
    const drugs = await Drugs.deploy({
      gasLimit:9999999
    }); 
    await drugs.waitForDeployment();
    console.log("Drugs deployed to:", drugs.target);
  
    // Optionally, set up roles and permissions in your contracts here if necessary
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  