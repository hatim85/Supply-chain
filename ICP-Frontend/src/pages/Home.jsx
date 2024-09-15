import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Navbar } from "../components";
import { useStateContext } from "../context/StateContext";
const Home = () => {
  const navigate = useNavigate();
  const userRole = [
    {
      title: "Manufacturer",
      link: "manufacturer",
      style: "bg-white w-[200px]",
    },
    {
      title: "Wholesaler",
      link: "wholesaler",
      style: "bg-orange-400 text-white w-[200px]",
    },
    {
      title: "Distributor",
      link: "distributor",
      style: "bg-blue-400 w-[200px]",
    },

    {
      title: "Hospital",
      link: "hospital",
      style: "bg-green-500 text-white w-[200px]",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="pt-[150px] flex flex-col justify-center items-center gap-8 px-4">
        <h1
          className="text-white font-bold text-[32px]
        font-mono"
        >
          Select a Role :
        </h1>
        {userRole.map((role, index) => (
          <div
            onClick={() => navigate("/dashboard/" + role.link)}
          >
            <Button title={role.title} style={role.style} key={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
