// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import './interfaces/IBatch.sol';
import './interfaces/IDrug.sol';
import './RewardPenalty.sol';
import './library/Declarations.sol';

contract Batch is IBatch {
    IDrug public drugsContract;
    RewardPenalty public pc;
    uint256 private batchCounter;
    mapping(uint256 => Declarations.Batch) private batches;

    constructor(address drugsAddress, address rewardPenaltyAddress) {
        drugsContract = IDrug(drugsAddress);
        pc = RewardPenalty(rewardPenaltyAddress);
    }

    // Function to create a batch of drugs
    function createBatch(
        string[] memory qrCodes,
        string[] memory cryptoKeys,
        uint256[] memory expirationDates,
        address requesterr,
        uint256 quant
    ) external override {
        require(
            qrCodes.length == cryptoKeys.length && qrCodes.length == expirationDates.length,
            'Array lengths must match'
        );
        uint256 batchId = batchCounter++;
        batches[batchId] = Declarations.Batch(batchId, qrCodes, msg.sender, requesterr, quant, 'Manufactured');

        for (uint i = 0; i < qrCodes.length; i++) {
            drugsContract.createDrug(qrCodes[i], cryptoKeys[i], expirationDates[i]); // Call via contract reference
        }
        emit Declarations.BatchCreated(batchId, msg.sender);
        pc.rewardParticipant(msg.sender, 100);
    }

    function changeFinalStat(uint256 batchId, address requesterr) external override {
        Declarations.Batch storage batch = batches[batchId];
        batch.finalRecipient = requesterr;
    }

    function getAllBatches() external view override returns (Declarations.Batch[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < type(uint256).max; i++) {
            if (batches[i].owner != address(0)) {
                count++;
            } else {
                break;
            }
        }

        Declarations.Batch[] memory allBatches = new Declarations.Batch[](count);
        for (uint256 i = 0; i < count; i++) {
            allBatches[i] = batches[i];
        }
        return allBatches;
    }

    function getBatchInfo(uint256 batchId) external view override returns (Declarations.Batch memory) {
        require(batches[batchId].owner != address(0), 'Batch not found');
        return batches[batchId];
    }

    function revokeBatch(uint256 batchId) external override {
        Declarations.Batch storage batch = batches[batchId];
        require(batch.owner == msg.sender, 'Only the owner can revoke the batch');
        require(keccak256(bytes(batch.status)) != keccak256(bytes('Delivered')), 'Cannot revoke a delivered batch');
        batch.status = 'Revoked';
        emit Declarations.BatchRevoked(batchId, msg.sender);

        pc.penalizeParticipant(msg.sender, 50);
    }
}
