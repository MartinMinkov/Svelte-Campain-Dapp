//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Campaign {
  struct Request {
    string description;
    uint256 value;
    address payable recipient;
    bool complete;
    uint256 approvalCount;
    mapping(address => bool) approvals;
  }

  uint256 public requestCount;
  mapping(uint256 => Request) public requests;

  address public manager;
  mapping(address => bool) public approvers;

  uint256 public minimumContribution;
  uint256 public approversCount;

  constructor(uint256 _minimumContribution, address _manager) {
    manager = _manager;
    minimumContribution = _minimumContribution;
  }

  function contribute() public payable minimum {
    approvers[msg.sender] = true;
    approversCount++;
  }

  function createRequest(
    string memory description,
    uint256 value,
    address recipient
  ) public restricted {
    Request storage r = requests[requestCount++];
    r.description = description;
    r.value = value;
    r.recipient = payable(recipient);
    r.complete = false;
    r.approvalCount = 0;
  }

  function approveRequest(uint256 requestIndex) public {
    Request storage r = requests[requestIndex];
    require(approvers[msg.sender], "Must have donated before");
    require(!r.approvals[msg.sender], "Cannot vote twice");
    r.approvals[msg.sender] = true;
    r.approvalCount++;
  }

  function finalizeRequest(uint256 requestIndex) public restricted {
    Request storage r = requests[requestIndex];
    require(r.approvalCount > approversCount / 2, "Need 50% approval");
    require(!r.complete, "Cannot finalize complete request");

    r.recipient.transfer(r.value);
    r.complete = true;
  }

  modifier restricted() {
    require(msg.sender == manager, "Must be manager");
    _;
  }

  modifier minimum() {
    require(msg.value >= minimumContribution, "Did not meet contribution min");
    _;
  }
}
