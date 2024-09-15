const IoTABI=[
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
            "indexed": true,
            "internalType": "string",
            "name": "qrCode",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "message",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "Alert",
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
            "indexed": false,
            "internalType": "int256",
            "name": "temperature",
            "type": "int256"
          },
          {
            "indexed": false,
            "internalType": "int256",
            "name": "humidity",
            "type": "int256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "IoTDataUpdated",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "drugIoTData",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "int256",
            "name": "temperature",
            "type": "int256"
          },
          {
            "internalType": "int256",
            "name": "humidity",
            "type": "int256"
          }
        ],
        "stateMutability": "view",
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
        "name": "getIoTDataHistory",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "int256",
                "name": "temperature",
                "type": "int256"
              },
              {
                "internalType": "int256",
                "name": "humidity",
                "type": "int256"
              }
            ],
            "internalType": "struct Declarations.IoTData[]",
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
            "name": "qrCode",
            "type": "string"
          }
        ],
        "name": "getLatestIoTData",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "int256",
                "name": "temperature",
                "type": "int256"
              },
              {
                "internalType": "int256",
                "name": "humidity",
                "type": "int256"
              }
            ],
            "internalType": "struct Declarations.IoTData",
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
          },
          {
            "internalType": "int256",
            "name": "temperature",
            "type": "int256"
          },
          {
            "internalType": "int256",
            "name": "humidity",
            "type": "int256"
          }
        ],
        "name": "updateIoTData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
]

export default IoTABI;