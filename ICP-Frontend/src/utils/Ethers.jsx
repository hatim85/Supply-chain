// Ethers.js
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from './config';

function Ethers(contractKey) {
    // Check if MetaMask is installed
    if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return {};
    }

    // Get the provider and signer from MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // If no contractKey is provided, return only provider and signer
    if (!contractKey) {
        return { provider, signer };
    }

    // Retrieve contract address and ABI from config based on the provided contract key
    const contractAddress = CONTRACT_ADDRESSES[contractKey];
    const contractABI = CONTRACT_ABIS[contractKey];

    // Check if the contract key exists in the config
    if (!contractAddress || !contractABI) {
        console.error("Invalid contract key or contract details not found in config");
        return {};
    }

    // Create a new contract instance using ethers
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Return provider, signer, and contract instance
    return { provider, signer, contract };
}

export default Ethers;