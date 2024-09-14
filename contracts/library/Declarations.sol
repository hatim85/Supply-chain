// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

library Declarations {
    //Drug.sol
    struct Drug {
        //Also used by Distributor,IoT
        string qrCode;
        string cryptoKey;
        uint256 expirationDate;
        address currentOwner;
        string status;
    }

    struct Transaction {
        //Also used by Distributor, RewardPenalty
        string qrCode;
        address from;
        address to;
        string status;
        uint256 timestamp;
    }

    event DrugOwnershipTransferred(string indexed qrCode, address indexed from, address indexed to);
    event DrugCreated(string qrCode, address indexed manufacturer);
    event DrugStatusChanged(string qrCode, string newStatus, address indexed owner); //Distributor, Wholesaler

    //Batch
    struct Batch {
        //Also used by Distributor,Wholesaler,Hospital
        uint256 batchId;
        string[] qrCodes;
        address owner;
        address finalRecipient;
        uint256 quantity;
        string status; // Manufactured, In Transit1, Wholesaler, In Transit2, HospitalOrPharmacy
    }

    event BatchCreated(uint256 batchId, address indexed owner); //-Manufacturer
    event BatchRevoked(uint256 batchId, address indexed owner); //-Manufacturer

    //Manufacturer
    struct Request1 {
        //Also used by Wholesaler
        uint256 requestId;
        string drugName;
        uint256 quantity;
        address requester;
        address manufacturer;
        string status; // Pending, Approved, Rejected
    }

    struct TransferRequest {
        //Also used by Distributor,Wholesaler,Hospital
        uint256 requestId;
        uint256 batchId;
        address requester;
        address recipient;
        string status;
    }

    event RequestStatusChanged(uint256 requestId, string newStatus); //Also used by Distributor,Wholesaler

    //Distributor
    struct Request2 {
        //Also used by Hospital
        uint256 requestId;
        string drugName;
        uint256 quantity;
        address requester;
        address wholesaler;
        string status;
    }

    event DeliveryRequestCreated(
        uint256 requestId,
        uint256 batchId,
        address indexed creator,
        address indexed recipient,
        string status
    );
    event DrugTransferred(string qrCode, address from, address to, string status); //Also used by Wholesaler
    event BatchTransferred(uint256 batchId, address from, address to, string status); //Also used by Wholesaler

    //Wholesaler
    event TransferRequestCreated(
        uint256 requestId,
        uint256 batchId,
        address indexed sender,
        address indexed distributor,
        string status
    );
    event RequestCreated(
        uint256 requestId,
        address indexed requester,
        string drugName,
        uint256 quantity,
        address indexed manufacturer
    );

    //RewardPenalty
    struct Reputation {
        uint256 totalTransactions;
        uint256 successfulTransactions;
        uint256 failedTransactions;
        uint256 reputationScore;
    }

    event RewardIssued(address indexed participant, uint256 amount);
    event PenaltyIssued(address indexed participant, uint256 amount);

    //IoT
    struct IoTData {
        uint256 timestamp;
        int256 temperature;
        int256 humidity;
    }

    event IoTDataUpdated(string indexed qrCode, int256 temperature, int256 humidity, uint256 timestamp);
    event Alert(string indexed qrCode, string message, uint256 timestamp);

    //PharmaChain
    struct Manufacturer {
        string username;
        address account;
    }
    struct Wholesaler {
        string username;
        address account;
    }
    struct Distributor {
        string username;
        address account;
    }
    struct Hospital {
        string username;
        address account;
    }
}
