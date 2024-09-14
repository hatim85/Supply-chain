// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "../library/Declarations.sol";

interface IPharmaChain {
    // Functions for Registration
    function registerManufacturer(string memory _username, address _account) external;
    function registerWholesaler(string memory _username, address _account) external;
    function registerDistributor(string memory _username, address _account) external;
    function registerHospital(string memory _username, address _account) external;

    // Getter Functions
    function getManufacturer(address _account) external view returns (Declarations.Manufacturer memory);
    function getWholesaler(address _account) external view returns (Declarations.Wholesaler memory);
    function getDistributor(address _account) external view returns (Declarations.Distributor memory);
    function getHospital(address _account) external view returns (Declarations.Hospital memory);

    // Functions to get all participants
    function getAllDistributors() external view returns (address[] memory);
    function getAllWholesalers() external view returns (address[] memory);
    function getAllManufacturers() external view returns (address[] memory);
    function getAllHospital() external view returns (address[] memory);
}
