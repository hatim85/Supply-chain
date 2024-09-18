import React, { useState, useEffect, useMemo } from "react";
import { Navbar, RequestTable, Button } from "../components";
import Ethers from "../utils/Ethers";

const Distributor = () => {
  const [distributorRequests, setDistributorRequests] = useState([]);
  const [requestId, setRequestId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [wholesalerAddress, setWholesalerAddress] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");

  // Use useMemo to memoize the contract so it's not re-initialized unnecessarily
  const distributorContract = useMemo(() => Ethers("distributor").contract, []);

  useEffect(() => {
    if (distributorContract) {
      fetchDistributorRequests();
    }
  }, [distributorContract]);

  const fetchDistributorRequests = async () => {
    try {
      const requests = await distributorContract.getAllHospitalRequests();
      setDistributorRequests(requests);
    } catch (error) {
      console.error("Failed to fetch distributor requests:", error);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      await distributorContract.acceptTransferRequestFromManufacturer(requestId);
      alert("Request accepted!");
      fetchDistributorRequests();
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  };

  const handleCreateDeliveryRequestToWholesaler = async () => {
    try {
      await distributorContract.createDeliveryRequestToWholesaler(batchId, wholesalerAddress);
      alert("Delivery request to wholesaler created!");
    } catch (error) {
      console.error("Failed to create delivery request to wholesaler:", error);
    }
  };

  const handleCreateDeliveryRequestToHospital = async () => {
    try {
      await distributorContract.createDeliveryRequestToHospital(batchId, hospitalAddress);
      alert("Delivery request to hospital created!");
    } catch (error) {
      console.error("Failed to create delivery request to hospital:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col py-8 gap-10 px-2 justify-center items-center text-center">
        <div className="border rounded-2xl border-gray-600 flex flex-col w-[50%] justify-center items-center py-4 bg-[#404040]">
          <span className="text-[44px] text-gray-50 ">{distributorRequests.length}</span>
          <span className="text-white font-semibold">Total Distributor Requests</span>
        </div>
        <div className="w-full">
          <RequestTable
            headers={["Request Id", "Batch Id", "Requester", "Recipient", "Status"]}
            requestHistory={distributorRequests.map(req => [
              { id: req.requestId.toString() },
              { batchId: req.batchId.toString() },
              { requester: req.requester },
              { recipient: req.recipient },
              { status: req.status },
            ])}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <span className="text-white font-semibold text-[30px]">Accept Transfer Requests from Manufacturer</span>
          <form className="flex flex-col justify-center items-center w-full gap-6" onSubmit={(e) => {
            e.preventDefault();
            handleAcceptRequest();
          }}>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="request_id" className="text-white font-mono">Enter Request ID :</label>
              <input
                type="number"
                min={0}
                name="request_id"
                id="request_id"
                className="rounded-md p-1 outline-none"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
              />
            </div>
            <button type="submit">
              <Button title={"Approve Request"} style={"bg-blue-300"} />
            </button>
          </form>
        </div>

        <div className="flex flex-col pt-8 gap-4 justify-center items-center">
          <span className="text-white font-semibold text-[30px]">Create Delivery Request to Wholesaler</span>
          <form className="flex flex-col justify-center items-center w-full gap-6" onSubmit={(e) => {
            e.preventDefault();
            handleCreateDeliveryRequestToWholesaler();
          }}>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="batch_id" className="text-white font-mono">Enter Batch ID :</label>
              <input
                type="number"
                min={0}
                name="batch_id"
                id="batch_id"
                className="rounded-md p-1 outline-none"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="wholesaler_address" className="text-white font-mono">Enter Wholesaler Address :</label>
              <input
                type="text"
                name="wholesaler_address"
                id="wholesaler_address"
                className="rounded-md p-1 outline-none"
                value={wholesalerAddress}
                onChange={(e) => setWholesalerAddress(e.target.value)}
              />
            </div>
            <button type="submit">
              <Button title={"Create Request"} style={"bg-green-300"} />
            </button>
          </form>
        </div>

        <div className="flex flex-col pt-8 gap-4 justify-center items-center">
          <span className="text-white font-semibold text-[30px]">Create Delivery Request to Hospital</span>
          <form className="flex flex-col justify-center items-center w-full gap-6" onSubmit={(e) => {
            e.preventDefault();
            handleCreateDeliveryRequestToHospital();
          }}>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="batch_id" className="text-white font-mono">Enter Batch ID :</label>
              <input
                type="number"
                min={0}
                name="batch_id"
                id="batch_id"
                className="rounded-md p-1 outline-none"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="hospital_address" className="text-white font-mono">Enter Hospital Address :</label>
              <input
                type="text"
                name="hospital_address"
                id="hospital_address"
                className="rounded-md p-1 outline-none"
                value={hospitalAddress}
                onChange={(e) => setHospitalAddress(e.target.value)}
              />
            </div>
            <button type="submit">
              <Button title={"Create Request"} style={"bg-yellow-400"} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Distributor;
