import React, { useState, useEffect, useMemo } from "react";
import { Navbar, RequestTable, Button } from "../components";
import Ethers from "../utils/Ethers"; // Import the Ethers utility

const Hospital = () => {
  const [hospitalRequests, setHospitalRequests] = useState([]);
  const [drugName, setDrugName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [wholesalerAddress, setWholesalerAddress] = useState("");
  const [requestId, setRequestId] = useState("");

  // Use useMemo to memoize the contract and prevent unnecessary re-initialization
  const hospitalContract = useMemo(() => Ethers("hospital").contract, []);

  // Fetch hospital requests once the contract is initialized
  useEffect(() => {
    if (hospitalContract) {
      fetchHospitalRequests();
    }
  }, [hospitalContract]);

  const fetchHospitalRequests = async () => {
    try {
      const requests = await hospitalContract.getAllRequests2();
      setHospitalRequests(requests);
    } catch (error) {
      console.error("Failed to fetch hospital requests:", error);
    }
  };

  const handleRequestDrugs = async () => {
    try {
      await hospitalContract.requestDrugsFromWholesaler(drugName, quantity, wholesalerAddress);
      alert("Drug request sent!");
      fetchHospitalRequests(); // Refresh the list after sending the request
    } catch (error) {
      console.error("Failed to request drugs from wholesaler:", error);
    }
  };

  const handleAcceptDeliveryRequestFromDistributor = async () => {
    try {
      await hospitalContract.acceptDeliveryRequestFromDistributor2(requestId);
      alert("Delivery request from distributor accepted!");
      fetchHospitalRequests(); // Refresh the list of requests
    } catch (error) {
      console.error("Failed to accept delivery request from distributor:", error);
    }
  };

  const handleAcceptDeliveryRequestFromWholesaler = async () => {
    try {
      await hospitalContract.acceptDeliveryRequestFromWholesaler(requestId);
      alert("Delivery request from wholesaler accepted!");
      fetchHospitalRequests(); // Refresh the list of requests
    } catch (error) {
      console.error("Failed to accept delivery request from wholesaler:", error);
    }
  };

  const headers = [
    "Request Id",
    "Drug Name",
    "Quantity",
    "Requester",
    "Status",
  ];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col py-8 gap-10 px-2 justify-center items-center text-center">
        <div
          className="border rounded-2xl border-gray-600 flex flex-col w-[50%] 
         justify-center items-center py-4 bg-[#404040]"
        >
          <span className="text-[44px] text-gray-50 ">{hospitalRequests.length}</span>
          <span className="text-white font-semibold">Total Hospital Requests</span>
        </div>
        <div className="w-full">
          <RequestTable
            headers={headers}
            requestHistory={hospitalRequests.map(req => [
              { id: req.requestId.toString() },
              { name: req.drugName },
              { quantity: req.quantity.toString() },
              { requester: req.requester },
              { status: req.status },
            ])}
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <span className="text-white font-semibold text-[30px]">Request Drugs from Wholesaler</span>
          <form className="flex flex-col justify-center items-center w-full gap-6" onSubmit={(e) => {
            e.preventDefault();
            handleRequestDrugs();
          }}>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="drug_name" className="text-white font-mono">Enter Drug Name :</label>
              <input
                type="text"
                id="drug_name"
                className="rounded-md p-1 outline-none"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="quantity" className="text-white font-mono">Enter Quantity :</label>
              <input
                type="number"
                min={0}
                id="quantity"
                className="rounded-md p-1 outline-none"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="wholesaler_address" className="text-white font-mono">Enter Wholesaler Address :</label>
              <input
                type="text"
                id="wholesaler_address"
                className="rounded-md p-1 outline-none"
                value={wholesalerAddress}
                onChange={(e) => setWholesalerAddress(e.target.value)}
              />
            </div>
            <button type="submit">
              <Button title={"Send Request"} style={"bg-blue-300"} />
            </button>
          </form>
        </div>

        <div className="flex flex-col pt-8 gap-4 justify-center items-center">
          <span className="text-white font-semibold text-[30px]">Accept Delivery Request from Distributor</span>
          <form className="flex flex-col justify-center items-center w-full gap-6" onSubmit={(e) => {
            e.preventDefault();
            handleAcceptDeliveryRequestFromDistributor();
          }}>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="request_id_distributor" className="text-white font-mono">Enter Request ID :</label>
              <input
                type="number"
                id="request_id_distributor"
                className="rounded-md p-1 outline-none"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
              />
            </div>
            <button type="submit">
              <Button title={"Accept Request"} style={"bg-green-300"} />
            </button>
          </form>
        </div>

        <div className="flex flex-col pt-8 gap-4 justify-center items-center">
          <span className="text-white font-semibold text-[30px]">Accept Delivery Request from Wholesaler</span>
          <form className="flex flex-col justify-center items-center w-full gap-6" onSubmit={(e) => {
            e.preventDefault();
            handleAcceptDeliveryRequestFromWholesaler();
          }}>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="request_id_wholesaler" className="text-white font-mono">Enter Request ID :</label>
              <input
                type="number"
                id="request_id_wholesaler"
                className="rounded-md p-1 outline-none"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
              />
            </div>
            <button type="submit">
              <Button title={"Accept Request"} style={"bg-yellow-400"} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hospital;
