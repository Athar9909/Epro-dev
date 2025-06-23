import React, { useState } from "react";
import { Link } from "react-router-dom";

const AppWelcome = ({ setCurrentScreen }) => {

  return (
    <div className="min-h-screen"
      style={{
        backgroundImage: "url('/resourcesApp/imagesApp/loginBg.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
      <div className="fixed bottom-8 p-4">
        <h1 className="text-white text-[40px]">Get Quality Products at the Best Prices!</h1>
        <p className="text-white text-[14px] py-2">Affordable rates, easy ordering, and unbeatable value—all in one place!</p>
        <div className="flex flex-col gap-4">
          <button className="pri-btn"
            onClick={() => setCurrentScreen("SelectProfile")}>Register</button>
          <Link to="/User-App/Login" className="pri-btn text-center">Login</Link>
        </div>
        <div className="flex justify-between items-center my-4">
          <hr className="text-white w-1/4" />
          <span className="text-white">Or Continue With</span>
          <hr className="text-white w-1/4" />
        </div>
        <div className="flex flex-col gap-2">
          <button className="sec-btn ">Continue as Guest</button>
        </div>
      </div>
    </div>
  );
};

export default AppWelcome;
