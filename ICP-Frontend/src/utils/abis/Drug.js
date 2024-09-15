const DrugABI=[
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
            "indexed": true,
            "internalType": "address",
            "name": "manufacturer",
            "type": "address"
          }
        ],
        "name": "DrugCreated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "string",
            "name": "qrCode",
            "type": "string"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "DrugOwnershipTransferred",
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
        "inputs": [
          {
            "internalType": "string",
            "name": "qrCode",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "cryptoKey",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "expirationDate",
            "type": "uint256"
          }
        ],
        "name": "createDrug",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "name": "drugs",
        "outputs": [
          {
            "internalType": "string",
            "name": "qrCode",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "cryptoKey",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "expirationDate",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "currentOwner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "status",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "qrCode",
            "type": "string"
          }
        ],
        "name": "getDrugInfo",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "qrCode",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cryptoKey",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "expirationDate",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "currentOwner",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "status",
                "type": "string"
              }
            ],
            "internalType": "struct Declarations.Drug",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "qrCode",
            "type": "string"
          }
        ],
        "name": "getTransactionHistory",
        "outputs": [
          {
            "components": [
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
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct Declarations.Transaction[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "rp",
        "outputs": [
          {
            "internalType": "contract IRewardPenalty",
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
            "internalType": "string",
            "name": "qrCode",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
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
            "internalType": "string",
            "name": "newStatus",
            "type": "string"
          }
        ],
        "name": "updateDrugStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
]

export default DrugABI;