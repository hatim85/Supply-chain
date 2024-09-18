import React, { useState, useEffect } from "react";
import { Navbar, RequestTable } from "../components";
import QRCode from "react-qr-code"; // Import react-qr-code
import Ethers from "../utils/Ethers";

const Manufacturer = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [totalRequests, setTotalRequests] = useState(0);
  const [requestHistory, setRequestHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(""); // Add state for QR code

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const { signer, contract } = Ethers("manufacturer");
            const address = await signer.getAddress();
            setWalletAddress(address);
            fetchRequests(contract);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const { signer, contract } = Ethers("manufacturer");
      const address = await signer.getAddress();
      setWalletAddress(address);
      console.log("Wallet connected:", address);
      fetchRequests(contract);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const fetchRequests = async (contract) => {
    setLoading(true);
    try {
      const requests = await contract.getAllWholesalerRequests();
      setTotalRequests(requests.length);
      setRequestHistory(requests.map((request, index) => ({
        id: index,
        name: request.drugName,
        quantity: request.quantity.toNumber(),
        requester: request.requester,
        status: request.status,
      })));
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (event) => {
    event.preventDefault();
    const requestId = event.target.request_id.value;
    const drugName = event.target.drug_name.value;
    const expDays = parseInt(event.target.exp_date.value);

    if (!requestId || !drugName || !expDays) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        const { contract } = Ethers("manufacturer");
        const tx = await contract.approveRequest(
            requestId,
            drugName,
            [expDays], 
            { gasLimit: 300000 } // Set a higher gas limit
        );
        await tx.wait();
        alert("Request approved successfully!");
        fetchRequests(contract);
    } catch (error) {
        console.error("Error approving request:", error);
        alert("Failed to approve request. Check console for details.");
    }
};




  const handleCreateTransferRequest = async (event) => {
    event.preventDefault();
    const batchId = event.target.batch_id.value;
    const distributorAddress = event.target.distributor_address.value;

    if (!batchId || !distributorAddress) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const { contract } = Ethers("manufacturer");
      const tx = await contract.createTransferRequestToDistributor(batchId, distributorAddress);
      await tx.wait();
      alert("Transfer request created successfully!");
      fetchRequests(contract);
    } catch (error) {
      console.error("Error creating transfer request:", error);
      alert("Failed to create transfer request");
    }
  };

  const headers = ["Request Id", "Drug Name", "Quantity", "Requester", "Status"];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col py-8 px-2 justify-center items-center gap-4">
        <div className="border rounded-2xl border-gray-600 flex flex-col w-[50%] justify-center items-center py-4 bg-[#404040]">
          <span className="text-[44px] text-gray-50 ">{totalRequests}</span>
          <span className="text-white font-semibold">Total Manufacturer Requests</span>
        </div>

        <div className="text-center py-4">
          {walletAddress ? (
            <div className="text-black font-semibold">
              Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-black text-white px-4 py-2 rounded-md max-w-[160px]"
            >
              Connect Wallet
            </button>
          )}
        </div>

        <div className="w-full">
          {loading ? (
            <div className="text-center text-white">Loading requests...</div>
          ) : (
            <RequestTable headers={headers} requestHistory={requestHistory} />
          )}
        </div>

        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <span className="text-white font-semibold text-[30px] ">Approve Requests</span>
          <form onSubmit={handleApproveRequest} className="flex flex-col justify-center items-center w-full gap-6">
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
              <label htmlFor="drug_name" className="text-white font-mono">
                Enter Drug Name :
              </label>
              <input
                type="text"
                name="drug_name"
                id="drug_name"
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
            <button
              type="submit"
              className="bg-blue-300 text-white px-4 py-2 rounded-md"
            >
              Approve Request
            </button>
          </form>

        </div>

        <div className="flex flex-col pt-8 gap-4 justify-center items-center">
          <span className="text-white font-semibold text-[30px] ">Create Transfer Request</span>
          <form onSubmit={handleCreateTransferRequest} className="flex flex-col justify-center items-center w-full gap-6">
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
            <button
              type="submit"
              className="bg-green-300 text-white px-4 py-2 rounded-md"
            >
              Create Transfer Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Manufacturer;
