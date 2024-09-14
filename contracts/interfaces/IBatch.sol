// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "../library/Declarations.sol";

interface IBatch {
    function createBatch(
        string[] memory qrCodes,
        string[] memory cryptoKeys,
        uint256[] memory expirationDates,
        address requesterr,
        uint256 quant
    ) external;

    function changeFinalStat(uint256 batchId, address requesterr) external;

    function getAllBatches() external view returns (Declarations.Batch[] memory);

    function getBatchInfo(uint256 batchId) external view returns (Declarations.Batch memory);

    function revokeBatch(uint256 batchId) external;
}
