// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import './interfaces/IRewardPenalty.sol';
import './interfaces/IDrug.sol';
import './library/Declarations.sol'; // Import the common declarations;

contract Drug is IDrug {
    using Declarations for *; // Use the common declarations

    mapping(string => Declarations.Drug) public drugs;
    IRewardPenalty public rp;
    mapping(string => Declarations.Transaction[]) private transactionHistory;

    // Function to create a drug
    function createDrug(string memory qrCode, string memory cryptoKey, uint256 expirationDate) external override {
        drugs[qrCode] = Declarations.Drug(qrCode, cryptoKey, expirationDate, msg.sender, 'Manufactured');
        emit Declarations.DrugCreated(qrCode, msg.sender);

        // Record transaction (assumed existing function)
        rp.recordTransaction(qrCode, address(0), msg.sender, 'Manufactured');
        rp.rewardParticipant(msg.sender, 50);
    }

    // Function to get drug info by qrcode
    function getDrugInfo(string memory qrCode) external view override returns (Declarations.Drug memory) {
        require(bytes(drugs[qrCode].qrCode).length > 0, 'Drug not found');
        return drugs[qrCode];
    }

    // Function to update drug status
    function updateDrugStatus(string memory qrCode, string memory newStatus) external override {
        require(bytes(newStatus).length > 0, 'New status cannot be empty');
        Declarations.Drug storage drug = drugs[qrCode];
        require(drug.currentOwner == msg.sender, 'Only the current owner can update the drug status');

        drug.status = newStatus;
        emit Declarations.DrugStatusChanged(qrCode, newStatus, msg.sender);
    }

    // Function to transfer ownership of the drug
    function transferOwnership(string memory qrCode, address newOwner) public {
        Declarations.Drug storage drug = drugs[qrCode];
        require(drug.currentOwner == msg.sender, 'Only the current owner can transfer ownership');
        require(newOwner != address(0), 'New owner cannot be zero');

        // Record the transaction before ownership change
        rp.recordTransaction(qrCode, msg.sender, newOwner, 'Ownership Transferred');

        drug.currentOwner = newOwner;
        emit Declarations.DrugOwnershipTransferred(qrCode, msg.sender, newOwner);
    }

    // Function to get transaction history for a drug
    function getTransactionHistory(string memory qrCode) public view returns (Declarations.Transaction[] memory) {
        return transactionHistory[qrCode];
    }
}
