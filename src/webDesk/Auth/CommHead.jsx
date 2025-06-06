import React from "react";
import { Link } from "react-router-dom";

const CommHead = () => {
  return (
    <div>
      <div className=" px-4 py-4 md:px-14 md:py-5">
        <div className="flex items-center justify-between  mx-auto">
          <div className="flex items-center space-x-4">
            <img
              className="text-teal-500 font-bold text-xl"
              src="resources/logo/logo.svg"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className=" text-sm bg-[#F2EFEA] flex gap-2 items-center p-2 rounded-btn px-4">
              <img
                className="text-teal-500 font-bold text-xl"
                src="resources/icons/language.svg"
                alt="language-logo"
              />
              <span>English</span>
            </div>
            <Link
              to={"/User-Web-Login"}
              className="bg-[#009EB4] text-white px-4 py-2 rounded-btn transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommHead;
