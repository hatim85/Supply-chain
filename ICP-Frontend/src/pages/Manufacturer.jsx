import React, { useState, useEffect } from "react";
import { Button, Navbar, RequestTable } from "../components";
import Ethers from "../utils/Ethers"; // Ensure Ethers is imported correctly

const Manufacturer = () => {
  const [walletAddress, setWalletAddress] = useState(null);

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

  const headers = [
    "Request Id",
    "Drug Name",
    "Quantity",
    "Requester",
    "Status",
  ];

  const requestHistory = [
    [
      { id: 0 },
      { name: "Dolo" },
      { quantity: 100 },
      { requester: "address" },
      { status: "Pending" },
    ],
  ];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col py-8 px-2 justify-center items-center gap-4">
        <div
          className="border rounded-2xl border-gray-600 flex flex-col w-[50%] 
         justify-center items-center py-4 bg-[#404040]"
        >
          <span className="text-[44px] text-gray-50 ">10</span>
          <span className="text-white font-semibold">
            Total Manufacturer Requests
          </span>
        </div>

        {/* Display connected wallet address or connect button */}
        <div className="text-center py-4">
          {walletAddress ? (
            <div className="text-black font-semibold">
              Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
          ) : (
            <Button
              onClick={connectWallet}
              title={"Connect Wallet"}
              style={"bg-black text-white max-w-[160px]"}
            />
          )}
        </div>

        <div className="w-full">
          <RequestTable headers={headers} requestHistory={requestHistory} />
        </div>

        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <span className="text-white font-semibold text-[30px] ">
            Approve Requests
          </span>
          <form className="flex flex-col justify-center items-center w-full gap-6">
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="request_id" className="text-white font-mono">
                Enter Request ID :
              </label>
              <input
                type="number"
                min={0}
                name="request_id"
                id="request_id"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="qr_code" className="text-white font-mono">
                Enter QR Code :
              </label>
              <input
                type="text"
                name="qr_code"
                id="qr_code"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="crypto_key" className="text-white font-mono">
                Enter Crypto Key :
              </label>
              <input
                type="text"
                name="crypto_key"
                id="crypto_key"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="exp_date" className="text-white font-mono">
                Enter no. of days <br />
                for Expiry :
              </label>
              <input
                type="number"
                min={1}
                name="exp_date"
                id="exp_date"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <button type="button">
              <Button title={"Approve Request"} style={"bg-blue-300"} />
            </button>
          </form>
        </div>

        <div className="flex flex-col pt-8 gap-4 justify-center items-center">
          <span className="text-white font-semibold text-[30px] ">
            Create Transfer Request
          </span>
          <form className="flex flex-col justify-center items-center w-full gap-6">
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="batch_id" className="text-white font-mono">
                Enter Batch ID :
              </label>
              <input
                type="number"
                min={0}
                name="batch_id"
                id="batch_id"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="distributor_address" className="text-white font-mono">
                Enter Distributor <br />
                Address :
              </label>
              <input
                type="text"
                name="distributor_address"
                id="distributor_address"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <button type="button">
              <Button title={"Create Request"} style={"bg-green-300"} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Manufacturer;
