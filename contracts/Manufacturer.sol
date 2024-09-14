// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import './interfaces/IManufacturer.sol';
import './interfaces/IRewardPenalty.sol';
import './interfaces/IDrug.sol';
import './interfaces/IBatch.sol';
import './library/Declarations.sol'; 

contract Manufacturer is IManufacturer {
    IRewardPenalty public pc;
    IDrug public drugContract;
    IBatch public batchContract;

    // Mappings
    mapping(uint256 => Declarations.Request1) private requests1;
    mapping(uint256 => Declarations.TransferRequest) private wholesalerRequests;

    // Constructor to initialize the RewardPenalty, Drug, and Batch contracts
    constructor(address rewardPenaltyAddress, address drugAddress, address batchAddress) {
        pc = IRewardPenalty(rewardPenaltyAddress);
        drugContract = IDrug(drugAddress);
        batchContract = IBatch(batchAddress);
    }

    // Function for manufacturer to approve drug request
    function approveRequest(
        uint256 requestId,
        string[] memory qrCodes,
        string[] memory cryptoKeys,
        uint256[] memory expirationDates
    ) public override {
        Declarations.Request1 storage req = requests1[requestId];
        require(req.manufacturer == msg.sender, 'Only the manufacturer can approve this request');
        require(keccak256(bytes(req.status)) == keccak256(bytes('Pending')), 'Request not pending');
        req.status = 'Approved';

        // Call createBatch from IBatch interface
        batchContract.createBatch(qrCodes, cryptoKeys, expirationDates, req.requester, req.quantity);

        emit Declarations.RequestStatusChanged(requestId, 'Approved');

        // Update reputation through IRewardPenalty interface
        pc.updateReputation(msg.sender, true);
        pc.updateReputation(req.requester, true);

        pc.rewardParticipant(msg.sender, 50);
        pc.rewardParticipant(req.requester, 50);
    }

    // Function for manufacturer to get all contents of wholesalerRequests mapping
    function getAllWholesalerRequests() public view override returns (Declarations.TransferRequest[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < type(uint256).max; i++) {
            if (wholesalerRequests[i].requester != address(0)) {
                count++;
            } else {
                break;
            }
        }

        Declarations.TransferRequest[] memory allWholesalerRequests = new Declarations.TransferRequest[](count);
        for (uint256 i = 0; i < count; i++) {
            allWholesalerRequests[i] = wholesalerRequests[i];
        }
        return allWholesalerRequests;
    }
}
