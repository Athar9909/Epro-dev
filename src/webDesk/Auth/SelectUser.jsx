import React, { useState } from "react";
import CommHead from "./CommHead";
import CommFoot from "./CommFoot";
import CommNote from "./CommNote";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  setRegisterData,
  setUserType,
} from "../../Redux-config/slices/miscSlice";

const SelectUser = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleProfileSelect = (type) => {
    setSelectedProfile(type);
    dispatch(setUserType(type));
    dispatch(setRegisterData({ userType: type }));
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <CommHead />
      <div className="bg-[url(resources/images/banner1.svg)] px-4 md:px-14 pt-2 pb-16 h-[25dvh] md:h-[35dvh]">
        <div className="max-w-full mx-auto mt-6 sm:mt-12">
          <Link to={-1} className="inline-block">
            <button className="bg-white text-gray-700 px-4 py-2 rounded-btn mb-8 hover:bg-gray-50 transition-colors">
              ← Back
            </button>
          </Link>
        </div>
      </div>

      <div className="relative -top-25 md:-top-45 sm:-top-35 px-4 min-h-[50vh] h-[60vh]">
        <motion.div
          className="max-w-[50%] mx-auto bg-white rounded-container shadow-lg p-6 sm:px-16 sm:py-10"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Select your Sign-In Option
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Please Select Your Profile Type
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {["buyer", "vendor"].map((type) => (
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
                      src="resources/icons/rightCricle.svg"
                      alt="Selected"
                    />
                  </motion.span>
                )}
                <div className="mb-4">
                  <div className="w-26 h-32 rounded-lg mx-auto flex items-center justify-center">
                    <img
                      className="font-semibold"
                      src={
                        type === "buyer"
                          ? "resources/icons/people.svg"
                          : "resources/icons/building.svg"
                      }
                      alt={
                        type === "vendor"
                          ? "Individual profile"
                          : "Company profile"
                      }
                    />
                  </div>
                </div>
                <h3 className="font-normal text-gray-600 text-center mt-2">
                  Continue as {type === "buyer" ? "Buyer" : "Vendor"}
                </h3>
              </motion.div>
            ))}
          </div>

          <CommNote text={"Click On Register Now To Start Sign Up"} />

          <div className="flex space-x-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/Login")}
              className="custom-btn bg-[#009EB4] text-white">
              Login
            </motion.button>
            {selectedProfile ? (
              <motion.div whileTap={{ scale: 0.97 }} className="flex-1">
                <Link
                  to="/User-web/Profile-Selection"
                  className="block w-full py-3 px-6 rounded-btn font-medium transition-colors bg-[#F4C63B] text-white hover:bg-gray-800 text-center">
                  Register Now
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

export default SelectUser;
