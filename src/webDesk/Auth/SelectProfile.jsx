import React, { useState } from "react";
import CommHead from "./CommHead";
import CommFoot from "./CommFoot";
import CommNote from "./CommNote";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "../../Redux-config/common";
import {
  setRegisterData,
  setRegisterType,
} from "../../Redux-config/slices/miscSlice";

const SelectProfile = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerData = useSelector((state) => state.misc.registerData);

  const handleProfileSelect = (type) => {
    setSelectedProfile(type);
    dispatch(setRegisterType(type));
    dispatch(setRegisterData({ ...registerData, userIdType: type }));
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <CommHead />
      <div className="bg-[url(/resources/images/banner1.svg)] px-4 md:px-14 pt-2 pb-16 h-[25dvh] md:h-[35dvh]">
        <button
          onClick={() => navigate(-1)}
          className="bg-white text-gray-700 px-4 py-2 rounded-btn mb-8 hover:bg-gray-50 transition-colors">
          ← Back
        </button>
      </div>

      <div className="relative -top-25 md:-top-45 sm:-top-35 px-4 min-h-[50vh] h-[60vh]">
        <motion.div
          className="max-w-[50%] mx-auto bg-white rounded-container shadow-lg p-6 sm:px-16 sm:py-10"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}>
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

          <div className="grid grid-cols-2 gap-6 mb-8">
            {["individual", "company"].map((type) => (
              <motion.div
                key={type}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                className={`border-2 relative rounded-lg p-6 text-center cursor-pointer transition-all hover:shadow-md ${
                  selectedProfile === type
                    ? "border-[#009EB4] bg-[#009EB440]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleProfileSelect(type)}>
                {selectedProfile === type && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-4 top-4">
                    <img
                      className="font-semibold"
                      src="/resources/icons/rightCricle.svg"
                      alt="Selected"
                    />
                  </motion.span>
                )}
                <div className="mb-4">
                  <div className="w-26 h-32 rounded-lg mx-auto flex items-center justify-center">
                    <img
                      className="font-semibold"
                      src={
                        type === "individual"
                          ? "/resources/icons/people.svg"
                          : "/resources/icons/building.svg"
                      }
                      alt={
                        type === "individual"
                          ? "Individual profile"
                          : "Company profile"
                      }
                    />
                  </div>
                </div>
                <h3 className="font-normal text-gray-600 text-center mt-2">
                  Continue as {type === "individual" ? "Individual" : "Company"}
                </h3>
              </motion.div>
            ))}
          </div>

          <CommNote
            text={"You can add your company details from your profile"}
          />

          <div className="flex space-x-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="custom-btn bg-[#009EB4] text-white">
              Continue as Guest
            </motion.button>
            {selectedProfile ? (
              <motion.div whileTap={{ scale: 0.97 }} className="flex-1">
                <Link
                  to="/User-web/SignUp"
                  className="block w-full py-3 px-6 rounded-btn font-medium transition-colors bg-[#F4C63B] text-white hover:bg-gray-800 text-center">
                  Next Step
                </Link>
              </motion.div>
            ) : (
              <button
                className="flex-1 py-3 px-6 rounded-btn font-medium bg-gray-200 text-gray-500 cursor-not-allowed"
                disabled>
                Next Step
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <CommFoot />
    </motion.div>
  );
};

export default SelectProfile;
