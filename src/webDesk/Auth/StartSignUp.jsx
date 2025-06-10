import React, { useState } from "react";
import CommHead from "./commHead";
import CommFoot from "./CommFoot";
import CommNote from "./CommNote";
import { Check } from "lucide-react";
import StepOne from "./StepOne";
import StepTow from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

const StartSignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, title: "STEP 01", label: "Identity" },
    { id: 2, title: "STEP 02", label: "Email" },
    { id: 3, title: "STEP 03", label: "Verification" },
    { id: 4, title: "STEP 04", label: "Complete" },
    { id: 5, title: "STEP 04", label: "Subscription" },
  ];

  const [varHeight, setVarHeight] = useState("100vh");

  const StepIndicator = ({ steps, currentStep }) => (
    <div className="flex justify-start items-center gap-4 flex-wrap ">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-row items-center gap-2">
            <div
              className={`w-6 h-6 relative top-[3px]  rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${step.id === currentStep
                  ? "bg-[#009EB4] text-white shadow-lg scale-110"
                  : step.id < currentStep
                    ? "bg-[#009EB4] text-white"
                    : "bg-gray-200 text-gray-500 "
                }`}>
              {step.id < currentStep ? <Check size={16} /> : step.id}
            </div>
            <span
              className={`text-[14px] font-medium  ${step.id === currentStep ? "text-[#009EB4]" : "text-gray-400"
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

  const getDynamicHieght = () => {
    switch (currentStep) {
      case 1:
        return "70vh";
      case 2:
        return "70vh";
      case 3:
        return "50vh";
      case 4:
        return "110vh";
      case 5:
        return varHeight;
      default:
        return "50dvh";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <CommHead />
      <div
        className={`bg-[url(/resources/images/banner1.svg)] px-4 md:px-14 pt-2 pb-16 h-[25dvh] md:h-[35dvh]`}></div>
      <div
        className="relative -top-25 md:-top-45 sm:-top-35 px-4 items-center"
        style={{ height: getDynamicHieght() }}>
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
          <div className="flex justify-between bg-[#F7F7F7]  rounded-t-xl px-2 md:px-8 md:py-6 items-start flex-col sm:flex-row p-4 gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Sign Up Process
            </h1>
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>
          {/* "Choose-Identity" */}
          {currentStep === 1 && <StepOne setCurrentStep={setCurrentStep} />}
          {/* {"Select Verify Type"} */}
          {currentStep === 2 && (
            <StepTow type={"email"} setCurrentStep={setCurrentStep} />
          )}
          {/* {"Verification"} */}
          {currentStep === 3 && (
            <StepThree type={"email"} setCurrentStep={setCurrentStep} />
          )}
          {/* {"Register Form"} */}
          {currentStep === 4 && <StepFour setCurrentStep={setCurrentStep} />}
          {currentStep === 5 && (
            <StepFive
              setCurrentStep={setCurrentStep}
              setVarHeight={setVarHeight}
            />
          )}
        </div>
      </div>

      <CommFoot />
    </div>
  );
};

export default StartSignUp;
