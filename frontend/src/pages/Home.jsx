import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url("https://cdn.pixabay.com/photo/2022/01/14/00/46/road-6936241_1280.jpg")] h-screen pt-8 flex justify-between flex-col w-full'>
        <img className="w-16 ml-8" src="/logo.png" alt="" />

        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link
            to={"/login"}
            className=" flex items-center justify-center w-full bg-black text-white py-3 rounded  mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;