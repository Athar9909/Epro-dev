import React, { useState } from "react";
// import CommNote from "./CommNote";
import { Link } from "react-router-dom";

const AppStepOne = ({ setCurrentStep }) => {
  const [verifyType, setVerifyType] = useState("email");

  const handleProfileSelect = (type) => {
    setVerifyType(type);
  };

  return (
    <div className="bg-white rounded-[16px] max-w-3xl mx-auto p-4">
      <div className="text-center mb-6 ">
        <h2 className="text-[20px] font-bold text-gray-900 mb-1">
          Confirm your identity
        </h2>
        <p className="text-gray-600 text-[12px] leading-relaxed">
          Please choose the method you prefer to verify your identity.
        </p>
      </div>

      <div className="flex gap-2">
        {[
          {
            id: "email",
            label: "Email",
            icon1: "/resources/icons/emailId.svg",
            icon2: "/resources/icons/emailDis.svg",
          },
          {
            id: "phone",
            label: "Phone",
            icon1: "/resources/icons/PhoneId.svg",
            icon2: "/resources/icons/phoneDis.svg",
          },
          {
            id: "nafath",
            label: "Nafath",
            icon1: "/resources/icons/nicDis.svg",
            icon2: "/resources/icons/nicDis.svg",
          },
        ].map((opt) => (
          <div
            key={opt.id}
            onClick={() => handleProfileSelect(opt.id)}
            className={`h-24 w-24 border p-2 flex justify-center items-center mx-auto rounded-[10px] flex-col cursor-pointer transition-all duration-300 hover:shadow-md ${verifyType === opt.id
              ? "border-[#009EB4] bg-[#009EB420]"
              : "border-gray-200 "
              }`}>
            <div className="flex items-center justify-center">
              <img
                src={verifyType === opt.id ? opt.icon1 : opt.icon2}
                alt={opt.label}
                className="w-12 h-12"
              />
            </div>
            <h3 className={`font-normal text-center mt-2 ${verifyType === opt.id ? "text-[#009EB4]" : "text-gray-300"}`}>
              {opt.label}
            </h3>

          </div>
        ))}
      </div>

      <div className="border border-[#009EB4] bg-[#F6FEFF] p-2 flex gap-1 items-center rounded-[10px] text-xs my-6">
        <img
          className="font-semibold w-6 h-6"
          src="/resourcesApp/iconsApp/infoActive.svg"
          alt="info"
        />
        <p>You can add your company details from your profile</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center my-4">
        <hr className="text-[#e5e5e5] w-1/3" />
        <span className="">Or</span>
        <hr className="text-[#e5e5e5] w-1/3" />
      </div>
      <div className="flex">
        <div
          onClick={() => setCurrentStep((prev) => prev + 1)}
          className="pri-btn text-center"
          to={"/User-App/SignUp"}>
          Continue
        </div>
      </div>

    </div>
  );
};

export default AppStepOne;
