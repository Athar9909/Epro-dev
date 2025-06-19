import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "../../Redux-config/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CountryCodeDrop from "../common/countryCodeDrop";
import { motion, AnimatePresence } from "framer-motion";
import { setRegisterData } from "../../Redux-config/slices/miscSlice";
import {
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  MapPin,
  Building,
  Tag,
  Globe,
  FileText,
  Plus,
  Trash2,
  Check,
  ChevronDown,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import ProjectSection from "../common/ProjectSection";
import CustomerSection from "../common/CustomerSection";

// Constants
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const DEFAULT_COUNTRY_CODE = "+966";

const StepFour = ({ setCurrentStep }) => {
  // Hooks and State
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [companyStep, setCompanyStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redux Selectors
  const registerData = useSelector((state) => state.misc.registerData);
  const { loading } = useSelector((state) => state.auth);

  // Form Initialization
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
    control,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      ...registerData,
      email: registerData?.email || "",
      phoneNumber: registerData?.phone?.length > 2 ? registerData?.phone : "",
      countryCode: registerData?.countryCode || DEFAULT_COUNTRY_CODE,
      password: "",
      confirmPassword: "",
      uploadProjects: "yes",
      uploadCustomers: "yes",
      projects: [
        {
          projectName: "",
          completionDate: "",
          projectDescription: "",
          projectFile: null,
        },
      ],
      customers: [{ customerName: "", customerFile: null }],
      tradeLicense: null,
    },
  });
  console.log(errors);

  const [formData, setFormData] = useState({
    projects: [
      {
        projectName: "",
        completionDate: "",
        projectDescription: "",
        projectFile: null,
      },
    ],
    customers: [
      {
        customerName: "",
        customerFile: null,
      },
    ],
    tradeLicense: null,
  });

  // Watched Values
  const password = watch("password");

  // Memoized Functions
  const saveFormData = useCallback(() => {
    const currentData = getValues();
    dispatch(setRegisterData({ ...registerData, ...currentData }));
  }, [dispatch, getValues, registerData]);

  const validateImage = useCallback(() => {
    if (companyStep === 1) {
      if (!image) {
        setError("profilePhoto", {
          type: "manual",
          message: "Profile photo is required",
        });
        return false;
      }
    } else {
      if (!image2) {
        setError("compLogo", {
          type: "manual",
          message: "Company logo is required",
        });
        return false;
      }
    }

    clearErrors("profilePhoto");
    clearErrors("compLogo");
    return true;
  }, [image, image2, setError, clearErrors]);

  const handleCompanyStep = useCallback(
    (direction) => {
      saveFormData();
      setCompanyStep((prev) => (direction === "next" ? prev + 1 : prev - 1));
    },
    [saveFormData]
  );

  // Image Handlers
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("profilePhoto", {
        type: "manual",
        message: "Only JPEG/PNG images allowed",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("profilePhoto", {
        type: "manual",
        message: "File must be less than 2MB",
      });
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setUploading(false);
      clearErrors("profilePhoto");
    };
    reader.onerror = () => {
      setUploading(false);
      setError("profilePhoto", {
        type: "manual",
        message: "Error uploading image",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("compLogo", {
        type: "manual",
        message: "Only JPEG/PNG images allowed",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("compLogo", {
        type: "manual",
        message: "File must be less than 2MB",
      });
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setImage2(reader.result);
      setUploading(false);
      clearErrors("compLogo");
    };
    reader.onerror = () => {
      setUploading(false);
      setError("compLogo", {
        type: "manual",
        message: "Error uploading image",
      });
    };
    reader.readAsDataURL(file);
  };

  function base64ToFile(base64, filename) {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const onSubmit = async (data) => {
    if (!agreeToTerms) {
      toast.error("You must agree to the terms");
      return;
    }
    console.log("clicke");

    if (!validateImage()) return;

    if (registerData?.userIdType === "company" && companyStep < 3) {
      handleCompanyStep("next");
      return;
    }

    const formData = new FormData();
    const allData = { ...registerData, ...data };

    const commonFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "about",
      "phoneNumber",
      "countryCode",
      "accountType",
      "companyName",
      "tagline",
      "companyEmail",
      "foundingDate",
      "companyAddress",
      "city",
      "country",
      "zip",
      "companyType",
      "iktva",
      "companySize",
      "industry",
      "website",
      "crNumber",
    ];

    commonFields.forEach((field) => {
      if (allData[field]) formData.append(field, allData[field]);
    });
    const profileImageFile = base64ToFile(image, "profile.png");
    const bussinessImageFile = base64ToFile(image2, "business.png");

    formData.append(
      "compProject",
      JSON.stringify(registerData?.projects?.length && registerData?.projects)
    );
    formData.append(
      "compCustomers",
      JSON.stringify(registerData?.customers?.length && registerData?.customers)
    );

    formData.append("profileImage", profileImageFile);
    formData.append("compLogo", bussinessImageFile);
    if (allData.tradeLicense?.[0]) {
      formData.append("tradeLicense", allData.tradeLicense[0]);
    }

    try {
      const response = await dispatch(signupUser(formData)).unwrap();
      if (!response.error) {
        toast.success("Registration Successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed");
    }
  };

  // Render Functions
  const renderCompanyStep = useMemo(() => {
    const commonProps = {
      key: `step-${companyStep}`,
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { duration: 0.3 },
    };

    switch (companyStep) {
      case 1:
        return (
          <motion.div {...commonProps}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className={`w-full px-4 py-2.5 pl-10 border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("firstName", {
                      required: "First name is required",
                      validate: (value) => !!value?.trim() || "Cannot be blank",
                      minLength: { value: 2, message: "Minimum 2 characters" },
                      maxLength: {
                        value: 50,
                        message: "Maximum 50 characters",
                      },
                    })}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className={`w-full px-4 py-2.5 pl-10 border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("lastName", {
                      required: "Last name is required",
                      validate: (value) => !!value?.trim() || "Cannot be blank",
                      minLength: { value: 2, message: "Minimum 2 characters" },
                      maxLength: {
                        value: 50,
                        message: "Maximum 50 characters",
                      },
                    })}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    disabled={!!registerData?.email}
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {!errors.email && watch("email") && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
                      <Check size={18} />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="w-1/4">
                    <CountryCodeDrop
                      selectedCode={watch("countryCode")}
                      onSelect={(code) => setValue("countryCode", code)}
                      register={register("countryCode", {
                        required: "Country code is required",
                      })}
                      error={errors.countryCode}
                    />
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Phone size={20} />
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter your number"
                      disabled={!!registerData?.phone}
                      className={`w-full px-4 py-2.5 pl-10 border ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                      {...register("phoneNumber", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{7,14}$/,
                          message: "Invalid phone number",
                        },
                      })}
                    />
                  </div>
                </div>
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* About */}
              <div className="col-span-2 space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  About
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className={`w-full px-4 py-3 border ${
                    errors.about ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                  {...register("about", {
                    required: "About section is required",
                    validate: (value) => !!value?.trim() || "Cannot be blank",
                    minLength: { value: 10, message: "Minimum 10 characters" },
                    maxLength: {
                      value: 500,
                      message: "Maximum 500 characters",
                    },
                  })}
                />
                {errors.about && (
                  <p className="text-sm text-red-500">{errors.about.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 characters"
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "Minimum 8 characters" },
                      validate: {
                        hasNumber: (value) =>
                          /\d/.test(value) || "Needs a number",
                        hasLetter: (value) =>
                          /[a-zA-Z]/.test(value) || "Needs a letter",
                        noSpaces: (value) =>
                          !/\s/.test(value) || "No spaces allowed",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("confirmPassword", {
                      required: "Confirm your password",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 mt-4">
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={agreeToTerms}
                onChange={(e) => {
                  setAgreeToTerms(e.target.checked);
                  clearErrors("terms");
                }}
                className="mt-1 w-4 h-4 border-gray-300"
                style={{ accentColor: "#009EB4" }}
              />
              <label htmlFor="termsCheckbox" className="text-sm text-gray-700">
                I agree to the Terms of Service & Privacy Policy
              </label>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div {...commonProps}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Company Name */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Company Name
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Building size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    className={`w-full px-4 py-2.5 pl-10 border ${
                      errors.companyName ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("companyName", {
                      required: "Company name is required",
                      validate: (v) => !!v.trim() || "Cannot be blank",
                      minLength: { value: 2, message: "Minimum 2 characters" },
                      maxLength: {
                        value: 100,
                        message: "Maximum 100 characters",
                      },
                    })}
                  />
                </div>
                {errors.companyName && (
                  <p className="text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              {/* Company Tagline */}
              <div className="col-span-1 md:col-span-2 space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Company Tagline
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Tag size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Brief tagline"
                    className={`w-full px-4 py-2.5 pl-10 border ${
                      errors.tagline ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("tagline", {
                      maxLength: { value: 150, message: "Max 150 characters" },
                    })}
                  />
                </div>
                {errors.tagline && (
                  <p className="text-sm text-red-500">
                    {errors.tagline.message}
                  </p>
                )}
              </div>

              {/* Phone & Email */}
              <div className="col-span-1 md:col-span-3 space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number & Email
                </label>
                <div className="flex gap-5">
                  <div className="flex-1">
                    <CountryCodeDrop
                      selectedCode={watch("countryCode")}
                      onSelect={(c) => setValue("countryCode", c)}
                      register={register("countryCode", {
                        required: "Code is required",
                      })}
                      error={errors.countryCode}
                    />
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Phone size={20} />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className={`w-full px-4 py-2.5 pl-10 border ${
                        errors.companyPhone
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                      {...register("companyPhone", {
                        required: "Phone required",
                        pattern: {
                          value: /^[0-9]{7,14}$/,
                          message: "Invalid phone",
                        },
                      })}
                    />
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      placeholder="Email address"
                      className={`w-full px-4 py-2.5 pl-10 border ${
                        errors.companyEmail
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                      {...register("companyEmail", {
                        required: "Email required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email",
                        },
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MapPin size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Eg. Palm Jumeirah"
                    className={`w-full px-4 py-2.5 pl-10 border ${
                      errors.companyAddress
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("companyAddress", {
                      required: "Location is required",
                    })}
                  />
                </div>
                {errors.companyAddress && (
                  <p className="text-sm text-red-500">
                    {errors.companyAddress.message}
                  </p>
                )}
              </div>

              {/* Founding Date */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Founding Date
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Calendar size={20} />
                  </div>
                  <input
                    type="date"
                    className={`w-full px-4 py-2.5 pl-10 border ${
                      errors.foundingDate ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("foundingDate", {
                      required: "Founding date is required",
                    })}
                  />
                </div>
                {errors.foundingDate && (
                  <p className="text-sm text-red-500">
                    {errors.foundingDate.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  City
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MapPin size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter city"
                    className={`w-full px-4 py-2.5 pl-10 border ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("city", {
                      required: "City is required",
                    })}
                  />
                </div>
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Country
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Globe size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter country"
                    className={`w-full px-4 py-2.5 pl-10 border ${
                      errors.country ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("country", {
                      required: "Country is required",
                    })}
                  />
                </div>
                {errors.country && (
                  <p className="text-sm text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Zip Code */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Zip Code
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FileText size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter ZIP code"
                    className={`w-full px-4 py-2.5 pl-10 border ${
                      errors.zip ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("zip", {
                      required: "ZIP code is required",
                    })}
                  />
                </div>
                {errors.zip && (
                  <p className="text-sm text-red-500">{errors.zip.message}</p>
                )}
              </div>

              {/* Company Type */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  {...register("companyType", { required: "Type is required" })}
                  className={`w-full px-4 py-2.5 border ${
                    errors.companyType ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}>
                  <option value="">Select</option>
                  <option value="LLC">LLC</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Corporation">Corporation</option>
                </select>
                {errors.companyType && (
                  <p className="text-sm text-red-500">
                    {errors.companyType.message}
                  </p>
                )}
              </div>

              {/* IKTVA Number */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  IKTVA Number
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FileText size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter IKTVA #"
                    className={`w-full px-4 py-2.5 pl-10 border ${
                      errors.iktva ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("iktva", {
                      required: "IKTVA number is required",
                    })}
                  />
                </div>
                {errors.iktva && (
                  <p className="text-sm text-red-500">{errors.iktva.message}</p>
                )}
              </div>

              {/* Company Size */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Company Size
                </label>
                <select
                  {...register("companySize", { required: "Size is required" })}
                  className={`w-full px-4 py-2.5 border ${
                    errors.companySize ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}>
                  <option value="">Select</option>
                  <option value="1-10">1–10</option>
                  <option value="11-50">11–50</option>
                  <option value="51-200">51–200</option>
                  <option value="201+">201+</option>
                </select>
                {errors.companySize && (
                  <p className="text-sm text-red-500">
                    {errors.companySize.message}
                  </p>
                )}
              </div>

              {/* Industry */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Industry
                </label>
                <select
                  {...register("industry", {
                    required: "Industry is required",
                  })}
                  className={`w-full px-4 py-2.5 border ${
                    errors.industry ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}>
                  <option value="">Select</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
                {errors.industry && (
                  <p className="text-sm text-red-500">
                    {errors.industry.message}
                  </p>
                )}
              </div>

              {/* Website */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Website Link
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Globe size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    className={`w-full px-4 py-2.5 pl-10 border ${
                      errors.website ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("website", {
                      pattern: {
                        value:
                          /^(https?:\/\/)?([\w-]+)+\.[\w-]+(\/[\w-._~:?#[\]@!$&'()*+,;=]*)*$/,
                        message: "Invalid URL",
                      },
                    })}
                  />
                </div>
                {errors.website && (
                  <p className="text-sm text-red-500">
                    {errors.website.message}
                  </p>
                )}
              </div>

              {/* CR Number */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  CR Number
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FileText size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter CR number"
                    className={`w-full px-4 py-2.5 pl-10 border ${
                      errors.crNumber ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("crNumber", {
                      required: "CR number is required",
                    })}
                  />
                </div>
                {errors.crNumber && (
                  <p className="text-sm text-red-500">
                    {errors.crNumber.message}
                  </p>
                )}
              </div>

              {/* About Company */}
              <div className="col-span-1 md:col-span-3 space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  About Company
                </label>
                <textarea
                  rows={4}
                  className={`w-full px-4 py-3 border ${
                    errors.companyAbout ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                  placeholder="Enter details about your company"
                  {...register("companyAbout", {
                    required: "Company description is required",
                  })}
                />
                {errors.companyAbout && (
                  <p className="text-sm text-red-500">
                    {errors.companyAbout.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div {...commonProps}>
            <ProjectSection
              projectData={formData.projects}
              setProjectData={(data) => {
                dispatch(setRegisterData({ ...registerData, projects: data }));
                setFormData({ ...formData, projects: data });
              }}
            />
            <CustomerSection
              customerData={formData.customers}
              setCustomerData={(data) => {
                dispatch(setRegisterData({ ...registerData, customers: data }));
                setFormData({ ...formData, customers: data });
              }}
              tradeLicense={formData.tradeLicense}
              setTradeLicense={(file) => {
                setFormData({ ...formData, tradeLicense: file });
                dispatch(
                  setRegisterData({ ...registerData, tradeLicense: file })
                );
              }}
            />
          </motion.div>
        );
      default:
        return null;
    }
  }, [
    companyStep,
    errors,
    register,
    watch,
    setValue,
    agreeToTerms,
    password,
    registerData,
    formData,
    dispatch,
    showPassword,
    showConfirmPassword,
  ]);

  return (
    <div className="px-4 md:px-8 pb-8" key={errors}>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
          {companyStep > 1 ? (
            <div className="mb-8">
              <label className="block text-gray-700 text-lg font-medium mb-2">
                Business Logo
              </label>
              <motion.div
                className={`flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-dashed ${
                  errors.compLogo ? "border-red-500" : "border-gray-300"
                } px-4 py-4 rounded-lg bg-gray-50`}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white bg-white"
                    whileHover={{ scale: 1.05 }}>
                    {uploading ? (
                      <div className="flex items-center justify-center w-full h-full">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                      </div>
                    ) : image2 ? (
                      <img
                        src={image2}
                        alt="Profile preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept={ACCEPTED_IMAGE_TYPES.join(",")}
                      onChange={handleImageChange2}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-600">
                      PNG or JPG. Max 2MB. Recommended square ratio.
                    </p>
                    {errors.compLogo && (
                      <p className="text-sm text-red-500">
                        {errors.compLogo.message}
                      </p>
                    )}
                  </div>
                </div>
                <motion.button
                  type="button"
                  onClick={() =>
                    document.querySelector('input[type="file"]')?.click()
                  }
                  className="px-6 py-2 text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity bg-[#009EB4]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  {image2 ? "Change" : "Upload"}
                </motion.button>
              </motion.div>
            </div>
          ) : (
            <div className="mb-8">
              <label className="block text-gray-700 text-lg font-medium mb-2">
                Profile Photo
              </label>
              <motion.div
                className={`flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-dashed ${
                  errors.profilePhoto ? "border-red-500" : "border-gray-300"
                } px-4 py-4 rounded-lg bg-gray-50`}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white bg-white"
                    whileHover={{ scale: 1.05 }}>
                    {uploading ? (
                      <div className="flex items-center justify-center w-full h-full">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                      </div>
                    ) : image ? (
                      <img
                        src={image}
                        alt="Profile preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept={ACCEPTED_IMAGE_TYPES.join(",")}
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-600">
                      PNG or JPG. Max 2MB. Recommended square ratio.
                    </p>
                    {errors.profilePhoto && (
                      <p className="text-sm text-red-500">
                        {errors.profilePhoto.message}
                      </p>
                    )}
                  </div>
                </div>
                <motion.button
                  type="button"
                  onClick={() =>
                    document.querySelector('input[type="file"]')?.click()
                  }
                  className="px-6 py-2 text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity bg-[#009EB4]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  {image ? "Change" : "Upload"}
                </motion.button>
              </motion.div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">{renderCompanyStep}</AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-start">
              <motion.button
                type="button"
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
                onClick={() =>
                  companyStep === 1
                    ? setCurrentStep((prev) => prev - 1)
                    : handleCompanyStep("prev")
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <ChevronDown className="transform rotate-90" size={18} />
                Back
              </motion.button>

              <motion.button
                type="submit"
                className={`flex-1 px-6 py-3 rounded-md font-medium text-white ${
                  !agreeToTerms
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#009EB4] hover:bg-teal-600"
                } flex items-center justify-center gap-2`}
                whileHover={{ scale: agreeToTerms ? 1.02 : 1 }}
                whileTap={{ scale: agreeToTerms ? 0.98 : 1 }}
                disabled={!agreeToTerms || loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    Processing...
                  </>
                ) : registerData?.userIdType === "company" &&
                  companyStep < 3 ? (
                  <>
                    Next
                    <ChevronDown className="transform -rotate-90" size={18} />
                  </>
                ) : (
                  "Complete Registration"
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
