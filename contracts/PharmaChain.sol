// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import './interfaces/IPharmaChain.sol';
import './RewardPenalty.sol';
import './library/Declarations.sol';

contract PharmaChain is IPharmaChain, RewardPenalty {
    address public owner;

    // Constructor
    constructor(address tokenContractAddress) RewardPenalty(tokenContractAddress) {
        owner = msg.sender;
    }

    // Modifier to restrict access to owner only
    modifier onlyOwner() {
        require(msg.sender == owner, 'Only owner can execute this');
        _;
    }

    // Structs for different participants
    mapping(address => Declarations.Manufacturer) public manufacturers;
    address[] public manufacturerAccounts;

    mapping(address => Declarations.Wholesaler) public wholesalers;
    address[] public wholesalerAccounts;

    mapping(address => Declarations.Distributor) public distributors;
    address[] public distributorAccounts;

    mapping(address => Declarations.Hospital) public hospitals;
    address[] public hospitalAccounts;

    // Registration functions
    function registerManufacturer(string memory _username, address _account) public onlyOwner {
        manufacturers[_account] = Declarations.Manufacturer(_username, _account);
        manufacturerAccounts.push(_account);
        emit ManufacturerRegistered(_username, _account);
    }

    function registerWholesaler(string memory _username, address _account) public onlyOwner {
        wholesalers[_account] = Declarations.Wholesaler(_username, _account);
        wholesalerAccounts.push(_account);
        emit WholesalerRegistered(_username, _account);
    }

    function registerDistributor(string memory _username, address _account) public onlyOwner {
        distributors[_account] = Declarations.Distributor(_username, _account);
        distributorAccounts.push(_account);
        emit DistributorRegistered(_username, _account);
    }

    function registerHospital(string memory _username, address _account) public onlyOwner {
        hospitals[_account] = Declarations.Hospital(_username, _account);
        hospitalAccounts.push(_account);
        emit HospitalRegistered(_username, _account);
    }

    // Getter functions
    function getManufacturer(address _account) public view override returns (Declarations.Manufacturer memory) {
        Declarations.Manufacturer memory manufacturer = manufacturers[_account];
        require(manufacturer.account != address(0), 'Manufacturer does not exist');
        return manufacturer;
    }

    function getWholesaler(address _account) public view override returns (Declarations.Wholesaler memory) {
        Declarations.Wholesaler memory wholesaler = wholesalers[_account];
        require(wholesaler.account != address(0), 'Wholesaler does not exist');
        return wholesaler;
    }

    function getDistributor(address _account) public view override returns (Declarations.Distributor memory) {
        Declarations.Distributor memory distributor = distributors[_account];
        require(distributor.account != address(0), 'Distributor does not exist');
        return distributor;
    }

    function getHospital(address _account) public view override returns (Declarations.Hospital memory) {
        Declarations.Hospital memory hospital = hospitals[_account];
        require(hospital.account != address(0), 'Hospital does not exist');
        return hospital;
    }

    // Functions to get all participants
    function getAllDistributors() public view override returns (address[] memory) {
        return distributorAccounts;
    }

    function getAllWholesalers() public view override returns (address[] memory) {
        return wholesalerAccounts;
    }

    function getAllManufacturers() public view override returns (address[] memory) {
        return manufacturerAccounts;
    }

    function getAllHospital() public view override returns (address[] memory) {
        return hospitalAccounts;
    }

    // Events
    event ManufacturerRegistered(string username, address account);
    event WholesalerRegistered(string username, address account);
    event DistributorRegistered(string username, address account);
    event HospitalRegistered(string username, address account);
}
