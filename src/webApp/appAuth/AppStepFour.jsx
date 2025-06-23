import { useForm } from "react-hook-form";
import React, { useState, useEffect, useCallback } from "react";
import { Camera, Eye, EyeClosed, Check, Upload, ChevronDown } from "lucide-react";
import { countryCodes } from "../../webDesk/Auth/CountryCodes";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../Redux-config/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { setRegisterData } from "../../Redux-config/slices/miscSlice";

const AppStepFour = ({ setCurrentStep, userIdType = "Company" }) => {
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [tradeLicenseFile, setTradeLicenseFile] = useState(null);
  const registerData = useSelector((state) => state.misc.registerData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+966');
  const [selectedCompanyCountryCode, setSelectedCompanyCountryCode] = useState('+966');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countryCodes);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [uploadOption, setUploadOption] = useState('now');
  const [customerDetailsOption, setCustomerDetailsOption] = useState('now');
  const [selectedIndustry, setSelectedIndustry] = useState("Select your industry");
  const [selectedType, setSelectedType] = useState("Select your type");
  const [selectedCompanySize, setSelectedCompanySize] = useState("Select your company size");
  const [customers, setCustomers] = useState([{ name: '' }]);
  const [projects, setProjects] = useState([{
    name: '',
    description: '',
    completionDate: '',
    file: null
  }]);

  const [isOpen, setIsOpen] = useState({
    "industry": false,
    "type": false,
    "companySize": false
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const steps = [
    { id: 1, title: "STEP 01", label: "Company-Details" },
    { id: 2, title: "STEP 02", label: "Additional-Details" },
    { id: 3, title: "STEP 03", label: "Documents-Details" }
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
    getValues
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // Buyer & Company fields
      firstName: "",
      lastName: "",
      email: registerData?.email || "",
      password: "",
      confirmPassword: "",
      about: "",
      phoneNumber: registerData?.phone || "",
      countryCode: registerData?.countryCode || "",
      // Company required fields
      companyName: "",
      companyTagline: "",
      companyEmail: "",
      companyCountryCode: '',
      companyPhone: '',
      foundingDate: "",
      address: "",
      city: "",
      country: "",
      zipCode: "",
      iktvaMembers: "",
      websiteLink: "",
      cr: "",
      compDescription: "",
      projectName: "",
      projectDescription: "",
      completionDate: "",
      customerProjectName: "",
    },
  });
  // console.log(formState)
  const password = watch("password");

  // Memoized Functions
  const saveFormData = useCallback(() => {
    const currentData = getValues();
    dispatch(setRegisterData({ ...registerData, ...currentData }));
  }, [dispatch, getValues, registerData]);

  // Add New Projects
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleProjectFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedProjects = [...projects];
      updatedProjects[index].file = file;
      setProjects(updatedProjects);
    }
  };

  const addProject = () => {
    setProjects([...projects, {
      name: '',
      description: '',
      completionDate: '',
      file: null
    }]);
  };

  // Add new Customers

  const addCustomer = () => {
    setCustomers([...customers, { name: '' }]);
  };

  const handleCustomerChange = (index, value) => {
    const updatedCustomers = [...customers];
    updatedCustomers[index].name = value;
    setCustomers(updatedCustomers);
  };

  function base64ToFile(base64, filename) {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  useEffect(() => {
    if (registerData?.countryCode) {
      setValue('countryCode', registerData.countryCode);
      setSelectedCountryCode(registerData.countryCode);
    }
    else {
      setValue('countryCode', selectedCountryCode)
      setValue('companyCountryCode', selectedCompanyCountryCode)
    }
  }, [registerData, setValue]);

  // const onSubmit = async (data) => {
  //   console.log(data);

  //   // Handle multi-step progression for company registration
  //   if (registerData?.userIdType === "Company" && step < 3) {
  //     setStep(prev => prev + 1);
  //     return;
  //   }

  //   const formData = new FormData();
  //   const allData = { ...registerData, ...data };

  //   // Base fields for all users
  //   const baseFields = [
  //     "firstName",
  //     "lastName",
  //     "email",
  //     "password",
  //     "about",
  //     "phoneNumber",
  //     "countryCode",
  //     "accountType",
  //   ];

  //   // Company-specific fields
  //   const companyFields = [
  //     "compName",
  //     "compTagline",
  //     "compEmail",
  //     "compFoundingDate",
  //     "compAddress",
  //     "compCity",
  //     "compCountry",
  //     "compZipCode",
  //     "type",
  //     "compMembershipNo",
  //     "compSize",
  //     "compIndustry",
  //     "compLink",
  //     "compCR",
  //   ];

  //   // Append accountType from registerData
  //   if (registerData?.userIdType) {
  //     formData.append("accountType", registerData.userIdType);
  //   }

  //   // Append all base fields
  //   baseFields.forEach(field => {
  //     if (allData[field] !== undefined) {
  //       formData.append(field, allData[field]);
  //     }
  //   });

  //   // Handle profile image
  //   if (image) {
  //     const profileImageFile = base64ToFile(image, "profile.png");
  //     formData.append("profileImage", profileImageFile);
  //   }

  //   // Company-specific data handling
  //   if (registerData?.userIdType === "Company") {
  //     // Append all company fields
  //     companyFields.forEach(field => {
  //       console.log("field:", field)
  //       if (allData[field] !== undefined) {
  //         // Handle special cases for dropdown values
  //         if (field === "compName") {
  //           formData.append("compName", allData?.companyName);
  //         }
  //         else if (field === "compEmail") {
  //           formData.append("compEmail", allData?.companyEmail);
  //         }
  //         else if (field === "type") {
  //           formData.append("type", selectedType);
  //         }
  //         else if (field === "compIndustry") {
  //           formData.append("compIndustry", selectedIndustry);
  //         }
  //         else if (field === "compSize") {
  //           formData.append("compSize", selectedCompanySize);
  //         }
  //         else if (field === "compZipCode") {
  //           formData.append("compZipCode", allData?.zipCode)
  //         }
  //         else if (field === "compMembershipNo") {
  //           formData.append("compMembershipNo", allData?.iktvaMembers)
  //         }
  //         else if (field === "compCR") {
  //           formData.append("compCR", allData?.cr)
  //         }
  //         else if (field === "compLink") {
  //           formData.append("compLink", allData?.websiteLink)
  //         }
  //         else if (field === "compAddress") {
  //           formData.append("compAddress", allData?.address)
  //         }
  //         else if (field === "compCountry") {
  //           formData.append("compCountry", allData?.country)
  //         }
  //         else if (field === "compCity") {
  //           formData.append("compCity", allData?.city)
  //         }
  //         else if (field === "compFoundingDate") {
  //           formData.append("compFoundingDate", allData?.foundingDate)
  //         }
  //         else if (field === "compTagline") {
  //           formData.append("compTagline", allData?.companyTagline)
  //         }
  //         else {
  //           formData.append(field, allData[field]);
  //         }
  //       }
  //     });

  //     // Handle trade license
  //     if (allData.tradeLicense?.[0]) {
  //       formData.append("comptradelicense", allData.tradeLicense[0]);
  //     }

  //     // Handle projects data if uploading now
  //     if (uploadOption === 'now' && projects.length > 0) {
  //       const projectData = projects.map((project, index) => ({
  //         projectName: project.name,
  //         projectDescription: project.description,
  //         projectDate: project.completionDate,
  //         projectFile: project.file ? `projectFile_${index}` : null
  //       }));

  //       formData.append("compProject", JSON.stringify(projectData));

  //       projects.forEach((project, index) => {
  //         if (project.file) {
  //           formData.append(`projectFile_${index}`, project.file);
  //         }
  //       });
  //     }

  //     // Handle customers data if uploading now
  //     if (customerDetailsOption === 'now' && customers.length > 0) {
  //       const customerData = customers.map(customer => ({
  //         custName: customer.name
  //       }));
  //       formData.append("compCustomers", JSON.stringify(customerData));
  //     }
  //   }

  //   console.log("Sending FormData", formData);
  //   console.log("All FormData", allData);
  //   try {
  //     const response = await dispatch(signupUser(formData)).unwrap();
  //     if (!response.error) {
  //       // navigate("/User-App/Login");
  //       setCurrentStep(prev => prev + 1)
  //     }
  //   } catch (error) {
  //     console.error("Registration error:", error);
  //   }
  // };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Dynamic Phone Input functions 
  const countryToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setSearchTerm('');
      setFilteredCountries(countryCodes);
    }
  };

  const selectCountryCode = (code) => {
    console.log(code)
    setSelectedCountryCode(code);
    setValue('countryCode', code, { shouldValidate: true });
    setValue('companyCountryCode', code, { shouldValidate: true });
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setFilteredCountries(
      countryCodes.filter(country =>
        country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        country.dial_code.includes(searchValue)
      ));
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const StepIndicator = ({ steps, currentStep }) => (
    <div className="flex justify-center my-4 items-center gap-4 flex-wrap ">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-row items-center gap-2">
            <div
              className={`w-6 h-6 relative top-[3px] rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${step.id === currentStep
                ? "bg-[#F4C63B] text-white shadow-lg scale-110"
                : step.id < currentStep
                  ? "bg-[#F4C63B] text-white"
                  : "bg-gray-200 text-gray-500"
                }`}
            >
              {step.id < currentStep ? <Check size={16} /> : step.id}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`h-[2px] flex-1 w-10 max-w-[80px] bg-[#F4C63B]`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const toggleDropdown = (dropdownName) => {
    setIsOpen(prev => ({
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === dropdownName ? !prev[key] : false;
        return acc;
      }, {})
    }));
  };
  // Trade Document Upload
  // Handle trade license file upload
  const handleTradeLicenseChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTradeLicenseFile(file);
    }
  };

  const renderScreenView = () => {
    switch (step) {
      case 1:
        return (
          <div className="bg-white p-4 rounded-[10px]">
            {/* Profile Photo Upload */}
            <div className="mb-8">
              <label className="block text-gray-700 text-[20px] font-bold text-center">
                Create Profile
              </label>
              <p className="text-[12px] text-gray-600 my-1 text-center">
                Create a new account & start exploring
              </p>
              {
                userIdType == "Company" && <StepIndicator steps={steps} currentStep={step} />
              }
              {/* Profile Picture */}
              <div className="flex items-center justify-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white bg-[#009EB41A]">
                  {uploading ? (
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
                    </div>
                  ) : image ? (
                    <img
                      src={image}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <Camera className="text-[#009EB4]" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex gap-1">
                <InputField
                  label="First Name"
                  error={errors.firstName}
                  register={register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters"
                    },
                    maxLength: {
                      value: 30,
                      message: "Maximum 30 characters"
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Only alphabets allowed"
                    }
                  })}
                />
                <InputField
                  label="Last Name"
                  error={errors.lastName}
                  register={register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Minimum 2 characters"
                    },
                    maxLength: {
                      value: 30,
                      message: "Maximum 30 characters"
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Only alphabets allowed"
                    }
                  })}
                />
              </div>

              <InputField
                type="email"
                label="Email Address"
                error={errors.email}
                disabled={!!registerData?.email}
                register={register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                showValid={!!registerData?.email && !errors.email}
              />

              {/* Phone Number */}
              {registerData?.phone && registerData?.countryCode ? (
                <>
                  <div>
                    <div className="flex gap-2 w-full">
                      <InputField
                        type="text"
                        label="Country Code"
                        disabled={!!registerData?.countryCode}
                        register={register("countryCode", {
                          required: "Country code is required"
                        })}
                        showValid={!!registerData?.countryCode && !errors.countryCode}
                      />
                      <InputField
                        type="tel"
                        name="phoneNumber"
                        label={"Phone Number"}
                        disabled={!!registerData?.phone}
                        error={errors.phoneNumber}
                        register={register("phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{7,14}$/,
                            message: "Invalid phone number",
                          },
                        })}
                        showValid={!!registerData?.phone && !errors.phoneNumber}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2 w-full relative">
                      <div className=" w-1/3">
                        <button
                          type="button"
                          onClick={countryToggleDropdown}
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none transition text-left flex items-center justify-between ${errors.countryCode ? "border-red-500 focus:ring-red-200 focus:ring-2" : "border-gray-300 focus:border-[#009EB4] focus:ring-[#009EB420] focus:ring-2"
                            }`}
                        >
                          <span>{selectedCountryCode}</span>
                          <svg
                            className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? "transform rotate-180" : ""
                              }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <input
                          type="hidden"
                          {...register("countryCode")}
                          value={selectedCountryCode}
                        />
                        {isDropdownOpen && (
                          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                            <div className="sticky top-0 bg-white p-2">
                              <input
                                type="text"
                                placeholder="Search country or code..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009EB420] focus:border-[#009EB4]"
                                value={searchTerm}
                                onChange={handleSearch}
                              />
                            </div>
                            <div className="max-h-52 overflow-y-auto">
                              {filteredCountries.length > 0 ? (
                                filteredCountries.map((country) => (
                                  <div
                                    key={country.code}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                    onClick={() => { setSelectedCountryCode(country.dial_code); console.log("country Code", selectCountryCode) }}
                                  >
                                    <span className="mr-2">{country.flag}</span>
                                    <span className="mr-2 font-medium">{country.dial_code}</span>
                                    <span className="text-sm text-gray-600">{country.name}</span>
                                  </div>
                                ))
                              ) : (
                                <div className="px-4 py-2 text-gray-500 text-center">No countries found</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <InputField
                        type="tel"
                        name="phoneNumber"
                        error={errors.phoneNumber}
                        register={register("phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{7,14}$/,
                            message: "Invalid phone number",
                          },
                        })}
                      />
                    </div>
                    {errors.countryCode && (
                      <p className="text-sm text-red-500">{errors.countryCode.message}</p>
                    )}
                  </div>
                </>
              )}

              {/* About */}
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  About You
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className={`w-full px-4 py-3 border border-gray-300 focus:border-[#009EB4] focus:ring-[#009EB420] rounded-md focus:ring-2 focus:outline-none`}
                  {...register("about")}
                />
                {errors.about && (
                  <span className="text-sm text-red-500">
                    {errors.about.message}
                  </span>
                )}
              </div>

              {/* password */}
              <div className="relative">
                <InputField
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  error={errors.password}
                  register={register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Must include uppercase, lowercase, number, and special character"
                    }
                  })}
                />
                <div className={`absolute right-3 top-1/2 transform  text-gray-400 ${errors?.password ? '-translate-y-1/2' : '-translate-y-1'}`}
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </div>
              </div>

              {/* Confirm password */}
              <div className="relative">
                <InputField
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  error={errors.confirmPassword}
                  register={register("confirmPassword", {
                    required: "Confirm your password",
                    validate: (val) =>
                      val === password || "Passwords do not match",
                  })}
                />
                <div className={`absolute right-3 top-1/2 transform  text-gray-400 ${errors?.confirmPassword ? '-translate-y-1/2' : '-translate-y-1'}`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  // checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 border-gray-300"
                  style={{ accentColor: "#009EB4" }}
                  {...register('agreeToTerms',
                    { required: "You must agree to the terms" })}
                />
                <label className="text-sm text-gray-700">
                  I agree to the Terms of Service & Privacy Policy
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-500">You must agree to the terms</p>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`flex-1 px-6 py-3 text-white rounded-md font-medium hover:opacity-90 transition-opacity ${!isValid ? "bg-gray-400 cursor-not-allowed" : "bg-[#009EB4]"}`}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <>
            <div className="space-y-6 bg-white p-4 rounded-[10px]">
              <div className="mb-8">
                <label className="block text-gray-700 text-[20px] font-bold text-center">
                  Company Information
                </label>
                <p className="text-[12px] text-gray-600 my-1 text-center">
                  Please provide your company details
                </p>
              </div>

              {/* Indicator */}
              <StepIndicator steps={steps} currentStep={step} />

              {/* Company Logo */}
              <div className="flex items-center justify-center">
                <div className="relative w-30 h-30 rounded-full overflow-hidden border-2 border-white bg-[#009EB41A]">
                  {uploading ? (
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
                    </div>
                  ) : image ? (
                    <img
                      src={image}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <Camera className="text-[#009EB4]" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Company Name */}
                <InputField
                  label="Company Name"
                  error={errors.companyName}
                  register={register("companyName", {
                    required: "Company name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters"
                    },
                    maxLength: {
                      value: 50,
                      message: "Maximum 50 characters"
                    }
                  })}
                />

                {/* Company Tagline */}
                <InputField
                  label="Company Tagline"
                  error={errors.companyTagline}
                  register={register("companyTagline", {
                    required: "Company tagline is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters"
                    },
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters"
                    }
                  })}
                />

                {/* Company Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <div className="flex gap-2 w-full relative">
                    <div className=" w-1/3">
                      <button
                        type="button"
                        onClick={countryToggleDropdown}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none transition text-left flex items-center justify-between ${errors.companyCountryCode ? "border-red-500 focus:ring-red-200 focus:ring-2" : "border-gray-300 focus:border-[#009EB4] focus:ring-[#009EB420] focus:ring-2"
                          }`}
                      >
                        <span>{selectedCompanyCountryCode}</span>
                        <svg
                          className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? "transform rotate-180" : ""
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <input
                        type="hidden"
                        {...register("companyCountryCode")}
                        value={selectedCompanyCountryCode}
                      />
                      {isDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                          <div className="sticky top-0 bg-white p-2">
                            <input
                              type="text"
                              placeholder="Search country or code..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009EB420] focus:border-[#009EB4]"
                              value={searchTerm}
                              onChange={handleSearch}
                            />
                          </div>
                          <div className="max-h-52 overflow-y-auto">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country) => (
                                <div
                                  key={country.code}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                  onClick={() => { setSelectedCompanyCountryCode(country.dial_code); console.log(selectedCompanyCountryCode) }}
                                >
                                  <span className="mr-2">{country.flag}</span>
                                  <span className="mr-2 font-medium">{country.dial_code}</span>
                                  <span className="text-sm text-gray-600">{country.name}</span>
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-gray-500 text-center">No countries found</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <InputField
                      type="tel"
                      name="companyPhone"
                      error={errors.companyPhone}
                      register={register("companyPhone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{7,14}$/,
                          message: "Invalid phone number",
                        },
                      })}
                    />
                  </div>
                  {errors.countryCode && (
                    <p className="text-sm text-red-500">{errors.countryCode.message}</p>
                  )}
                </div>

                {/* Email Address */}
                <InputField
                  type="email"
                  label="Email Address (Optional)"
                  error={errors.email}
                  register={register("companyEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />

                {/* Founding Date */}
                <InputField
                  type="date"
                  label="Founding Date"
                  error={errors.foundingDate}
                  register={register("foundingDate", {
                    required: "Founding date is required",
                    valueAsDate: true
                  })}
                />

                {/* Address */}
                <InputField
                  label="Address"
                  error={errors.address}
                  register={register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters"
                    },
                    maxLength: {
                      value: 80,
                      message: "Maximum 80 characters"
                    }
                  })}
                />

                {/* City */}
                <InputField
                  label="City"
                  error={errors.city}
                  register={register("city", {
                    required: "City is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters"
                    },
                    maxLength: {
                      value: 30,
                      message: "Maximum 30 characters"
                    }
                  })}
                />

                {/* Country */}
                <InputField
                  label="Country"
                  error={errors.country}
                  register={register("country", {
                    required: "Country name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters"
                    },
                    maxLength: {
                      value: 30,
                      message: "Maximum 30 characters"
                    }
                  })}
                />

                {/* Zip Code */}
                <InputField
                  label="Zip Code"
                  error={errors.zipCode}
                  register={register("zipCode", {
                    required: "Zip Code is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters"
                    },
                    maxLength: {
                      value: 30,
                      message: "Maximum 30 characters"
                    }
                  })}
                />

                {/* Type */}
                <div className="relative w-full my-4">
                  <label className="block text-sm font-semibold text-[#272727] mb-1">
                    Type
                  </label>
                  {/* Dropdown button */}
                  <button
                    type="button"
                    onClick={() => toggleDropdown('type')}
                    className="w-full px-4 py-3 border rounded-[10px] focus:outline-none focus:border-[#009EB4] border-[#e5e5e5] text-start"
                  >
                    {selectedType}
                    <span className={`float-right transform ${isOpen.type ? 'rotate-180' : ''}`}>
                      <ChevronDown />
                    </span>
                  </button>

                  {/* Dropdown menu */}
                  {isOpen?.type && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg text-start">
                      {["Product", "Service", "Rental Service"].map((type, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedType(type);
                            setIsOpen(prev => ({ ...prev, type: false }));
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* IKTVA Members */}
                <InputField
                  label="IKTVA Member"
                  error={errors.iktvaMembers}
                  register={register("iktvaMembers", {
                    required: "IKTVA Members is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters"
                    },
                    maxLength: {
                      value: 30,
                      message: "Maximum 30 characters"
                    }
                  })}
                />

                {/* Company Size */}
                <div className="relative w-full my-4">
                  <label className="block text-sm font-semibold text-[#272727] mb-1">
                    Company Size
                  </label>
                  {/* Dropdown button */}
                  <button
                    type="button"
                    onClick={() => toggleDropdown('companySize')}
                    className="w-full px-4 py-3 border rounded-[10px] focus:outline-none focus:border-[#009EB4] border-[#e5e5e5] text-start"
                  >
                    {selectedCompanySize}
                    <span className={`float-right transform ${isOpen.type ? 'rotate-180' : ''}`}>
                      <ChevronDown />
                    </span>
                  </button>

                  {/* Dropdown menu */}
                  {isOpen?.companySize && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg text-start">
                      {["0-10", "100-500", "500-1000", "1000+"].map((size, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedCompanySize(size);
                            setIsOpen(prev => ({ ...prev, companySize: false }));
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Industry */}
                <div className="relative w-full my-4">
                  <label className="block text-sm font-semibold text-[#272727] mb-1">
                    Industry
                  </label>
                  {/* Dropdown button */}
                  <button
                    type="button"
                    onClick={() => toggleDropdown('industry')}
                    className="w-full px-4 py-3 border rounded-[10px] focus:outline-none focus:border-[#009EB4] border-[#e5e5e5] text-start"
                  >
                    {selectedIndustry}
                    <span className={`float-right transform ${isOpen.industry ? 'rotate-180' : ''}`}>
                      <ChevronDown />
                    </span>
                  </button>

                  {/* Dropdown menu */}
                  {isOpen?.industry && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg text-start">
                      {["Automobile", "Pharmacy", "Food-Grocery", "Chemical", "Physical", "Real-Estate"].map((type, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedIndustry(type);
                            setIsOpen(prev => ({ ...prev, industry: false }));
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Website Link */}
                <InputField
                  label="Website Link"
                  error={errors.websiteLink}
                  register={register("websiteLink", {
                    required: "Website Link is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters"
                    },
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters"
                    },
                    pattern: {
                      value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                      message: "Invalid website URL"
                    }
                  })}
                />

                {/* CR */}
                <InputField
                  label="CR Number"
                  error={errors.cr}
                  register={register("cr", {
                    required: "CR Number is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters"
                    },
                    maxLength: {
                      value: 30,
                      message: "Maximum 30 characters"
                    }
                  })}
                />

                {/* About */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Company
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your company..."
                    className={`w-full px-4 py-3 border ${errors.compDescription ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("compDescription", {
                      required: "About section is required",
                      minLength: {
                        value: 10,
                        message: "Minimum 10 characters",
                      },
                    })}
                  />
                  {errors.about && (
                    <span className="text-sm text-red-500">
                      {errors.compDescription.message}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#009EB4] text-white py-3 rounded-md font-medium hover:bg-[#007a8c] transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="space-y-6 max-w-5xl mx-auto p-4 rounded-[16px] bg-white">
              <div className="flex items-center justify-center flex-col">
                <label className="block text-gray-700 text-[20px] font-bold text-center">
                  Additional Information
                </label>
                <p className="text-[12px] text-gray-600 my-1 text-center">
                  Provide more details about your projects
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <p className="text-[#272727] mb-4">Would you like to upload your projects?</p>
                  <div className="flex gap-4 mb-6">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="radio"
                          value="now"
                          checked={uploadOption === 'now'}
                          onChange={(e) => setUploadOption(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 ${uploadOption === 'now' ? 'border-[#009eb4] bg-[#009eb4]' : 'border-[#e5e5e5]'
                          } flex items-center justify-center`}>
                          {uploadOption === 'now' && <Check size={12} className="text-white" />}
                        </div>
                      </div>
                      <span className="ml-2 text-[#272727]">Yes, Upload Now</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="radio"
                          value="later"
                          checked={uploadOption === 'later'}
                          onChange={(e) => setUploadOption(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 ${uploadOption === 'later' ? 'border-[#009eb4] bg-[#009eb4]' : 'border-[#e5e5e5]'
                          } flex items-center justify-center`}>
                          {uploadOption === 'later' && <Check size={12} className="text-white" />}
                        </div>
                      </div>
                      <span className="ml-2 text-[#272727]">No, Upload later</span>
                    </label>
                  </div>
                </div>

                {uploadOption === 'now' && (
                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <div key={index} className="space-y-4 border-b border-[#e5e5e5] pb-4">
                        <h4 className="text-sm font-semibold text-gray-700">Project {index + 1}</h4>

                        {/* Project Name */}
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Project Name
                        </label>
                        <input
                          value={project.name}
                          onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                          className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                          required
                        />

                        {/* Project Description */}
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Project Description
                        </label>
                        <textarea
                          value={project.description}
                          onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                          rows="3"
                          className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none resize-none"
                          required
                        />

                        {/* Completion Date */}
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Completion Date
                        </label>
                        <input
                          value={project.completionDate}
                          onChange={(e) => handleProjectChange(index, 'completionDate', e.target.value)}
                          type="date"
                          className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                          required
                        />

                        {/* File Upload */}
                        <div className="border border-[#e5e5e5] rounded-[10px] p-4 bg-[#FFF9E6]">
                          <div className="flex items-center">
                            <Upload className="text-[#F4C63B] mr-3" size={20} />
                            <div>
                              <p className="font-medium text-[#272727]">Upload file</p>
                              <p className="text-sm text-[#A8A8A8]">Select and upload a PNG image.</p>
                              <input
                                type="file"
                                accept="image/png"
                                onChange={(e) => handleProjectFileChange(index, e)}
                                className="mt-2"
                              />
                              {project.file && (
                                <p className="text-sm text-green-600 mt-1">
                                  {project.file.name} selected
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addProject}
                      className="text-[#009eb4] font-medium flex items-center"
                    >
                      <span className="mr-2">+</span> Add More Projects
                    </button>
                  </div>
                )}

                <div>
                  <p className="text-[#272727] mb-4">Would you like to upload customer Details?</p>
                  {/* Radio Buttons */}
                  <div className="flex gap-4 mb-6">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="radio"
                          value="now"
                          checked={customerDetailsOption === 'now'}
                          onChange={(e) => setCustomerDetailsOption(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 ${customerDetailsOption === 'now' ? 'border-[#009eb4] bg-[#009eb4]' : 'border-[#e5e5e5]'
                          } flex items-center justify-center`}>
                          {customerDetailsOption === 'now' && <Check size={12} className="text-white" />}
                        </div>
                      </div>
                      <span className="ml-2 text-[#272727]">Yes, Upload Now</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="radio"
                          value="later"
                          checked={customerDetailsOption === 'later'}
                          onChange={(e) => setCustomerDetailsOption(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 ${customerDetailsOption === 'later' ? 'border-[#009eb4] bg-[#009eb4]' : 'border-[#e5e5e5]'
                          } flex items-center justify-center`}>
                          {customerDetailsOption === 'later' && <Check size={12} className="text-white" />}
                        </div>
                      </div>
                      <span className="ml-2 text-[#272727]">No, Upload later</span>
                    </label>
                  </div>
                </div>

                {customerDetailsOption === 'now' && (
                  <div className="space-y-4">
                    {customers.map((customer, index) => (
                      <div key={index} className="space-y-4 border-b border-[#e5e5e5] pb-4">
                        <h4 className="text-sm font-semibold text-gray-700">Customer {index + 1}</h4>

                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Customer Name
                        </label>
                        <input
                          value={customer.name}
                          onChange={(e) => handleCustomerChange(index, e.target.value)}
                          className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                          required
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addCustomer}
                      className="text-[#009eb4] font-medium flex items-center"
                    >
                      <span className="mr-2">+</span> Add More Customers
                    </button>
                  </div>
                )}

                <div>
                  <p className="text-[#272727] mb-4">Trade License</p>
                  <div className="border border-[#e5e5e5] rounded-[10px] p-4 bg-[#FFF9E6]">
                    <div className="flex items-center">
                      <Upload className="text-[#F4C63B] mr-3" size={20} />
                      <div>
                        <p className="font-medium text-[#272727]">Upload file</p>
                        <p className="text-sm text-[#A8A8A8]">Select and upload a PNG image.</p>
                        <input
                          type="file"
                          accept="image/png"
                          onChange={handleTradeLicenseChange}
                          className="mt-2"
                        />
                        {tradeLicenseFile && (
                          <p className="text-sm text-green-600 mt-1">
                            {tradeLicenseFile.name} selected
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <input
                    {...register('agreeTerms', { required: 'You must agree to the terms' })}
                    type="checkbox"
                    className="w-5 h-5 text-[#F4C63B] border-[#e5e5e5] rounded focus:ring-[#009eb4]"
                  />
                  <label className="ml-2 text-[#272727]">
                    I agree to the <span className="text-[#009eb4]">Terms</span> & <span className="text-[#009eb4]">Privacy Policy</span>
                  </label>
                </div>
                {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms.message}</p>}

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-white border border-[#e5e5e5] text-[#272727] py-3 rounded-[10px] font-medium hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#009eb4] text-white py-3 rounded-[10px] font-medium hover:bg-[#007a8c] transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <React.Fragment>
      {renderScreenView()}
    </React.Fragment>
  );
};

// Reusable Input Field
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  error,
  register,
  showValid = false,
  disabled = false,
}) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
        {register?.required && <span className="text-red-500">*</span>}
      </label>
    )}
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${error ? "border-red-500 focus:ring-red-200"
          : showValid && !error ? "border-green-500 focus:ring-green-200"
            : "border-gray-300 focus:border-[#009EB4] focus:ring-[#009EB420]"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        {...register}
        onClick={(e) => {
          e.target.showPicker();
        }}
      />
      {showValid && !error && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
          ✓
        </div>
      )}
    </div>
    {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
  </div>
);

export default React.memo(AppStepFour);