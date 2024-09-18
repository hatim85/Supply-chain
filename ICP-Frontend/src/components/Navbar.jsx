import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useStateContext } from "../context/StateContext";
import Ethers from "../utils/Ethers"; // Ensure Ethers is imported correctly

const Navbar = () => {
  const { role } = useStateContext();
  const [walletAddress, setWalletAddress] = useState(null);
  const [isOnBitfinity, setIsOnBitfinity] = useState(true);

  // Bitfinity network details
  const bitfinityChainId = '0x56b29'; // Replace with the Bitfinity testnet chain ID

  // Function to connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const { signer } = Ethers(); // No contractKey needed here
      const address = await signer.getAddress();
      setWalletAddress(address); // Set the wallet address in state
      console.log("Wallet connected:", address);

      checkNetwork(); // Check network after connecting
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  // Function to check if user is on the Bitfinity network
  const checkNetwork = async () => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== bitfinityChainId) {
      setIsOnBitfinity(false);
    } else {
      setIsOnBitfinity(true);
    }
  };

  // Function to switch network to Bitfinity
  const switchToBitfinity = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: bitfinityChainId }]
      });
      setIsOnBitfinity(true);
    } catch (error) {
      // If the network is not added to the user's wallet, prompt to add it
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: bitfinityChainId,
                chainName: 'Bitfinity Testnet',
                rpcUrls: ['https://testnet.bitfinity.network/'], // Add RPC URL for Bitfinity testnet
                nativeCurrency: {
                  name: 'Bitfinity',
                  symbol: 'BFT', // Use the appropriate symbol for Bitfinity
                  decimals: 18,
                },
                blockExplorerUrls: ['https://explorer.bitfinity.network'], // Add Block Explorer URL
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add network:", addError);
        }
      } else {
        console.error("Failed to switch network:", error);
      }
    }
  };

  // Check if wallet is already connected when the component mounts
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const { signer } = Ethers(); // No contractKey needed here
            const address = await signer.getAddress();
            setWalletAddress(address); // Set the wallet address if already connected
            checkNetwork(); // Check network after getting accounts
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="bg-white w-full px-3 flex justify-between items-center py-2">
      <ul className="flex gap-4 font-semibold text-gray-700">
        <Link to="/">
          <li>Home</li>
        </Link>
        <li>Dashboard</li>
      </ul>

      {walletAddress ? (
        isOnBitfinity ? (
          <div className="text-black font-semibold">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </div>
        ) : (
          <Button
            onClick={switchToBitfinity}
            title={"Switch to Bitfinity"}
            style={"bg-red-500 text-white max-w-[160px]"}
          />
        )
      ) : (
        <Button
          onClick={connectWallet}
          title={"Connect wallet"}
          style={"bg-black text-white max-w-[160px]"}
        />
      )}
    </div>
  );
};

export default Navbar;
