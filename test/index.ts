import { expect } from "chai";
import { ethers } from "hardhat";

describe("Campaign", function () {
  describe("Contribution", function () {
    it("Should set a minimum contribution", async function () {
      const Campaign = await ethers.getContractFactory("Campaign");
      const minimumContribution = ethers.utils.parseEther("3");
      const campaign = await Campaign.deploy(
        minimumContribution,
        await Campaign.signer.getAddress()
      );
      await campaign.deployed();
      expect(await campaign.minimumContribution()).to.equal(
        minimumContribution
      );
    });

    it("Should allow a minimum contribution", async function () {
      const Campaign = await ethers.getContractFactory("Campaign");
      const minimumContribution = ethers.utils.parseEther("1");
      const campaign = await Campaign.deploy(
        minimumContribution,
        await Campaign.signer.getAddress()
      );
      await campaign.deployed();

      const contributeTx = await campaign.contribute({
        value: ethers.utils.parseEther("1"),
      });

      // wait until the transaction is mined
      await contributeTx.wait();

      const contributer = await campaign.signer.getAddress();
      expect(await campaign.approvers(contributer)).to.equal(true);
    });

    it("Should not allow a duplicate contribution", async function () {
      const Campaign = await ethers.getContractFactory("Campaign");
      const minimumContribution = ethers.utils.parseEther("1");
      const campaign = await Campaign.deploy(
        minimumContribution,
        await Campaign.signer.getAddress()
      );
      await campaign.deployed();

      const contributeTx = await campaign.contribute({
        value: ethers.utils.parseEther("1"),
      });

      // wait until the transaction is mined
      await contributeTx.wait();

      try {
        const invalidTx = await campaign.contribute({
          value: ethers.utils.parseEther("1"),
        });
        await invalidTx.wait();
      } catch (error) {
        expect(error).to.exist;
      }
      const contributer = await campaign.signer.getAddress();
      expect(await campaign.approvers(contributer)).to.equal(true);
    });
  });

  describe("Request", function () {
    it("Should create a new request", async function () {
      const Campaign = await ethers.getContractFactory("Campaign");
      const minimumContribution = ethers.utils.parseEther("1");
      const campaign = await Campaign.deploy(
        minimumContribution,
        await Campaign.signer.getAddress()
      );
      await campaign.deployed();

      const recipient = await campaign.signer.getAddress();
      const requestTx = await campaign.createRequest(
        "Test Request",
        200,
        recipient
      );

      // wait until the transaction is mined
      await requestTx.wait();
      expect(await campaign.requests(0)).exist;
    });

    it("Should approve a request", async function () {
      const Campaign = await ethers.getContractFactory("Campaign");
      const minimumContribution = ethers.utils.parseEther("1");
      const campaign = await Campaign.deploy(
        minimumContribution,
        await Campaign.signer.getAddress()
      );
      await campaign.deployed();

      await campaign.contribute({
        value: ethers.utils.parseEther("1"),
      });
      const recipient = await campaign.signer.getAddress();
      const requestTx = await campaign.createRequest(
        "Test Request",
        200,
        recipient
      );

      await requestTx.wait();
      const approveTx = await campaign.approveRequest(0);
      await approveTx.wait();
      expect(await (await campaign.requests(0)).approvalCount).equal(1);
    });

    it("Should not approve request from non manager", async function () {
      const Campaign = await ethers.getContractFactory("Campaign");
      const minimumContribution = ethers.utils.parseEther("1");
      const campaign = await Campaign.deploy(
        minimumContribution,
        await Campaign.signer.getAddress()
      );
      await campaign.deployed();

      const [_owner, addr1] = await ethers.getSigners();

      await campaign.contribute({
        value: ethers.utils.parseEther("1"),
      });
      const recipient = await campaign.signer.getAddress();
      await campaign.createRequest("Test Request", 200, recipient);

      const approveTx = await campaign.approveRequest(0);
      await approveTx.wait();

      try {
        await campaign.connect(addr1).approveRequest(0);
      } catch (error) {
        expect(error).to.exist;
      }
    });

    it("Should be able to finalize a request", async function () {
      const Campaign = await ethers.getContractFactory("Campaign");
      const minimumContribution = ethers.utils.parseEther("1");
      const campaign = await Campaign.deploy(
        minimumContribution,
        await Campaign.signer.getAddress()
      );
      await campaign.deployed();

      await campaign.contribute({
        value: ethers.utils.parseEther("1"),
      });
      const recipient = await campaign.signer.getAddress();
      await campaign.createRequest("Test Request", 200, recipient);
      await campaign.approveRequest(0);
      const finalizeTx = await campaign.finalizeRequest(0);
      await finalizeTx.wait();
      const request = await campaign.requests(0);
      expect(request.complete).to.be.true;
    });
  });
});

describe("Campaign Factory", function () {
  it("Should should create a campaign", async function () {
    const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    const minimumContribution = ethers.utils.parseEther("1");
    const campaignFactory = await CampaignFactory.deploy();
    await campaignFactory.deployed();
    const createTx = await campaignFactory.createCampaign(minimumContribution);
    await createTx.wait();
    expect((await campaignFactory.getDeployedCampaigns()).length).to.equal(1);
  });
});
