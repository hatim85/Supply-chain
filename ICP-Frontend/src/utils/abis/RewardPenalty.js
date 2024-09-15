const RewardPenaltyABI=[
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "tokenContractAddress",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "participant",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "PenaltyIssued",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "participant",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "RewardIssued",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "participant",
            "type": "address"
          }
        ],
        "name": "penalizeLateDelivery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "participant",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "penalizeParticipant",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "qrCode",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "status",
            "type": "string"
          }
        ],
        "name": "recordTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "reputations",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "totalTransactions",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "successfulTransactions",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "failedTransactions",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reputationScore",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "participant",
            "type": "address"
          }
        ],
        "name": "rewardOnTimeDelivery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "participant",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "rewardParticipant",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "tokenContract",
        "outputs": [
          {
            "internalType": "contract TokenRewards",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "participant",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isSuccess",
            "type": "bool"
          }
        ],
        "name": "updateReputation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
]

export default RewardPenaltyABI;