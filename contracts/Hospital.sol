// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

// Import necessary interfaces and Declarations library
import './interfaces/IRewardPenalty.sol';
import './library/Declarations.sol';

contract Hospital {
    // State variables and mappings using centralized structs from Declarations.sol
    mapping(uint256 => Declarations.TransferRequest) private hospitalRequests;
    mapping(uint256 => Declarations.Request2) private requests2;
    mapping(uint256 => Declarations.TransferRequest) private distributorRequests;
    mapping(address => uint256) private distributorRequestCounters;
    mapping(address => uint256) private hospitalRequestCounters;
    mapping(address => uint256) private hospitalRequesttoWholesalerCounters;
    mapping(string => Declarations.Drug) private drugs;
    mapping(uint256 => Declarations.Batch) private batches;
    uint256 private distributorRequestCounter;

    // Interface instance for IRewardPenalty
    IRewardPenalty private pc;

    // Constructor to set the IRewardPenalty interface
    constructor(address rewardPenaltyAddress) {
        pc = IRewardPenalty(rewardPenaltyAddress);
    }

    // Function for Hospital to accept a delivery request from distributor
    function acceptDeliveryRequestFromDistributor2(uint256 requestId) public {
        Declarations.TransferRequest storage request = hospitalRequests[requestId];
        require(request.recipient == msg.sender, 'Only the recipient can accept the request');
        require(keccak256(bytes(request.status)) == keccak256(bytes('Pending')), 'Request not pending');

        request.status = 'Accepted';
        Declarations.Batch storage batch = batches[request.batchId]; // Batch from Declarations.sol
        batch.owner = msg.sender;
        batch.status = 'Hospital';

        for (uint i = 0; i < batch.qrCodes.length; i++) {
            drugs[batch.qrCodes[i]].currentOwner = msg.sender;
            drugs[batch.qrCodes[i]].status = 'Hospital';

            // Emit centralized events from Declarations.sol
            emit Declarations.DrugTransferred(batch.qrCodes[i], request.requester, msg.sender, 'Hospital');
            emit Declarations.DrugStatusChanged(batch.qrCodes[i], 'Hospital', msg.sender);

            // Record transaction via IRewardPenalty interface
            pc.recordTransaction(batch.qrCodes[i], request.requester, msg.sender, 'Hospital');
        }

        emit Declarations.BatchTransferred(request.batchId, request.requester, msg.sender, 'Hospital');

        // Update reputations
        pc.updateReputation(msg.sender, true);
        pc.updateReputation(request.requester, true);

        // Reward distributor and hospital/pharmacy
        pc.rewardParticipant(request.requester, 50);
        pc.rewardParticipant(msg.sender, 50);
    }

    // Function for Hospital/Pharmacy to create a delivery request to a distributor
    function createDeliveryRequestToDistributor(uint256 batchId, address distributor) public {
        Declarations.Batch storage batch = batches[batchId]; // Batch from Declarations.sol
        require(batch.owner == msg.sender, 'Only the owner can create a delivery request');

        uint256 requestId = distributorRequestCounters[distributor]++;
        distributorRequests[requestId] = Declarations.TransferRequest(
            requestId,
            batchId,
            msg.sender,
            distributor,
            'Pending'
        );

        emit Declarations.DeliveryRequestCreated(requestId, batchId, msg.sender, distributor, 'Pending');

        // Update reputation of the sender
        pc.updateReputation(msg.sender, true);
    }

    // Function for hospital/pharmacy to request drugs from wholesaler
    function requestDrugsFromWholesaler(string memory drugName, uint256 quantity, address wholesaler) public {
        uint256 requestId = hospitalRequesttoWholesalerCounters[wholesaler]++;
        requests2[requestId] = Declarations.Request2(requestId, drugName, quantity, msg.sender, wholesaler, 'Pending');
        emit Declarations.RequestCreated(requestId, msg.sender, drugName, quantity, wholesaler);
    }

    // Function to get all contents of requests2 mapping
    function getAllRequests2() public view returns (Declarations.Request2[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < type(uint256).max; i++) {
            if (requests2[i].requester != address(0)) {
                count++;
            } else {
                break;
            }
        }

        Declarations.Request2[] memory allRequests2 = new Declarations.Request2[](count);
        for (uint256 i = 0; i < count; i++) {
            allRequests2[i] = requests2[i];
        }
        return allRequests2;
    }

    // Function for hospital/pharmacy to accept a delivery request from wholesaler
    function acceptDeliveryRequestFromWholesaler(uint256 requestId) public {
        Declarations.TransferRequest storage request = hospitalRequests[requestId];
        require(request.recipient == msg.sender, 'Only the recipient can accept the request');
        require(keccak256(bytes(request.status)) == keccak256(bytes('Pending')), 'Request not pending');

        request.status = 'Accepted';
        Declarations.Batch storage batch = batches[request.batchId]; // Batch from Declarations.sol
        batch.owner = msg.sender;
        batch.status = 'In Transit2';

        for (uint i = 0; i < batch.qrCodes.length; i++) {
            drugs[batch.qrCodes[i]].currentOwner = msg.sender;
            drugs[batch.qrCodes[i]].status = 'In Transit2';

            // Emit centralized events from Declarations.sol
            emit Declarations.DrugTransferred(batch.qrCodes[i], request.requester, msg.sender, 'In Transit2');
            emit Declarations.DrugStatusChanged(batch.qrCodes[i], 'In Transit2', msg.sender);

            // Record transaction via IRewardPenalty interface
            pc.recordTransaction(batch.qrCodes[i], request.requester, msg.sender, 'In Transit2');
        }

        emit Declarations.BatchTransferred(request.batchId, request.requester, msg.sender, 'In Transit2');

        // Update reputations
        pc.updateReputation(request.requester, true);
        pc.updateReputation(msg.sender, true);

        // Reward wholesaler and hospital
        pc.rewardParticipant(request.requester, 50);
        pc.rewardParticipant(msg.sender, 50);
    }
}
