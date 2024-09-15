const BatchABI=[
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "drugsAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "rewardPenaltyAddress",
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
            "indexed": false,
            "internalType": "uint256",
            "name": "batchId",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "BatchCreated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "batchId",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "BatchRevoked",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "batchId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "requesterr",
            "type": "address"
          }
        ],
        "name": "changeFinalStat",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string[]",
            "name": "qrCodes",
            "type": "string[]"
          },
          {
            "internalType": "string[]",
            "name": "cryptoKeys",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "expirationDates",
            "type": "uint256[]"
          },
          {
            "internalType": "address",
            "name": "requesterr",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "quant",
            "type": "uint256"
          }
        ],
        "name": "createBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "drugsContract",
        "outputs": [
          {
            "internalType": "contract IDrug",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllBatches",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "batchId",
                "type": "uint256"
              },
              {
                "internalType": "string[]",
                "name": "qrCodes",
                "type": "string[]"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "finalRecipient",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "status",
                "type": "string"
              }
            ],
            "internalType": "struct Declarations.Batch[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "batchId",
            "type": "uint256"
          }
        ],
        "name": "getBatchInfo",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "batchId",
                "type": "uint256"
              },
              {
                "internalType": "string[]",
                "name": "qrCodes",
                "type": "string[]"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "finalRecipient",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "status",
                "type": "string"
              }
            ],
            "internalType": "struct Declarations.Batch",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "pc",
        "outputs": [
          {
            "internalType": "contract RewardPenalty",
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
            "internalType": "uint256",
            "name": "batchId",
            "type": "uint256"
          }
        ],
        "name": "revokeBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
]

export default BatchABI;