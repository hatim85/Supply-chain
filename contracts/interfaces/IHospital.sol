// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "../library/Declarations.sol";

interface IHospital {
    function acceptDeliveryRequestFromDistributor2(uint256 requestId) external;
    function requestDrugsFromWholesaler(string memory drugName, uint256 quantity, address wholesaler) external;
    function getAllRequests2() external view returns (Declarations.Request2[] memory);
    function acceptDeliveryRequestFromWholesaler(uint256 requestId) external;
}
