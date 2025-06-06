import React, { useState } from "react";
import CommHead from "./commHead";
import CommFoot from "./CommFoot";
import CommNote from "./CommNote";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const SignUpMain = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentStep, setCurrentStep] = useState(2);
  const [verifyType, setVerifyType] = useState("email");
  const steps = [
    { id: 1, title: "STEP 01", label: "Identity" },
    { id: 2, title: "STEP 02", label: "Email" },
    { id: 3, title: "STEP 03", label: "Verification" },
    { id: 4, title: "STEP 04", label: "Complete" },
  ];

  const handleProfileSelect = (type) => {
    setSelectedProfile(type);
    setVerifyType(type);
  };

  const StepIndicator = ({ steps, currentStep }) => (
    <div className="flex justify-start items-center gap-4 flex-wrap ">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-row items-center gap-2">
            <div
              className={`w-6 h-6 relative top-[3px]  rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${
                step.id === currentStep
                  ? "bg-[#009EB4] text-white shadow-lg scale-110"
                  : step.id < currentStep
                  ? "bg-[#009EB4] text-white"
                  : "bg-gray-200 text-gray-500 "
              }`}>
              {step.id < currentStep ? <Check size={16} /> : step.id}
            </div>
            <span
              className={`text-[14px] font-medium  ${
                step.id === currentStep ? "text-[#009EB4]" : "text-gray-400"
              }`}>
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`h-[2px] flex-1 w-10 max-w-[40px] bg-[#009EB4]`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <CommHead />

      <div className="bg-[url(/resources/images/banner1.svg)]  px-4 md:px-14 pt-2 pb-16 h-[25dvh] md:h-[35dvh]"></div>

      <div className="relative -top-25 md:-top-45 sm:-top-35 px-4 md:h-[70vh] items-center">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
          <div className="flex justify-between bg-[#F7F7F7]  rounded-t-xl px-2 md:px-8 md:py-6 items-start flex-col sm:flex-row p-4 gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Sign Up Process
            </h1>
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>
          <div className="p-6 md:p-10 max-w-3xl mx-auto">
            <div className="text-center mb-6 ">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Confirm your identity
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Please choose the method you prefer to verify your identity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center mt-8 ">
              {[
                {
                  id: "email",
                  label: "Continue With Email",
                  icon1: "/resources/icons/emailId.svg",
                  icon2: "/resources/icons/emailDis.svg",
                },
                {
                  id: "phone",
                  label: "Continue With Phone",
                  icon1: "/resources/icons/PhoneId.svg",
                  icon2: "/resources/icons/phoneDis.svg",
                },
                {
                  id: "nafath",
                  label: "Continue With Nafath",
                  icon1: "/resources/icons/nicDis.svg",
                  icon2: "/resources/icons/nicDis.svg",
                },
              ].map((opt) => (
                <div>
                  <div
                    key={opt.id}
                    onClick={() => handleProfileSelect(opt.id)}
                    className={`border p-4 w-50 h-50 flex justify-center items-center mx-auto rounded-full cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedProfile === opt.id
                        ? "border-[#009EB4] bg-[#009EB420]"
                        : "border-gray-200 "
                    }`}>
                    <div className="flex items-center justify-center">
                      <img
                        src={verifyType === opt.id ? opt.icon1 : opt.icon2}
                        alt={opt.label}
                        className="w-20 h-20"
                      />
                    </div>
                  </div>
                  <h3 className="font-normal text-gray-600 text-center  mt-2">
                    {opt.label}
                  </h3>
                </div>
              ))}
            </div>

            <CommNote
              text={
                "Verification of this required field is necessary to continue."
              }
            />

            <div className="flex space-x-4">
              <Link to={-1} className="custom-btn bg-[#F7F7F7] text-gray-800 ">
                Back
              </Link>

              <button className="custom-btn bg-[#009EB4] text-white ">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <CommFoot />
    </div>
  );
};

export default SignUpMain;
