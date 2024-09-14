// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import './TokenRewards.sol';
import './interfaces/IRewardPenalty.sol';
import './library/Declarations.sol';

contract RewardPenalty is IRewardPenalty {
    TokenRewards public tokenContract;

    // Mapping to store reputation of each participant
    mapping(address => Declarations.Reputation) public reputations;

    // Mapping to store transaction history by QR code
    mapping(string => Declarations.Transaction[]) private transactionHistory;

    // Constructor to set the TokenRewards contract address
    constructor(address tokenContractAddress) {
        tokenContract = TokenRewards(tokenContractAddress);
    }

    // Function to update reputation based on transaction success
    function updateReputation(address participant, bool isSuccess) public override {
        Declarations.Reputation storage rep = reputations[participant];
        rep.totalTransactions++;

        if (isSuccess) {
            rep.successfulTransactions++;
        } else {
            rep.failedTransactions++;
        }

        // Calculate reputation score as a percentage
        if (rep.totalTransactions > 0) {
            rep.reputationScore = (rep.successfulTransactions * 100) / rep.totalTransactions;
        }
    }

    // Function to reward participants for meeting performance metrics
    function rewardParticipant(address participant, uint256 amount) public override {
        tokenContract.mint(participant, amount);
        emit Declarations.RewardIssued(participant, amount);
        updateReputation(participant, true); // Update reputation on reward
    }

    // Function to penalize participants for breaches
    function penalizeParticipant(address participant, uint256 amount) public override {
        tokenContract.burn(participant, amount);
        emit Declarations.PenaltyIssued(participant, amount);
        updateReputation(participant, false); // Update reputation on penalty
    }

    // Function to record transactions
    function recordTransaction(string memory qrCode, address from, address to, string memory status) public override {
        transactionHistory[qrCode].push(Declarations.Transaction(qrCode, from, to, status, block.timestamp));
    }

    // Example: Reward for on-time delivery
    function rewardOnTimeDelivery(address participant) public override {
        rewardParticipant(participant, 100); // Issue 100 tokens for on-time delivery
    }

    // Example: Penalize for late delivery
    function penalizeLateDelivery(address participant) public override {
        penalizeParticipant(participant, 50); // Deduct 50 tokens for late delivery
    }
}
