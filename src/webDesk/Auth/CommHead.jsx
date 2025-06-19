import i18next from "i18next";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserType } from "../../Redux-config/apisModel/apiService";
import { useEffect } from "react";

const CommHead = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const currentLanguage = i18next.language;
  const { userType } = useSelector((state) => state.misc);
  const navigate = useNavigate();
  const registerData = useSelector((state) => state.misc.registerData);

  console.log(registerData, "DataType");

  useEffect(() => {
    setUserType(userType || "buyer");
    if (userType === "") {
      navigate("/");
    }
  }, [userType]);

  const toggleLanguageDropdown = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng);
    setIsLanguageOpen(false);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  return (
    <div>
      <div className="px-4 py-4 md:px-14 md:py-5">
        <div className="flex items-center justify-between mx-auto">
          <div className="flex items-center space-x-4">
            <img
              className="text-teal-500 font-bold text-xl"
              src="/resources/logo/logo.svg"
              alt="Logo"
            />
          </div>
          <div className="flex items-center space-x-4 relative">
            <div
              className="text-sm bg-[#F2EFEA] flex gap-2 items-center p-2 rounded-btn px-4 cursor-pointer"
              onClick={toggleLanguageDropdown}>
              <img
                className="text-teal-500 font-bold text-xl"
                src="/resources/icons/language.svg"
                alt="language-icon"
              />
              <span>{currentLanguage === "en" ? "English" : "العربية"}</span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${
                  isLanguageOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                <div
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    currentLanguage === "en" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => changeLanguage("en")}>
                  English
                </div>
                <div
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    currentLanguage === "ar" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => changeLanguage("ar")}>
                  العربية
                </div>
              </div>
            )}
            <Link
              to={"/Login"}
              className="bg-[#009EB4] text-white px-4 py-2 rounded-btn transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommHead;
