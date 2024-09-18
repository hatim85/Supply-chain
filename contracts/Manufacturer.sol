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
    uint256 private distributorRequestCounter; // Counter for distributor requests

    // Array to keep track of request IDs
    uint256[] private requestIds;

    // Constructor to initialize the RewardPenalty, Drug, and Batch contracts
    constructor(address rewardPenaltyAddress, address drugAddress, address batchAddress) {
        pc = IRewardPenalty(rewardPenaltyAddress);
        drugContract = IDrug(drugAddress);
        batchContract = IBatch(batchAddress);
    }

    function generateQrCode(
        string memory drugName,
        uint256 batchId,
        uint256 timestamp
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(drugName, batchId, timestamp));
    }

    function generateCryptoKey(address owner, uint256 batchId) internal view returns (bytes32) {
        return keccak256(abi.encodePacked(owner, block.timestamp, batchId, block.prevrandao));
    }

    function bytes32ToString(bytes32 _bytes32) internal pure returns (string memory) {
        uint8 i = 0;
        while (i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }

    // Function for manufacturer to approve drug request
    function approveRequest(
        uint256 requestId,
        string memory drugName,
        uint256[] memory expirationDates
    ) public override {
        Declarations.Request1 storage req = requests1[requestId];
        require(req.manufacturer == msg.sender, 'Only the manufacturer can approve this request');
        require(keccak256(bytes(req.status)) == keccak256(bytes('Pending')), 'Request not pending');
        req.status = 'Approved';

        // Generate QR codes and convert cryptoKeys from bytes32[] to string[]
        string[] memory qrCodes = new string[](req.quantity);
        string[] memory cryptoKeys = new string[](req.quantity);

        for (uint i = 0; i < req.quantity; i++) {
            qrCodes[i] = string(abi.encodePacked(generateQrCode(drugName, requestId, block.timestamp)));
            cryptoKeys[i] = bytes32ToString(generateCryptoKey(msg.sender, requestId));
        }

        // Call createBatch from IBatch interface with converted cryptoKeys
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
        Declarations.TransferRequest[] memory allWholesalerRequests = new Declarations.TransferRequest[](
            requestIds.length
        );
        for (uint256 i = 0; i < requestIds.length; i++) {
            allWholesalerRequests[i] = wholesalerRequests[requestIds[i]];
        }
        return allWholesalerRequests;
    }

    // Function for Wholesaler to create a transfer request to distributor
    function createTransferRequestToDistributor(uint256 batchId, address distributor) public override {
        Declarations.Batch memory batch = batchContract.getBatchInfo(batchId); // Assuming batchContract has a getBatch function
        require(batch.owner == msg.sender, 'Only the owner can create a transfer request');

        uint256 requestId = distributorRequestCounter++;
        wholesalerRequests[requestId] = Declarations.TransferRequest(
            requestId,
            batchId,
            msg.sender,
            distributor,
            'Pending'
        );

        // Track the new request ID
        requestIds.push(requestId);

        emit Declarations.TransferRequestCreated(requestId, batchId, msg.sender, distributor, 'Pending');

        // Update reputation through IRewardPenalty interface
        pc.updateReputation(msg.sender, true);
    }
}
