// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TokenRewards.sol";

contract PharmaChain {
    TokenRewards public tokenContract;
    address public owner;

    constructor(TokenRewards _tokenContract){
        tokenContract=_tokenContract;
        owner=msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this");
        _;
    }

    // Function to reward participants for meeting performance metrics
    function rewardParticipant(address participant, uint256 amount) public onlyOwner {
        tokenContract.mint(participant, amount);
        emit RewardIssued(participant, amount);
    }

    // Function to penalize participants for breaches
    function penalizeParticipant(address participant, uint256 amount) public onlyOwner {
        tokenContract.burn(participant, amount);
        emit PenaltyIssued(participant, amount);
    }

    // Example: Reward for on-time delivery
    function rewardOnTimeDelivery(address participant) public onlyOwner {
        rewardParticipant(participant, 100); // Issue 100 tokens for on-time delivery
    }

    // Example: Penalize for late delivery
    function penalizeLateDelivery(address participant) public onlyOwner {
        penalizeParticipant(participant, 50); // Deduct 50 tokens for late delivery
    }

    // Events for transparency
    event RewardIssued(address indexed participant, uint256 amount);
    event PenaltyIssued(address indexed participant, uint256 amount);

    struct Manufacturer {
        string username;
        address account;
    }

    mapping(address => Manufacturer) public manufacturers;
    address[] public manufacturerAccounts;

    struct Wholesaler {
        string username;
        address account;
    }

    mapping(address => Wholesaler) public wholesalers;
     address[] public wholesalerAccounts;

    struct Distributor {
        string username;
        address account;
    }

    mapping(address => Distributor) public distributors;
    address[] public distributorAccounts;

    struct HospitalPharmacy {
        string username;
        address account;
    }

    mapping(address => HospitalPharmacy) public hospitalpharmacies;
     address[] public hospitalpharmacyAccounts;

    function registerManufacturer(string memory _username, address _account) public onlyOwner {
        manufacturers[_account] = Manufacturer(_username, _account);
        manufacturerAccounts.push(_account);
    }

    function getManufacturer(address _account) public view returns (Manufacturer memory) {
        Manufacturer memory manufacturer = manufacturers[_account];
        require(manufacturer.account != address(0), "Manufacturer does not exist");
        return manufacturer;
    }

     function registerWholesaler(string memory _username, address _account) public onlyOwner {
        wholesalers[_account] = Wholesaler(_username, _account);
        wholesalerAccounts.push(_account);
    }

    function getWholesaler(address _account) public view returns (Wholesaler memory) {
        Wholesaler memory wholesaler = wholesalers[_account];
        require(wholesaler.account != address(0), "Wholesaler does not exist");
        return wholesaler;
    }

     function registerDistributor(string memory _username, address _account) public onlyOwner {
        distributors[_account] = Distributor(_username, _account);
        distributorAccounts.push(_account);
    }

    function getDistributor(address _account) public view returns (Distributor memory) {
        Distributor memory distributor = distributors[_account];
        require(distributor.account != address(0), "Distributor does not exist");
        return distributor;
    }

     function registerHospitalPharmacy(string memory _username, address _account) public onlyOwner {
        hospitalpharmacies[_account] = HospitalPharmacy(_username, _account);
        hospitalpharmacyAccounts.push(_account);
    }

    function getHospitalPharmacy(address _account) public view returns (HospitalPharmacy memory) {
        HospitalPharmacy memory hospitalpharmacy = hospitalpharmacies[_account];
        require(hospitalpharmacy.account != address(0), "Hospital/Pharmacy does not exist");
        return hospitalpharmacy;
    }


     function getAllDistributors() public view returns (address[] memory) {
        return distributorAccounts;
    }

    
     function getAllWholesalers() public view returns (address[] memory) {
        return wholesalerAccounts;
    }

    
     function getAllManufacturers() public view returns (address[] memory) {
        return manufacturerAccounts;
    }

    
     function getAllHospitalPharmacies() public view returns (address[] memory) {
        return hospitalpharmacyAccounts;
    }
}