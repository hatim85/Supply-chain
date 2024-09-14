// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenRewards is ERC20 {
    address public owner;

    constructor() ERC20("TokenRewards", "RT") {
        owner = msg.sender;
        _mint(owner, 1000000 * 10 ** decimals()); // Pre-mint 1,000,000 tokens
    }

    // Only owner can mint new tokens
    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Only owner can mint tokens");
        _mint(to, amount);
    }

    // Only owner can burn tokens
    function burn(address from, uint256 amount) external {
        require(msg.sender == owner, "Only owner can burn tokens");
        _burn(from, amount);
    }
}
