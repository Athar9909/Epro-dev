import React, { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "info@techgropse.com",
    about: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    countryCode: "+966",
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Progress Steps */}
      <div className="w-full px-4 py-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 md:mb-8">
            Company Sign Up Process
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: "#009EB4" }}>
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">
                Step 01
              </span>
            </div>

            <div className="flex-1 h-px bg-gray-300 mx-4"></div>

            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: "#009EB4" }}>
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">
                Step 02
              </span>
            </div>

            <div className="flex-1 h-px bg-gray-300 mx-4"></div>

            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: "#009EB4" }}>
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">
                Step 03
              </span>
            </div>

            <div className="flex-1 h-px bg-gray-300 mx-4"></div>

            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: "#009EB4" }}>
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">
                Step 04
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
    </div>
  );
}
