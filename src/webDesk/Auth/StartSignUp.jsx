import React, { useState, useMemo, useCallback } from "react";
import CommHead from "./commHead";
import CommFoot from "./CommFoot";
import CommNote from "./CommNote";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import { useSelector } from "react-redux";

const STEPS = [
  { id: 1, title: "STEP 01", label: "Identity" },
  { id: 2, title: "STEP 02", label: "Email" },
  { id: 3, title: "STEP 03", label: "Verification" },
  { id: 4, title: "STEP 04", label: "Complete" },
  { id: 5, title: "STEP 05", label: "Subscription" },
];

const StepIndicator = React.memo(({ steps, currentStep }) => (
  <div className="flex justify-start items-center gap-4 flex-wrap">
    {steps.map((step, index) => (
      <React.Fragment key={step.id}>
        <div className="flex flex-row items-center gap-2">
          <motion.div
            className={`w-6 h-6 relative top-[3px] rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${
              step.id === currentStep
                ? "bg-[#009EB4] text-white shadow-lg"
                : step.id < currentStep
                ? "bg-[#009EB4] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
            animate={{
              scale: step.id === currentStep ? 1.1 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}>
            {step.id < currentStep ? <Check size={16} /> : step.id}
          </motion.div>
          <span
            className={`text-[14px] font-medium ${
              step.id === currentStep ? "text-[#009EB4]" : "text-gray-400"
            }`}>
            {step.title}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div className="h-[2px] flex-1 w-10 max-w-[40px] bg-[#009EB4]" />
        )}
      </React.Fragment>
    ))}
  </div>
));

const StartSignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [varHeight, setVarHeight] = useState("100vh");
  const [userIdType, setUserIdType] = useState("email");

  const getDynamicHeight = useCallback(() => {
    switch (currentStep) {
      case 1:
        return "70vh";
      case 2:
        return "70vh";
      case 3:
        return "70vh";
      case 4:
        return "110vh";
      case 5:
        return varHeight;
      default:
        return "70dvh";
    }
  }, [currentStep, varHeight]);

  const currentStepComponent = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            setCurrentStep={setCurrentStep}
            userIdType={userIdType}
            setUserIdType={setUserIdType}
            key="step1"
          />
        );
      case 2:
        return (
          <StepTwo
            type={userIdType}
            setCurrentStep={setCurrentStep}
            userIdType={userIdType}
            key="step2"
          />
        );
      case 3:
        return (
          <StepThree
            type={userIdType}
            setCurrentStep={setCurrentStep}
            userIdType={userIdType}
            key="step3"
          />
        );
      case 4:
        return (
          <StepFour
            setCurrentStep={setCurrentStep}
            userIdType={userIdType}
            key="step4"
          />
        );
      case 5:
        return (
          <StepFive
            setCurrentStep={setCurrentStep}
            setVarHeight={setVarHeight}
            userIdType={userIdType}
            key="step5"
          />
        );
      default:
        return null;
    }
  }, [currentStep, userIdType]);

  return (
    <motion.div
      className="min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <CommHead />

      <div className="bg-[url('/resources/images/banner1.svg')] px-4 md:px-14 pt-2 pb-16 h-[25dvh] md:h-[35dvh]" />

      <div
        className="relative -top-25 md:-top-45 sm:-top-35 px-4 items-center"
        style={{ height: getDynamicHeight() }}>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
          <div className="flex justify-between bg-[#F7F7F7] rounded-t-xl px-2 md:px-8 md:py-6 items-start flex-col sm:flex-row p-4 gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Sign Up Process
            </h1>
            <StepIndicator steps={STEPS} currentStep={currentStep} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}>
              {currentStepComponent}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <CommFoot />
    </motion.div>
  );
};

export default React.memo(StartSignUp);
