// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import './interfaces/IDistributor.sol';
import './interfaces/IBatch.sol';
import './interfaces/IRewardPenalty.sol';
import './library/Declarations.sol';

contract Distributor is IDistributor {
    using Declarations for Declarations.Request2;
    using Declarations for Declarations.TransferRequest;
    using Declarations for Declarations.Batch;
    using Declarations for Declarations.Drug;

    // Mappings
    mapping(uint256 => Declarations.Batch) public batches;
    mapping(uint256 => Declarations.TransferRequest) private distributorRequests;
    mapping(uint256 => Declarations.TransferRequest) private hospitalRequests;
    mapping(uint256 => Declarations.TransferRequest) private wholesalerRequests;
    mapping(uint256 => Declarations.Request2) private requests2;
    mapping(string => Declarations.Drug) private drugs;

    // Counters
    mapping(address => uint256) private wholesalerRequestCounters;
    mapping(address => uint256) private hospitalRequestCounters;
    mapping(address => uint256) private hospitalRequesttoWholesalerCounters;

    // External contract references
    IBatch public batchContract;
    IRewardPenalty public rewardPenaltyContract;

    // Constructor
    constructor(address _batchContract, address _rewardPenaltyContract) {
        batchContract = IBatch(_batchContract);
        rewardPenaltyContract = IRewardPenalty(_rewardPenaltyContract);
    }

    // Approve request from hospital
    function approveRequestFromHospital(uint256 requestId, uint256 batchId) public override {
        Declarations.Request2 storage req = requests2[requestId];
        require(req.wholesaler == msg.sender, 'Only the wholesaler can approve this request');
        require(keccak256(bytes(req.status)) == keccak256(bytes('Pending')), 'Request not pending');
        req.status = 'Approved';

        batchContract.changeFinalStat(batchId, req.requester);
        emit Declarations.RequestStatusChanged(requestId, 'Approved');

        rewardPenaltyContract.updateReputation(msg.sender, true);
    }

    // Accept transfer request from manufacturer
    function acceptTransferRequestFromManufacturer(uint256 requestId) public override {
        Declarations.TransferRequest storage request = distributorRequests[requestId];
        require(request.recipient == msg.sender, 'Only the recipient can accept the request');
        require(keccak256(bytes(request.status)) == keccak256(bytes('Pending')), 'Request not pending');

        request.status = 'Accepted';
        Declarations.Batch storage batch = batches[request.batchId];
        batch.owner = msg.sender;
        batch.status = 'In Transit1';

        for (uint i = 0; i < batch.qrCodes.length; i++) {
            drugs[batch.qrCodes[i]].currentOwner = msg.sender;
            drugs[batch.qrCodes[i]].status = 'In Transit1';

            emit Declarations.DrugTransferred(batch.qrCodes[i], request.requester, msg.sender, 'In Transit1');
            emit Declarations.DrugStatusChanged(batch.qrCodes[i], 'In Transit1', msg.sender);

            rewardPenaltyContract.recordTransaction(batch.qrCodes[i], request.requester, msg.sender, 'In Transit1');
        }

        emit Declarations.BatchTransferred(request.batchId, request.requester, msg.sender, 'In Transit1');

        rewardPenaltyContract.updateReputation(msg.sender, true);
        rewardPenaltyContract.updateReputation(request.requester, true);

        rewardPenaltyContract.rewardParticipant(msg.sender, 50);
        rewardPenaltyContract.rewardParticipant(request.requester, 50);
    }

    // Create delivery request to wholesaler
    function createDeliveryRequestToWholesaler(uint256 batchId, address wholesaler) public override {
        Declarations.Batch storage batch = batches[batchId];
        require(batch.owner == msg.sender, 'Only the owner can create a delivery request');

        uint256 requestId = wholesalerRequestCounters[wholesaler]++;
        wholesalerRequests[requestId] = Declarations.TransferRequest(requestId, batchId, msg.sender, wholesaler, 'Pending');

        emit Declarations.DeliveryRequestCreated(requestId, batchId, msg.sender, wholesaler, 'Pending');
        rewardPenaltyContract.updateReputation(msg.sender, true);
    }

    // Create delivery request to hospital
    function createDeliveryRequestToHospital(uint256 batchId, address hospital) public override {
        Declarations.Batch storage batch = batches[batchId];
        require(batch.owner == msg.sender, 'Only the owner can create a delivery request');

        uint256 requestId = hospitalRequestCounters[hospital]++;
        hospitalRequests[requestId] = Declarations.TransferRequest(requestId, batchId, msg.sender, hospital, 'Pending');

        emit Declarations.DeliveryRequestCreated(requestId, batchId, msg.sender, hospital, 'Pending');
        rewardPenaltyContract.updateReputation(msg.sender, true);
    }

    // Get all hospital requests
    function getAllHospitalRequests() public view override returns (Declarations.TransferRequest[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < type(uint256).max; i++) {
            if (hospitalRequests[i].requester != address(0)) {
                count++;
            } else {
                break;
            }
        }

        Declarations.TransferRequest[] memory allHospitalRequests = new Declarations.TransferRequest[](count);
        for (uint256 i = 0; i < count; i++) {
            allHospitalRequests[i] = hospitalRequests[i];
        }
        return allHospitalRequests;
    }
}
