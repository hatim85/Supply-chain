import React from "react";
import { Navbar, RequestTable, Button } from "../components";

const Hospital = () => {
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
      <div className="flex flex-col py-8 gap-10 px-2 justify-center items-center text-center">
        <div
          className="border rounded-2xl border-gray-600 flex flex-col w-[50%] 
         justify-center items-center py-4 bg-[#404040]
        "
        >
          <span className="text-[44px] text-gray-50 ">10</span>
          <span className="text-white font-semibold">
            Total Hospital Requests
          </span>
        </div>
        <div className="w-full">
          <RequestTable headers={headers} requestHistory={requestHistory} />
        </div>
        <div className="flex flex-col justify-center items-center gap-2 px-2">
          <span className="text-white font-semibold text-[30px]  ">
            Request Drugs from Wholesaler
          </span>
          <form className="flex flex-col justify-center items-center w-full gap-6">
          <div className="flex gap-2 justify-center items-center">
              <label htmlFor="quant" className="text-white font-mono">
                Enter Drug Name :
              </label>
              <input
                type="text"
                name="quant"
                id="quant"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="quant" className="text-white font-mono">
                Enter Quantity :
              </label>
              <input
                type="number"
                min={0}
                name="quant"
                id="quant"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="quant" className="text-white font-mono">
                Enter Wholesaler Address :
              </label>
              <input
                type="text"
                name="quant"
                id="quant"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <button>
              <Button title={"Send Request"} style={"bg-blue-300"} />
            </button>
          </form>
        </div>

        <div className="flex flex-col pt-8 gap-4 justify-center items-center">
          <span className="text-white font-semibold text-[30px] ">
            Accept Delivery Request from WholeSaler
          </span>
          <form className="flex flex-col justify-center items-center w-full gap-6">
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="request_id" className="text-white font-mono ">
                Enter request ID :
              </label>
              <input
                type="number"
                min={0}
                name="request_id"
                id="request_id"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <button>
              <Button title={"Create Request"} style={"bg-green-300"} />
            </button>
          </form>
        </div>

        <div className="flex flex-col pt-8 gap-4 justify-center items-center">
          <span className="text-white font-semibold text-[30px] ">
            Accept Delivery Request from Distributor
          </span>
          <form className="flex flex-col justify-center items-center w-full gap-6">
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="request_id" className="text-white font-mono ">
                Enter request ID :
              </label>
              <input
                type="number"
                min={0}
                name="request_id"
                id="request_id"
                className="rounded-md p-1 outline-none"
              />
            </div>
            <button>
              <Button title={"Create Request"} style={"bg-yellow-400"} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hospital;
