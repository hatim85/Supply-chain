// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "../library/Declarations.sol";

interface IManufacturer {
    function approveRequest(
        uint256 requestId,
        string memory drugName,
        uint256[] memory expirationDates
    ) external;
    function getAllWholesalerRequests() external view returns (Declarations.TransferRequest[] memory);
    function createTransferRequestToDistributor(uint256 batchId, address distributor) external;
}
