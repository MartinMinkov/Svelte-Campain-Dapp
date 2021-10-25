//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Campaign.sol";

contract CampaignFactory {
  Campaign[] public deployedCampaigns;

  function createCampaign(uint256 minimum) public {
    Campaign c = new Campaign(minimum, msg.sender);
    deployedCampaigns.push(c);
  }

  function getDeployedCampaigns() public view returns (Campaign[] memory) {
    return deployedCampaigns;
  }
}
