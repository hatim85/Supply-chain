import React, { useState, useEffect } from "react";
import { Button, Navbar, RequestTable } from "../components";
import Ethers from '../utils/Ethers'; // Adjust the import path accordingly

const Wholesaler = () => {
  const [contract, setContract] = useState(null);
  const [distributorRequests, setDistributorRequests] = useState([]);
  const [request1Data, setRequest1Data] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);

  // Fetch the contract on component mount
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const { provider, signer, contract } = Ethers('wholesaler');
          setContract(contract);
        } catch (error) {
          console.error('User denied account access', error);
        }
      } else {
        alert('MetaMask is not installed');
      }
    };
    init();
  }, []);

  // Load data when the contract is set
  useEffect(() => {
    if (contract) {
      loadData();
    }
  }, [contract]);

  const loadData = async () => {
    try {
      // Get total requests (if required)
      const total = await contract.getAllRequests1();
      setTotalRequests(total);

      // Fetch Distributor Requests
      const distributorRequests = await contract.getAllDistributorRequests();
      const formattedDistributorRequests = distributorRequests.map((request) => ({
        id: request.id,
        batchId: request.batchId,
        requester: request.requester,
        status: request.status
      }));
      setDistributorRequests(formattedDistributorRequests);

      // Fetch Request1 Data (Hospital Requests)
      const request1Data = await contract.getAllRequests1();
      const formattedRequest1Data = request1Data.map((request) => ({
        id: request.id,
        batchId: request.batchId,
        requester: request.requester,
        status: request.status
      }));
      setRequest1Data(formattedRequest1Data);
    } catch (error) {
      console.error('Error loading data', error);
    }
  };

  // Event handlers for form submissions (same as before)
  const handleAcceptRequestFromDistributor = async (event) => {
    event.preventDefault();
    const requestId = event.target.req_id.value;
    try {
      const tx = await contract.acceptDeliveryRequestFromDistributor1(requestId);
      await tx.wait();
      alert('Request accepted');
      loadData();
    } catch (error) {
      console.error('Error accepting request', error);
    }
  };

  const handleAcceptRequestFromHospital = async (event) => {
    event.preventDefault();
    const requestId = event.target.req_id.value;
    const batchId = event.target.batch_id.value;
    try {
      const tx = await contract.approveRequestFromHospital(requestId, batchId);
      await tx.wait();
      alert('Request accepted');
      loadData();
    } catch (error) {
      console.error('Error accepting request', error);
    }
  };

  const handleRequestDrugs = async (event) => {
    event.preventDefault();
    const drugName = event.target.drug_name.value;
    const quantity = event.target.quantity.value;
    const manufacturerAddress = event.target.man_add.value;
    try {
      const tx = await contract.requestDrugs(drugName, quantity, manufacturerAddress);
      const receipt=await tx.wait();
      const event=receipt.events?.filter(x=>x.event=="RequestCreated")[0];
      if (event) {
        const { requestId, requester, drugName, quantity, manufacturer } = event.args;

        // Log the details from the event to the console
        console.log("Request ID:", requestId.toString());
        console.log("Requester:", requester);
        console.log("Drug Name:", drugName);
        console.log("Quantity:", quantity.toString());
        console.log("Manufacturer:", manufacturer);
    } else {
        console.error("RequestCreated event not found in the receipt logs");
    }
      alert('Drug request sent');
      loadData();
    } catch (error) {
      console.error('Error requesting drugs', error);
    }
  };

  const handleSendDeliveryRequest = async (event) => {
    event.preventDefault();
    const batchId = event.target.batch_id.value;
    const distributorAddress = event.target.dist_add.value;
    try {
      const tx = await contract.createDeliveryRequestToDistributor(batchId, distributorAddress);
      await tx.wait();
      alert('Delivery request sent');
      loadData();
    } catch (error) {
      console.error('Error sending delivery request', error);
    }
  };

  const distributorHeaders = ["Request Id", "Batch Id", "Requester", "Status"];
  const request1Headers = ["Request Id", "Batch Id", "Requester", "Status"];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col py-8 gap-10 px-2 justify-center items-center">
        <div className="border rounded-2xl border-gray-600 flex flex-col w-[50%] justify-center items-center py-4 bg-[#404040]">
          <span className="text-[44px] text-gray-50 ">{totalRequests}</span>
          <span className="text-white font-semibold">
            Total Wholesaler Requests
          </span>
        </div>

        {/* Display Distributor Requests */}
        <div className="w-full">
          <div className="text-center text-white text-lg">Distributor Requests</div>
          <RequestTable headers={distributorHeaders} requestHistory={distributorRequests} />
        </div>

        {/* Display Request1 Data (Hospital Requests) */}
        <div className="w-full">
        <div className="text-center text-white text-lg">Hospital Requests</div>
          <RequestTable headers={request1Headers} requestHistory={request1Data} />
        </div>

        {/* Accept Requests from Distributor */}
        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <span className="text-white font-semibold text-[30px] ">
            Accept Requests from Distributor
          </span>
          <form onSubmit={handleAcceptRequestFromDistributor} className="flex flex-col justify-center items-center w-full gap-6">
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="req_id" className="text-white font-mono">
                Request Id :
              </label>
              <input
                type="number"
                min={1}
                name="req_id"
                id="req_id"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <button type="submit">
              <Button title={"Approve Request"} style={"bg-blue-300"} />
            </button>
          </form>
        </div>

        {/* Accept Requests from Hospital */}
        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <span className="text-white font-semibold text-[30px] ">
            Accept Requests from Hospital
          </span>
          <form onSubmit={handleAcceptRequestFromHospital} className="flex flex-col justify-center items-center w-full gap-6">
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="req_id" className="text-white font-mono">
                Request Id :
              </label>
              <input
                type="number"
                min={1}
                name="req_id"
                id="req_id"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="batch_id" className="text-white font-mono">
                Batch Id :
              </label>
              <input
                type="number"
                min={1}
                name="batch_id"
                id="batch_id"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <button type="submit">
              <Button title={"Approve Request"} style={"bg-red-300"} />
            </button>
          </form>
        </div>

        {/* Request Drugs */}
        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <span className="text-white font-semibold text-[30px] ">
            Request Drugs
          </span>
          <form onSubmit={handleRequestDrugs} className="flex flex-col justify-center items-center w-full gap-6">
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="drug_name" className="text-white font-mono">
                Enter Drug Name:
              </label>
              <input
                type="text"
                name="drug_name"
                id="drug_name"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="quantity" className="text-white font-mono">
                Enter Quantity :
              </label>
              <input
                type="number"
                min={1}
                name="quantity"
                id="quantity"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="man_add" className="text-white font-mono">
                Enter Manufacturer <br /> Address :
              </label>
              <input
                type="text"
                name="man_add"
                id="man_add"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <button type="submit">
              <Button title={"Send Request"} style={"bg-blue-300"} />
            </button>
          </form>
        </div>

        {/* Send Delivery Request to Distributor */}
        <div className="flex flex-col gap-4 justify-center items-center">
          <span className="text-white font-semibold text-[30px] ">
            Send Delivery Request to Distributor
          </span>
          <form onSubmit={handleSendDeliveryRequest} className="flex flex-col justify-center items-center w-full gap-6">
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="batch_id" className="text-white font-mono ">
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
              <label htmlFor="dist_add" className="text-white font-mono ">
                Enter Distributor <br />
                Address :
              </label>
              <input
                type="text"
                name="dist_add"
                id="dist_add"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <button type="submit">
              <Button title={"Create Request"} style={"bg-green-300"} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Wholesaler;