// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.26;
import "../library/Declarations.sol";

interface IDrug {
    function createDrug(string memory qrCode, string memory cryptoKey, uint256 expirationDate) external;
    function getDrugInfo(string memory qrCode) external view returns (Declarations.Drug memory);
    function updateDrugStatus(string memory qrCode, string memory newStatus) external;
}
