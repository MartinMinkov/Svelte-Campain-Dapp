// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const fs = require("fs");
const path = require("path");
import { ethers } from "hardhat";
import { Campaign } from "../typechain";

const CLIENT_PATH = path.join(__dirname, "..", "client", "src", "lib", "ether");

async function main() {
  // Deploy Campaign Factory
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);
  console.log("----------------------------------------------------");

  const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
  const campaignFactory = await CampaignFactory.deploy();
  console.log(`CampaignFactory address: ${campaignFactory.address}`);

  const campaignFactoryData = {
    address: campaignFactory.address,
    abi: JSON.parse(campaignFactory.interface.format("json") as any),
  };

  fs.writeFileSync(
    path.join(CLIENT_PATH, "CampaignFactory.json"),
    JSON.stringify(campaignFactoryData)
  );

  // Deploy Test Campiagn
  await campaignFactory.createCampaign(ethers.utils.parseEther("1"));

  console.log(
    `Test Campaign address: ${await campaignFactory.getDeployedCampaigns()}`
  );
  console.log(`Test Campaign Manager: ${deployer.address}`);

  // const testCampaignData = {
  //   address: testCampaign.address,
  //   abi: JSON.parse(testCampaign.interface.format("json") as any),
  // };
  // fs.writeFileSync(
  //   path.join(CLIENT_PATH, "TestCampaign.json"),
  //   JSON.stringify(testCampaignData)
  // );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
