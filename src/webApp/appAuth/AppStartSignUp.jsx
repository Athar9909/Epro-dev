import React, { useState } from "react";
import { Check, ChevronLeft } from "lucide-react";
import AppStepOne from "./AppStepOne";
import AppStepTwo from "./AppStepTwo";
import AppVerificationStep from "./AppStepThree";
import AppStepFour from "./AppStepFour";
import AppStepFive from "./AppStepFive";
import AppStepFourTwo from "./AppStepFourTwo";
import { useNavigate } from "react-router-dom";

const AppStartSignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate()
  const steps = [
    { id: 1, title: "STEP 01", label: "Identity" },
    { id: 2, title: "STEP 02", label: "Email" },
    { id: 3, title: "STEP 03", label: "Verification" },
    { id: 4, title: "STEP 04", label: "Complete" },
    { id: 5, title: "STEP 05", label: "Subscription" },
  ];

  const handleClick = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      // console.log(currentStep)
    } else {
      navigate(-1);
      // console.log("Navigate to previous page");
    }
  }
  console.log("currentStep:", currentStep)

  const [varHeight, setVarHeight] = useState("100vh");

  return (
    <div className="min-h-screen bg-[#eaf9f6] app-container">
      <div
        className="max-w-[640px] w-full mx-auto">
        {
          currentStep < 4 && <div
            className="w-10 h-10 bg-white shadow-2xl absolute top-4 left-6 text-[#009eb4] flex justify-center items-center rounded-[10px]"
            onClick={handleClick}
          >
            <ChevronLeft />
          </div>
        }

        {/* "Choose-Identity" */}
        {currentStep === 1 && <AppStepOne
          currentStep={currentStep}
          setCurrentStep={setCurrentStep} />}
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
        {/* {currentStep === 5 && <AppStepFourTwo setCurrentStep={setCurrentStep} />} */}
        {currentStep === 5 && (
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
