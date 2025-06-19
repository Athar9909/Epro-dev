import React, { useEffect, useState } from "react";
import CommNote from "./CommNote";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterData } from "../../Redux-config/slices/miscSlice";

const StepOne = ({ setCurrentStep, userIdType, setUserIdType }) => {
  const [verifyType, setVerifyType] = useState(userIdType);
  const registerData = useSelector((state) => state.misc.registerData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRegisterData({ ...registerData, userVerifyType: "email" }));
  }, []);

  const handleProfileSelect = (type) => {
    setVerifyType(type);
    setUserIdType(type);
    dispatch(setRegisterData({ ...registerData, userVerifyType: type }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="text-center mb-6 ">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
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
                verifyType === opt.id
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
        text={"Verification of this required field is necessary to continue."}
      />

      <div className="flex space-x-4">
        <Link to={-1} className="custom-btn bg-[#F7F7F7] text-gray-800 ">
          Back
        </Link>

        <Link
          //   to={"/SignUpNow"}
          onClick={() => setCurrentStep((prev) => prev + 1)}
          className="custom-btn bg-[#009EB4] text-white ">
          Continue
        </Link>
      </div>
    </motion.div>
  );
};

export default StepOne;
