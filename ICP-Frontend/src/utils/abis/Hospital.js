const HospitalABI=[
    {
        "inputs": [
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
            "indexed": false,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "status",
            "type": "string"
          }
        ],
        "name": "BatchTransferred",
        "type": "event"
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
            "internalType": "uint256",
            "name": "batchId",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "status",
            "type": "string"
          }
        ],
        "name": "DeliveryRequestCreated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "qrCode",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "newStatus",
            "type": "string"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "DrugStatusChanged",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "qrCode",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "status",
            "type": "string"
          }
        ],
        "name": "DrugTransferred",
        "type": "event"
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
            "indexed": true,
            "internalType": "address",
            "name": "requester",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "drugName",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "manufacturer",
            "type": "address"
          }
        ],
        "name": "RequestCreated",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "requestId",
            "type": "uint256"
          }
        ],
        "name": "acceptDeliveryRequestFromDistributor2",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "requestId",
            "type": "uint256"
          }
        ],
        "name": "acceptDeliveryRequestFromWholesaler",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
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
            "name": "distributor",
            "type": "address"
          }
        ],
        "name": "createDeliveryRequestToDistributor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllRequests2",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "requestId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "drugName",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "requester",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "wholesaler",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "status",
                "type": "string"
              }
            ],
            "internalType": "struct Declarations.Request2[]",
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
            "internalType": "string",
            "name": "drugName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "wholesaler",
            "type": "address"
          }
        ],
        "name": "requestDrugsFromWholesaler",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
]

export default HospitalABI;