// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useStateContext } from "../context/StateContext";
import Ethers from "../utils/Ethers"; // Ensure Ethers is imported correctly

const Navbar = () => {
  const { role } = useStateContext();
  const [walletAddress, setWalletAddress] = useState(null);

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

      // Optionally, you can store it in localStorage or context
      // localStorage.setItem('walletAddress', address);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
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
        <div className="text-black font-semibold">
          Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </div>
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
