import React, { useState } from "react";
import CommHead from "./CommHead";
import CommFoot from "./CommFoot";
import CommNote from "./CommNote";
import { Link } from "react-router-dom";

const SelectProfile = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileSelect = (type) => {
    setSelectedProfile(type);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <CommHead />
      <div className="bg-[url(resources/images/banner1.svg)] px-4 md:px-14 pt-2 pb-16 h-[25dvh] md:h-[35dvh]">
        <div className="max-w-full mx-auto mt-6 sm:mt-12">
          <button className="bg-white text-gray-700 px-4 py-2 rounded-btn mb-8 hover:bg-gray-50 transition-colors">
            ← Back
          </button>
        </div>
      </div>

      {/* Profile Selection Card */}
      <div className="relative -top-25 md:-top-45 sm:-top-35 px-4 md:h-[60vh]">
        <div className="max-w-[50%] mx-auto bg-white rounded-container shadow-lg p-6 sm:px-16 sm:py-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Select your profile Type
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>

          {/* Profile Options */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Individual Profile */}
            <div>
              <div
                className={`border-2 relative rounded-lg p-6 text-center cursor-pointer transition-all hover:shadow-md ${
                  selectedProfile === "individual"
                    ? "border-[#009EB4] bg-[#009EB440]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleProfileSelect("individual")}>
                {selectedProfile === "individual" && (
                  <span className="">
                    <img
                      className="font-semibold absolute right-4 top-4"
                      src="resources/icons/rightCricle.svg"
                    />
                  </span>
                )}
                <div className="mb-4">
                  <div className="w-26 h-32 rounded-lg mx-auto flex items-center justify-center">
                    <img
                      className="font-semibold"
                      src="resources/icons/people.svg"
                      alt="people"
                    />
                  </div>
                </div>
              </div>

              <h3 className="font-normal text-gray-600 text-center  mt-2">
                Continue as Individual
              </h3>
            </div>

            <div>
              <div
                className={`border-2 relative rounded-lg p-6 text-center cursor-pointer transition-all hover:shadow-md ${
                  selectedProfile === "company"
                    ? "border-[#009EB4] bg-[#009EB440]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleProfileSelect("company")}>
                {selectedProfile === "company" && (
                  <span className="">
                    <img
                      className="font-semibold absolute right-4 top-4"
                      src="resources/icons/rightCricle.svg"
                    />
                  </span>
                )}
                <div className="mb-4">
                  <div className="w-26 h-32 rounded-lg mx-auto flex items-center justify-center">
                    <img
                      className="font-semibold"
                      src="resources/icons/building.svg"
                    />
                  </div>
                </div>
              </div>

              <h3 className="font-normal text-gray-600 text-center  mt-2">
                Continue as Copmany
              </h3>
            </div>
          </div>

          {/* Info Note */}
          <CommNote
            text={"You can add your company details from your profile"}
          />

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="custom-btn bg-[#009EB4] text-white">
              Continue as Guest
            </button>
            <Link
              // to="/Choose-Identity"
              // className={`custom-btn bg-[#F4C63B] ${
              to={"/User-web/SignUp"}
              className={`flex-1 py-3 px-6 rounded-btn font-medium transition-colors ${
                selectedProfile
                  ? "bg-[#F4C63B] text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!selectedProfile}>
              Next Step
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <CommFoot />
    </div>
  );
};

export default SelectProfile;
