import React from "react";
import { Button, Navbar, RequestTable } from "../components";

const Wholesaler = () => {
  const headers = ["Request Id", "Batch Id", "Requester", "Status"];
  const requestHistory = [
    [{ id: 0 }, { batch: 0 }, { requester: "address" }, { status: "Pending" }],
  ];
  return (
    <div>
      <Navbar />
      <div className="flex flex-col py-8 gap-10 px-2 justify-center items-center">
        <div
          className="border rounded-2xl border-gray-600 flex flex-col w-[50%] 
         justify-center items-center py-4 bg-[#404040]
        "
        >
          <span className="text-[44px] text-gray-50 ">10</span>
          <span className="text-white font-semibold">
            Total Wholesaler Requests
          </span>
        </div>
        <div className="w-full">
          <RequestTable headers={headers} requestHistory={requestHistory} />
        </div>

        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <span className="text-white font-semibold text-[30px] ">
            Accept Requests from Distributor
          </span>
          <form className="flex flex-col justify-center items-center w-full gap-6">
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
            <button>
              <Button title={"Approve Request"} style={"bg-blue-300"} />
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <span className="text-white font-semibold text-[30px] ">
            Accept Requests from Hospital
          </span>
          <form className="flex flex-col justify-center items-center w-full gap-6">
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
            <button>
              <Button title={"Approve Request"} style={"bg-red-300"} />
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <span className="text-white font-semibold text-[30px] ">
            Request Drugs
          </span>
          <form className="flex flex-col justify-center items-center w-full gap-6">
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
            <button>
              <Button title={"Send Request"} style={"bg-blue-300"} />
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center">
          <span className="text-white font-semibold text-[30px] ">
            Send Deliver Request to Distributor
          </span>
          <form className="flex flex-col justify-center items-center w-full gap-6">
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="request_id" className="text-white font-mono ">
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
              <label htmlFor="request_id" className="text-white font-mono ">
                Enter Distributor <br />
                Address :
              </label>
              <input
                type="text"
                name="batch_id"
                id="batch_id"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <button>
              <Button title={"Create Request"} style={"bg-green-300"} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Wholesaler;
