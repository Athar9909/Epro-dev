import React, { useState } from "react";
import { Check } from "lucide-react";
import AppStepOne from "./AppStepOne";
import AppStepTwo from "./AppStepTwo";
import AppVerificationStep from "./AppStepThree";
import AppStepFour from "./AppStepFour";
import AppStepFive from "./AppStepFive";
import AppStepFourTwo from "./AppStepFourTwo";

const AppStartSignUp = () => {
  const [currentStep, setCurrentStep] = useState(4);
  const steps = [
    { id: 1, title: "STEP 01", label: "Identity" },
    { id: 2, title: "STEP 02", label: "Email" },
    { id: 3, title: "STEP 03", label: "Verification" },
    { id: 4, title: "STEP 04", label: "Complete" },
    { id: 5, title: "STEP 04", label: "Subscription" },
    { id: 6, title: "STEP 04", label: "Subscription" },
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

  return (
    <div className="min-h-screen bg-[#eaf9f6] app-container">
      <div
        className="max-w-[90vw] mx-auto">
        {/* <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div> */}
        {/* "Choose-Identity" */}
        {currentStep === 1 && <AppStepOne setCurrentStep={setCurrentStep} />}
        {/* {"Select Verify Type"} */}
        {currentStep === 2 && (
          <AppStepTwo type={"email"} setCurrentStep={setCurrentStep} />
        )}
        {/* {"Verification"} */}
        {currentStep === 3 && (
          <AppVerificationStep type={"email"} setCurrentStep={setCurrentStep} />
        )}
        {/* {"Register Form"} */}
        {currentStep === 4 && <AppStepFour setCurrentStep={setCurrentStep} />}
        {currentStep === 5 && <AppStepFourTwo setCurrentStep={setCurrentStep} />}
        {currentStep === 6 && (
          <AppStepFive
            setCurrentStep={setCurrentStep}
            setVarHeight={setVarHeight}
          />
        )}
      </div>
    </div>
  );
};

export default AppStartSignUp;
