import React from "react";

const RequestTable = ({ headers, requestHistory }) => {
  return (
    <div className=" flex flex-col h-[220px] mt-3 mb-20 rounded-[10px] border-[1px] border-[rgba(175,175,175,0.3)]">
      <div className="overflow-x-auto flex flex-col rounded-t-[7px]">
        <table>
          <thead className="bg-gray-50  rounded-t-[7px]">
            <tr className="border-b-[1px] rounded-t-[7px] border-b-[rgba(175,175,175,0.3)]">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="pl-3 p-2 font-[700] text-[#404040] text-[14px] border-r-[1px] border-r-[rgba(175,175,175,0.3)] "
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-100 text-sm font-light text-ellipsis ">
            {requestHistory.length > 0 &&
              requestHistory.map((request, index) => (
                <tr
                  key={index}
                  className="text-center border-b border-gray-200 hover:bg-gray-600"
                >
                  {request.map((detail, indexInner) => (
                    <td className="py-2" key={indexInner}>
                      {Object.values(detail)[0]}
                    </td>
                  ))}
                </tr>
              ))}
            {requestHistory.length < 1 && (
              <div class="flex flex-col items-center my-5 ">
                <img
                  src="https://topmate.io/_next/image?url=%2Fimages%2Fdashboard%2Ftestimonials%2FTestimonialEmpty.svg&w=256&q=75"
                  class="w-[100px]"
                  alt=""
                />
                <p class="text-[16px] mt-2 text-[#ffffff] font-[600]">
                  No Data
                </p>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestTable;
