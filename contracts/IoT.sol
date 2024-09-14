// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

// Import necessary interfaces and the centralized Declarations library
import './interfaces/IRewardPenalty.sol';
import './interfaces/IIoT.sol';
import './library/Declarations.sol';

contract IoT {
    // Define mappings using centralized structs from Declarations.sol
    mapping(string => Declarations.IoTData[]) public drugIoTData; // Use IoTData from Declarations
    mapping(string => Declarations.Drug) public drugs; // Use Drug from Declarations

    // Define the interface instance
    IRewardPenalty private pc;

    // Constructor to set the IRewardPenalty interface
    constructor(address rewardPenaltyAddress) {
        pc = IRewardPenalty(rewardPenaltyAddress);
    }

    // Function to update IoT data
    function updateIoTData(string memory qrCode, int256 temperature, int256 humidity) public {
        // Use IoTData struct from Declarations
        Declarations.IoTData memory data = Declarations.IoTData(block.timestamp, temperature, humidity);
        drugIoTData[qrCode].push(data);

        // Emit event from Declarations.sol
        emit Declarations.IoTDataUpdated(qrCode, temperature, humidity, block.timestamp);

        // Check conditions and emit alert if out of range
        if (temperature < 2 || temperature > 8) {
            // Example temperature range: 2-8 Celsius
            emit Declarations.Alert(qrCode, 'Temperature out of range!', block.timestamp);
            pc.penalizeParticipant(drugs[qrCode].currentOwner, 10); // Penalize participant if temperature is out of range
        }
        if (humidity < 30 || humidity > 50) {
            // Example humidity range: 30-50%
            emit Declarations.Alert(qrCode, 'Humidity out of range!', block.timestamp);
            pc.penalizeParticipant(drugs[qrCode].currentOwner, 10); // Penalize participant if humidity is out of range
        }
    }

    // Function to get the latest IoT data
    function getLatestIoTData(string memory qrCode) public view returns (Declarations.IoTData memory) {
        require(drugIoTData[qrCode].length > 0, 'No IoT data available');
        return drugIoTData[qrCode][drugIoTData[qrCode].length - 1]; // Return the most recent IoT data
    }

    // Function to get IoT data history
    function getIoTDataHistory(string memory qrCode) public view returns (Declarations.IoTData[] memory) {
        require(drugIoTData[qrCode].length > 0, 'No IoT data available');
        return drugIoTData[qrCode]; // Return the entire IoT data history for the given QR code
    }
}
