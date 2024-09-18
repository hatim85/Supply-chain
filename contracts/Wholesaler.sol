// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import './interfaces/IWholesaler.sol';
import './interfaces/IRewardPenalty.sol';
import './library/Declarations.sol'; // Import centralized declarations

contract Wholesaler is IWholesaler {
    // Mappings to store requests
    mapping(uint256 => Declarations.TransferRequest) private distributorRequests; // Using centralized TransferRequest
    mapping(uint256 => Declarations.TransferRequest) private wholesalerRequests;
    mapping(uint256 => Declarations.Request1) private requests1; // Using centralized Request1
    mapping(uint256 => Declarations.Batch) private batches; // Using centralized Batch
    mapping(string => Declarations.Drug) private drugs; // Using centralized Drug
    mapping(address => Declarations.Reputation) private reputations; // Using centralized Reputation

    // Counters for requests
    mapping(address => uint256) private wholesalerRequesttoManufacturerCounters;
    uint256 private distributorRequestCounter;

    // Instances of external contracts
    IRewardPenalty public rewardPenaltyContract;

    // Constructor to set the RewardPenalty contract address
    constructor(address rewardPenaltyAddress) {
        rewardPenaltyContract = IRewardPenalty(rewardPenaltyAddress);
    }

    // Approve request from hospital
    function approveRequestFromHospital(uint256 requestId, uint256 batchId) public override {
        Declarations.Request1 storage req = requests1[requestId]; // Use correct mapping
        require(req.requester == msg.sender, 'Only the requester can approve this request'); // Updated the condition
        require(keccak256(bytes(req.status)) == keccak256(bytes('Pending')), 'Request not pending');
        req.status = 'Approved';

        batches[batchId].status = 'Final'; // Use correct batch mapping
        emit Declarations.RequestStatusChanged(requestId, 'Approved');

        rewardPenaltyContract.updateReputation(msg.sender, true);
    }

    // Function for Hospital/Pharmacy to create a delivery request to a distributor
    function createDeliveryRequestToDistributor(uint256 batchId, address distributor) public {
        Declarations.Batch storage batch = batches[batchId]; // Batch from Declarations.sol
        require(batch.owner == msg.sender, 'Only the owner can create a delivery request');

        uint256 requestId = distributorRequestCounter++;
        distributorRequests[requestId] = Declarations.TransferRequest(
            requestId,
            batchId,
            msg.sender,
            distributor,
            'Pending'
        );

        emit Declarations.DeliveryRequestCreated(requestId, batchId, msg.sender, distributor, 'Pending');

        // Update reputation of the sender
        rewardPenaltyContract.updateReputation(msg.sender, true);
    }

    function acceptDeliveryRequestFromDistributor1(uint256 requestId) public override {
        Declarations.TransferRequest storage request = wholesalerRequests[requestId];
        require(request.recipient == msg.sender, 'Only the recipient can accept the request');
        require(keccak256(bytes(request.status)) == keccak256(bytes('Pending')), 'Request not pending'); // Compare strings using keccak256

        request.status = 'Accepted';
        Declarations.Batch storage batch = batches[request.batchId];
        batch.owner = msg.sender;
        batch.status = 'Wholesaler'; // Updating status to 'Wholesaler'

        for (uint i = 0; i < batch.qrCodes.length; i++) {
            drugs[batch.qrCodes[i]].currentOwner = msg.sender;
            drugs[batch.qrCodes[i]].status = 'Wholesaler'; // Updating status of each drug
            emit Declarations.DrugTransferred(batch.qrCodes[i], request.requester, msg.sender, 'Wholesaler');
            emit Declarations.DrugStatusChanged(batch.qrCodes[i], 'Wholesaler', msg.sender);

            // Record transaction
            rewardPenaltyContract.recordTransaction(batch.qrCodes[i], request.requester, msg.sender, 'Wholesaler');
        }

        emit Declarations.BatchTransferred(request.batchId, request.requester, msg.sender, 'Wholesaler');

        rewardPenaltyContract.updateReputation(msg.sender, true);
        rewardPenaltyContract.updateReputation(request.requester, true);

        rewardPenaltyContract.rewardParticipant(msg.sender, 50);
        rewardPenaltyContract.rewardParticipant(request.requester, 50);
    }

    // Function for wholesaler to request drugs from manufacturer
    function requestDrugs(string memory drugName, uint256 quantity, address manufacturer) public override {
        uint256 requestId = wholesalerRequesttoManufacturerCounters[manufacturer]++;
        requests1[requestId] = Declarations.Request1(
            requestId,
            drugName,
            quantity,
            msg.sender,
            manufacturer,
            'Pending'
        ); // Use centralized Request1
        emit Declarations.RequestCreated(requestId, msg.sender, drugName, quantity, manufacturer);
        rewardPenaltyContract.updateReputation(msg.sender, true);

        Declarations.Reputation memory rep = reputations[msg.sender];
        if (rep.reputationScore > 80) {
            rewardPenaltyContract.rewardParticipant(msg.sender, 50); // Reward 50 tokens
        }
    }

    // Function for Wholesaler to get all contents of distributorRequests mapping
    function getAllDistributorRequests() public view override returns (Declarations.TransferRequest[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < distributorRequestCounter; i++) { // Updated loop condition
            if (distributorRequests[i].requester != address(0)) {
                // Ensure requester is address
                count++;
            }
        }

        Declarations.TransferRequest[] memory allDistributorRequests = new Declarations.TransferRequest[](count);
        for (uint256 i = 0; i < count; i++) {
            allDistributorRequests[i] = distributorRequests[i];
        }
        return allDistributorRequests;
    }

    // Function to get all contents of requests1 mapping
    function getAllRequests1() public view override returns (Declarations.Request1[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < wholesalerRequesttoManufacturerCounters[address(0)]; i++) { // Updated loop condition
            if (requests1[i].requester != address(0)) {
                // Ensure requester is address
                count++;
            }
        }

        Declarations.Request1[] memory allRequests1 = new Declarations.Request1[](count);
        for (uint256 i = 0; i < count; i++) {
            allRequests1[i] = requests1[i];
        }
        return allRequests1;
    }
}
