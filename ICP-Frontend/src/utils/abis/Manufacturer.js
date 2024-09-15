const ManufacturerABI=[
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "rewardPenaltyAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "drugAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "batchAddress",
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
            "name": "requestId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "newStatus",
            "type": "string"
          }
        ],
        "name": "RequestStatusChanged",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "requestId",
            "type": "uint256"
          },
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
          }
        ],
        "name": "approveRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "batchContract",
        "outputs": [
          {
            "internalType": "contract IBatch",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "drugContract",
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
        "name": "getAllWholesalerRequests",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "requestId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "batchId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "requester",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "status",
                "type": "string"
              }
            ],
            "internalType": "struct Declarations.TransferRequest[]",
            "name": "",
            "type": "tuple[]"
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
            "internalType": "contract IRewardPenalty",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
]

export default ManufacturerABI;