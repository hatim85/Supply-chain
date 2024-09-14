// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "../library/Declarations.sol";

interface IIoT {
    function updateIoTData(
        string calldata qrCode,
        int256 temperature,
        int256 humidity
    ) external;
    function getLatestIoTData(string calldata qrCode) external view returns (Declarations.IoTData memory);
    function getIoTDataHistory(string calldata qrCode) external view returns (Declarations.IoTData[] memory);
}
