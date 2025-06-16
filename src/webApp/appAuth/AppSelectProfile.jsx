import { Info } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AppSelectProfile = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileSelect = (type) => {
    setSelectedProfile(type);
  };

  return (
    <div className="min-h-screen bg-[#eaf9f6] app-container">
      {/* Profile Selection Card */}
      <div className=" bg-white max-w-[90vw] mx-auto p-4 rounded-[16px]">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Select your profile Type
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Choose your profile to personalize your experience.
          </p>
        </div>

        {/* Profile Options */}
        <div className="grid grid-cols-2 gap-6">
          {/* Individual Profile */}
          <div>
            <div
              className={`border-2 relative rounded-lg p-3 text-center cursor-pointer transition-all hover:shadow-md ${selectedProfile === "user"
                ? "border-[#009EB4] bg-[#009EB440]"
                : "border-gray-200 hover:border-gray-300"
                }`}
              onClick={() => handleProfileSelect("user")}>
              <div className="w-26 h-32 rounded-lg mx-auto flex items-center justify-center">
                <div className="flex justify-center items-center flex-col">
                  {
                    selectedProfile === "user" ?
                      <img
                        className="font-semibold"
                        src="resourcesApp/iconsApp/userActive.svg"
                        alt="user"
                      />
                      :
                      <img
                        className="font-semibold"
                        src="resourcesApp/iconsApp/user.svg"
                        alt="user"
                      />
                  }
                  <h3
                    className={`${selectedProfile !== "user" ? "text-gray-300" : "text-[#009EB4]"
                      } font-normal text-center mt-2`}
                  >
                    Individual
                  </h3>

                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              className={`border-2 relative rounded-lg p-3 text-center cursor-pointer transition-all hover:shadow-md ${selectedProfile === "company"
                ? "border-[#009EB4] bg-[#009EB440]"
                : "border-gray-200 hover:border-gray-300"
                }`}
              onClick={() => handleProfileSelect("company")}>
              <div className="w-26 h-32 rounded-lg mx-auto flex items-center justify-center">
                <div className="flex justify-center items-center flex-col">
                  {
                    selectedProfile === "company" ?
                      <img
                        className="font-semibold"
                        src="resourcesApp/iconsApp/companyActive.svg"
                        alt="company"
                      />
                      :
                      <img
                        className="font-semibold"
                        src="resourcesApp/iconsApp/company.svg"
                        alt="company"
                      />
                  }
                  <h3
                    className={`${selectedProfile !== "company" ? "text-gray-300" : "text-[#009EB4]"
                      } font-normal text-center mt-2`}
                  >
                    Company
                  </h3>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-[#009EB4] bg-[#F6FEFF] p-2 flex gap-1 items-center rounded-[10px] text-xs my-6">
          <img
            className="font-semibold w-6 h-6"
            src="resourcesApp/iconsApp/infoActive.svg"
            alt="info"
          />
          <p>You can add your company details from your profile</p>
        </div>

        {/* Action Buttons */}
        <div className="flex">
          <Link className="pri-btn text-center"
           to={"/User-App/SignUp"}>
            Continue
          </Link>
        </div>
            <div className="flex justify-between items-center my-4">
          <hr className="text-[#e5e5e5] w-1/3" />
          <span className="">Or</span>
          <hr className="text-[#e5e5e5] w-1/3" />
        </div>
        <div className="flex space-x-4">
          <button className="sec-btn">
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppSelectProfile;
