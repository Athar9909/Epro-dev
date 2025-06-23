import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppPopUp from "../components/AppPopUp";
import AppTutorial from "./AppTutorial";
import { setRegisterData } from "../../Redux-config/slices/miscSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUserType } from "../../Redux-config/apisModel/apiService";
import AppWelcome from "./AppWelcome";
import { ChevronLeft } from "lucide-react";

const AppSplash = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("Tutorial");
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerData = useSelector((state) => state.misc.registerData);
  const location = useLocation();

  const handleProfileSelect = (type) => {
    setSelectedProfile(type);
    dispatch(setRegisterData({ ...registerData, userType: type }));
  };

  useEffect(() => {
    setUserType(selectedProfile || "buyer");
    if (selectedProfile === "") {
      navigate("/");
    }
  }, [selectedProfile, navigate]);

  useEffect(() => {
    if (location.state) {
      setCurrentScreen(location.state.currentStep);
    }
  }, []);

  console.log(currentScreen)

  const renderScreen = () => {
    switch (currentScreen) {
      case "Tutorial":
        return (
          <AppTutorial
            step={step}
            setStep={setStep}
            setCurrentScreen={setCurrentScreen}
          />
        );
      case "Language":
        return (
          <div className="min-h-screen bg-[#eaf9f6] app-container overflow-x-hidden">
            <AppPopUp
              popupType="bottomPopup"
              heading="Choose Language"
              options={[
                { label: "English (EN)", img: '/resources/icons/en.svg' },
                { label: "العربية", img: '/resources/icons/ar.svg' },
              ]}
              setSelectedOption={setSelectedOption}
              setCurrentScreen={setCurrentScreen}
              backBtn={true}
            />
          </div>
        );
      case "SelectProfile":
        return (
          <div className="min-h-screen bg-[#eaf9f6] flex justify-center items-center overflow-x-hidden">
            <div
              className="w-10 h-10  bg-white shadow-2xl absolute top-4 left-6 border border-[#e5e5e5] text-[#009eb4] flex justify-center items-center rounded-[10px] cursor-pointer"
              onClick={() => setCurrentScreen("Welcome")}
              role="button"
              tabIndex={0}
              aria-label="Go back"
            >
              <ChevronLeft />
            </div>
            <div className="bg-white max-w-[90vw] mx-auto p-4 rounded-[16px]">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Select your Sign-In Option
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Please Select Your Profile Type
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {["buyer", "Vendor"].map((profileType) => (
                  <div key={profileType}>
                    <div
                      className={`border-2 relative rounded-lg p-3 text-center cursor-pointer transition-all hover:shadow-md ${
                        selectedProfile === profileType
                          ? "border-[#009EB4] bg-[#009EB440]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleProfileSelect(profileType)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${profileType} profile`}
                    >
                      <div className="w-26 h-32 rounded-lg mx-auto flex items-center justify-center">
                        <div className="flex justify-center items-center flex-col">
                          <img
                            src={`resourcesApp/iconsApp/${
                              profileType === "buyer" ? "user" : "company"
                            }${selectedProfile === profileType ? "Active" : ""}.svg`}
                            alt={profileType}
                          />
                          <h3
                            className={`${
                              selectedProfile !== profileType
                                ? "text-gray-300"
                                : "text-[#009EB4]"
                            } font-normal text-center mt-2`}
                          >
                            {profileType === "buyer" ? "Buyer" : "Vendor"}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-[#009EB4] bg-[#F6FEFF] p-2 flex gap-1 items-center rounded-[10px] text-xs my-6">
                <img
                  className="w-6 h-6"
                  src="resourcesApp/iconsApp/infoActive.svg"
                  alt="information"
                />
                <p>You can add your company details from your profile</p>
              </div>

              <div className="flex">
                <button
                  className={`pri-btn text-center ${
                    !selectedProfile ? "cursor-not-allowed opacity-80" : "cursor-pointer"
                  }`}
                  onClick={() => navigate("/User-App/Profile-Selection")}
                  disabled={!selectedProfile}
                >
                  Continue
                </button>
              </div>
              <div className="flex justify-between items-center my-4">
                <hr className="text-[#e5e5e5] w-1/3" />
                <span>Or</span>
                <hr className="text-[#e5e5e5] w-1/3" />
              </div>
              <div className="flex space-x-4">
                <button className="sec-btn">Continue as Guest</button>
              </div>
            </div>
          </div>
        );
      case "Welcome":
        return <AppWelcome setCurrentScreen={setCurrentScreen} />;
      default:
        return null;
    }
  };

  return <>{renderScreen()}</>;
};

export default AppSplash;