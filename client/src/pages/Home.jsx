import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold">Home Page</h1>
      </div>
    </div>
  );
};

export default Home;