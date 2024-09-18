// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "../library/Declarations.sol";

interface IDistributor {
    function acceptTransferRequestFromManufacturer(uint256 requestId) external;
    function createDeliveryRequestToWholesaler(uint256 batchId, address wholesaler) external;
    function createDeliveryRequestToHospital(uint256 batchId, address hospital) external;
    function getAllHospitalRequests() external view returns (Declarations.TransferRequest[] memory);
}
