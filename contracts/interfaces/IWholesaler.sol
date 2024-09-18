// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "../library/Declarations.sol";

interface IWholesaler {
    function approveRequestFromHospital(uint256 requestId, uint256 batchId) external;
    function acceptDeliveryRequestFromDistributor1(uint256 requestId) external;
    function requestDrugs(string memory drugName, uint256 quantity, address manufacturer) external;
    function getAllDistributorRequests() external view returns (Declarations.TransferRequest[] memory);
    function getAllRequests1() external view returns (Declarations.Request1[] memory);
    function createDeliveryRequestToDistributor(uint256 batchId, address distributor) external;
}
