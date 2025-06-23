import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
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
  AlertCircle,
} from "lucide-react";
import ProjectSection from "../common/ProjectSection";
import CustomerSection from "../common/CustomerSection";

// Constants
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const DEFAULT_COUNTRY_CODE = "+966";
const PASSWORD_MIN_LENGTH = 8;
const NAME_MAX_LENGTH = 50;
const ABOUT_MAX_LENGTH = 500;
const TAGLINE_MAX_LENGTH = 150;
const COMPANY_NAME_MAX_LENGTH = 100;

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
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const formRef = useRef(null);
  // Redux Selectors
  const registerData = useSelector((state) => state.misc.registerData);
  const { loading } = useSelector((state) => state.auth);

  // Form Initialization
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
    setError,
    setValue,
    clearErrors,
    control,
    getValues,
    trigger,
    resetField,
  } = useForm({
    mode: "onBlur",
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
  const formValues = watch();

  // Effect to check overall form validity
  useEffect(() => {
    const checkFormValidity = async () => {
      const isValid = await trigger(undefined, { shouldFocus: false });
      setIsFormValid(
        isValid &&
          (registerData?.userIdType === "individual"
            ? !!image
            : !!image && !!image2) &&
          agreeToTerms
      );
    };
    checkFormValidity();
  }, [registerData]);

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
  }, [image, image2, companyStep, setError, clearErrors]);

  const handleCompanyStep = useCallback(
    async (direction) => {
      const isValid = await trigger(undefined, { shouldFocus: false });
      if (!isValid) return;

      if (!validateImage()) return;

      saveFormData();
      setCompanyStep((prev) => (direction === "next" ? prev + 1 : prev - 1));
    },
    [trigger, validateImage, saveFormData]
  );

  // Track field interactions
  const handleFieldInteraction = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  // Optimized input handlers with debouncing
  const handleInputChange = async (fieldName, value, validationFn) => {
    handleFieldInteraction(fieldName);
    setValue(fieldName, value, { shouldValidate: true });
    await trigger(fieldName, { shouldFocus: false });
  };

  // Enhanced Image Handlers
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("profilePhoto", {
        type: "manual",
        message: "Only JPEG/PNG/WEBP images allowed",
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
        message: "Only JPEG/PNG/WEBP images allowed",
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
      toast.error("You must agree to the terms and conditions");
      return;
    }

    if (!validateImage()) return;

    if (registerData?.userIdType === "company" && companyStep < 3) {
      handleCompanyStep("next");
      return;
    }

    try {
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
      formData.append("profileImage", profileImageFile);

      if (registerData?.userIdType === "company") {
        const businessImageFile = base64ToFile(image2, "business.png");
        formData.append("compLogo", businessImageFile);

        formData.append(
          "compProject",
          JSON.stringify(registerData?.projects || [])
        );
        formData.append(
          "compCustomers",
          JSON.stringify(registerData?.customers || [])
        );

        if (allData.tradeLicense?.[0]) {
          formData.append("tradeLicense", allData.tradeLicense[0]);
        }
      }

      const response = await dispatch(signupUser(formData)).unwrap();
      if (!response.error) {
        toast.success("Registration Successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  // Validation Functions
  const validateName = (value) => {
    const trimmed = value?.trim();
    if (!trimmed) return "This field is required";
    if (trimmed.length < 2) return "Minimum 2 characters required";
    if (!/^[a-zA-Z\u0600-\u06FF\s'-]+$/.test(trimmed))
      return "Invalid characters";
    return true;
  };

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Invalid email format";
    return true;
  };

  const validatePhone = (value) => {
    if (!value) return "Phone number is required";
    if (!/^[0-9]{7,14}$/.test(value)) return "Invalid phone number";
    return true;
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < PASSWORD_MIN_LENGTH)
      return `Minimum ${PASSWORD_MIN_LENGTH} characters`;
    if (!/\d/.test(value)) return "Must contain a number";
    if (!/[a-zA-Z]/.test(value)) return "Must contain a letter";
    if (/\s/.test(value)) return "No spaces allowed";
    return true;
  };

  const validateConfirmPassword = (value) => {
    if (!value) return "Please confirm your password";
    if (value !== password) return "Passwords don't match";
    return true;
  };

  const validateAbout = (value) => {
    const trimmed = value?.trim();
    if (!trimmed) return "This field is required";
    if (trimmed.length < 10) return "Minimum 10 characters required";
    return true;
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

    const renderInputStatus = (fieldName) => {
      const value = watch(fieldName);
      if (!value || !touchedFields[fieldName]) return null;

      return errors[fieldName] ? (
        <AlertCircle className="text-red-500" size={18} />
      ) : (
        <Check className="text-green-500" size={18} />
      );
    };

    const getInputBorderClass = (fieldName) => {
      if (!touchedFields[fieldName]) return "border-gray-300";
      return errors[fieldName] ? "border-red-500" : "border-green-500";
    };

    switch (companyStep) {
      case 1:
        return (
          <motion.div {...commonProps}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                      "firstName"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("firstName", {
                      validate: validateName,
                      maxLength: {
                        value: NAME_MAX_LENGTH,
                        message: `Maximum ${NAME_MAX_LENGTH} characters`,
                      },
                    })}
                    onChange={(e) =>
                      handleInputChange(
                        "firstName",
                        e.target.value,
                        validateName
                      )
                    }
                    onBlur={() => handleFieldInteraction("firstName")}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {renderInputStatus("firstName")}
                  </div>
                </div>
                {errors.firstName && touchedFields.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                      "lastName"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("lastName", {
                      validate: validateName,
                      maxLength: {
                        value: NAME_MAX_LENGTH,
                        message: `Maximum ${NAME_MAX_LENGTH} characters`,
                      },
                    })}
                    onChange={(e) =>
                      handleInputChange(
                        "lastName",
                        e.target.value,
                        validateName
                      )
                    }
                    onBlur={() => handleFieldInteraction("lastName")}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {renderInputStatus("lastName")}
                  </div>
                </div>
                {errors.lastName && touchedFields.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    disabled={!!registerData?.email}
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                      "email"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("email", {
                      validate: validateEmail,
                    })}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value, validateEmail)
                    }
                    onBlur={() => handleFieldInteraction("email")}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {renderInputStatus("email")}
                  </div>
                </div>
                {errors.email && touchedFields.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="w-1/4">
                    <CountryCodeDrop />
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Phone size={20} />
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter your number"
                      disabled={!!registerData?.phone}
                      className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                        "phoneNumber"
                      )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                      {...register("phoneNumber", {
                        validate: validatePhone,
                      })}
                      onChange={(e) =>
                        handleInputChange(
                          "phoneNumber",
                          e.target.value,
                          validatePhone
                        )
                      }
                      onBlur={() => handleFieldInteraction("phoneNumber")}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {renderInputStatus("phoneNumber")}
                    </div>
                  </div>
                </div>
                {errors.phoneNumber && touchedFields.phoneNumber && (
                  <p className="text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* About */}
              <div className="col-span-2 space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  About <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className={`w-full px-4 py-3 border ${getInputBorderClass(
                    "about"
                  )} rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                  {...register("about", {
                    validate: validateAbout,
                    maxLength: {
                      value: ABOUT_MAX_LENGTH,
                      message: `Maximum ${ABOUT_MAX_LENGTH} characters`,
                    },
                  })}
                  onChange={(e) =>
                    handleInputChange("about", e.target.value, validateAbout)
                  }
                  onBlur={() => handleFieldInteraction("about")}
                />
                {errors.about && touchedFields.about && (
                  <p className="text-sm text-red-500">{errors.about.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={`Minimum ${PASSWORD_MIN_LENGTH} characters`}
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                      "password"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("password", {
                      validate: validatePassword,
                    })}
                    onChange={(e) =>
                      handleInputChange(
                        "password",
                        e.target.value,
                        validatePassword
                      )
                    }
                    onBlur={() => handleFieldInteraction("password")}
                  />
                  <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    {renderInputStatus("password")}
                  </div>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && touchedFields.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                      "confirmPassword"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("confirmPassword", {
                      validate: validateConfirmPassword,
                    })}
                    onChange={(e) =>
                      handleInputChange(
                        "confirmPassword",
                        e.target.value,
                        validateConfirmPassword
                      )
                    }
                    onBlur={() => handleFieldInteraction("confirmPassword")}
                  />
                  <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    {renderInputStatus("confirmPassword")}
                  </div>
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
                {errors.confirmPassword && touchedFields.confirmPassword && (
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
                I agree to the Terms of Service & Privacy Policy{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>
            {!agreeToTerms && isDirty && (
              <p className="text-sm text-red-500 mt-1">
                You must agree to the terms and conditions
              </p>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div {...commonProps}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Company Name */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Building size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                      "companyName"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("companyName", {
                      required: "Company name is required",
                      validate: (v) => !!v.trim() || "Cannot be blank",
                      minLength: { value: 2, message: "Minimum 2 characters" },
                      maxLength: {
                        value: COMPANY_NAME_MAX_LENGTH,
                        message: `Maximum ${COMPANY_NAME_MAX_LENGTH} characters`,
                      },
                    })}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    onBlur={() => handleFieldInteraction("companyName")}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {renderInputStatus("companyName")}
                  </div>
                </div>
                {errors.companyName && touchedFields.companyName && (
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
                    className={`w-full px-4 py-2.5 pl-10 border ${getInputBorderClass(
                      "tagline"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("tagline", {
                      maxLength: {
                        value: TAGLINE_MAX_LENGTH,
                        message: `Maximum ${TAGLINE_MAX_LENGTH} characters`,
                      },
                    })}
                    onChange={(e) =>
                      handleInputChange("tagline", e.target.value)
                    }
                    onBlur={() => handleFieldInteraction("tagline")}
                  />
                </div>
                {errors.tagline && touchedFields.tagline && (
                  <p className="text-sm text-red-500">
                    {errors.tagline.message}
                  </p>
                )}
              </div>

              {/* Phone & Email */}
              <div className="col-span-1 md:col-span-3 space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Business Contact <span className="text-red-500">*</span>
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
                      className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                        "companyPhone"
                      )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                      {...register("companyPhone", {
                        validate: validatePhone,
                      })}
                      onChange={(e) =>
                        handleInputChange(
                          "companyPhone",
                          e.target.value,
                          validatePhone
                        )
                      }
                      onBlur={() => handleFieldInteraction("companyPhone")}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {renderInputStatus("companyPhone")}
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      placeholder="Email address"
                      className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                        "companyEmail"
                      )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                      {...register("companyEmail", {
                        validate: validateEmail,
                      })}
                      onChange={(e) =>
                        handleInputChange(
                          "companyEmail",
                          e.target.value,
                          validateEmail
                        )
                      }
                      onBlur={() => handleFieldInteraction("companyEmail")}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {renderInputStatus("companyEmail")}
                    </div>
                  </div>
                </div>
                {errors.companyPhone && touchedFields.companyPhone && (
                  <p className="text-sm text-red-500">
                    {errors.companyPhone.message}
                  </p>
                )}
                {errors.companyEmail && touchedFields.companyEmail && (
                  <p className="text-sm text-red-500">
                    {errors.companyEmail.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MapPin size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Eg. Palm Jumeirah"
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                      "companyAddress"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("companyAddress", {
                      required: "Location is required",
                      validate: (v) => !!v.trim() || "Cannot be blank",
                    })}
                    onChange={(e) =>
                      handleInputChange("companyAddress", e.target.value)
                    }
                    onBlur={() => handleFieldInteraction("companyAddress")}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {renderInputStatus("companyAddress")}
                  </div>
                </div>
                {errors.companyAddress && touchedFields.companyAddress && (
                  <p className="text-sm text-red-500">
                    {errors.companyAddress.message}
                  </p>
                )}
              </div>

              {/* Founding Date */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Founding Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Calendar size={20} />
                  </div>
                  <input
                    type="date"
                    className={`w-full px-4 py-2.5 pl-10 border ${getInputBorderClass(
                      "foundingDate"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("foundingDate", {
                      required: "Founding date is required",
                      validate: (value) => {
                        const selectedDate = new Date(value);
                        const currentDate = new Date();
                        return (
                          selectedDate <= currentDate ||
                          "Date cannot be in the future"
                        );
                      },
                    })}
                    onChange={(e) =>
                      handleInputChange("foundingDate", e.target.value)
                    }
                    onBlur={() => handleFieldInteraction("foundingDate")}
                  />
                </div>
                {errors.foundingDate && touchedFields.foundingDate && (
                  <p className="text-sm text-red-500">
                    {errors.foundingDate.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MapPin size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter city"
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                      "city"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("city", {
                      required: "City is required",
                      validate: (v) => !!v.trim() || "Cannot be blank",
                    })}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    onBlur={() => handleFieldInteraction("city")}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {renderInputStatus("city")}
                  </div>
                </div>
                {errors.city && touchedFields.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Globe size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter country"
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                      "country"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("country", {
                      required: "Country is required",
                      validate: (v) => !!v.trim() || "Cannot be blank",
                    })}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    onBlur={() => handleFieldInteraction("country")}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {renderInputStatus("country")}
                  </div>
                </div>
                {errors.country && touchedFields.country && (
                  <p className="text-sm text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Zip Code */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FileText size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter ZIP code"
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                      "zip"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("zip", {
                      required: "ZIP code is required",
                      pattern: {
                        value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                        message: "Invalid ZIP code format",
                      },
                    })}
                    onChange={(e) => handleInputChange("zip", e.target.value)}
                    onBlur={() => handleFieldInteraction("zip")}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {renderInputStatus("zip")}
                  </div>
                </div>
                {errors.zip && touchedFields.zip && (
                  <p className="text-sm text-red-500">{errors.zip.message}</p>
                )}
              </div>

              {/* Company Type */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("companyType", { required: "Type is required" })}
                  className={`w-full px-4 py-2.5 border ${getInputBorderClass(
                    "companyType"
                  )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                  onChange={(e) =>
                    handleInputChange("companyType", e.target.value)
                  }
                  onBlur={() => handleFieldInteraction("companyType")}>
                  <option value="">Select</option>
                  <option value="LLC">LLC</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Corporation">Corporation</option>
                  <option value="Sole Proprietorship">
                    Sole Proprietorship
                  </option>
                </select>
                {errors.companyType && touchedFields.companyType && (
                  <p className="text-sm text-red-500">
                    {errors.companyType.message}
                  </p>
                )}
              </div>

              {/* IKTVA Number */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  IKTVA Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FileText size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter IKTVA #"
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                      "iktva"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("iktva", {
                      required: "IKTVA number is required",
                    })}
                    onChange={(e) => handleInputChange("iktva", e.target.value)}
                    onBlur={() => handleFieldInteraction("iktva")}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {renderInputStatus("iktva")}
                  </div>
                </div>
                {errors.iktva && touchedFields.iktva && (
                  <p className="text-sm text-red-500">{errors.iktva.message}</p>
                )}
              </div>

              {/* Company Size */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Company Size <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("companySize", { required: "Size is required" })}
                  className={`w-full px-4 py-2.5 border ${getInputBorderClass(
                    "companySize"
                  )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                  onChange={(e) =>
                    handleInputChange("companySize", e.target.value)
                  }
                  onBlur={() => handleFieldInteraction("companySize")}>
                  <option value="">Select</option>
                  <option value="1-10">1–10</option>
                  <option value="11-50">11–50</option>
                  <option value="51-200">51–200</option>
                  <option value="201-500">201–500</option>
                  <option value="501-1000">501–1000</option>
                  <option value="1001+">1001+</option>
                </select>
                {errors.companySize && touchedFields.companySize && (
                  <p className="text-sm text-red-500">
                    {errors.companySize.message}
                  </p>
                )}
              </div>

              {/* Industry */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Industry <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("industry", {
                    required: "Industry is required",
                  })}
                  className={`w-full px-4 py-2.5 border ${getInputBorderClass(
                    "industry"
                  )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                  onBlur={() => handleFieldInteraction("industry")}>
                  <option value="">Select</option>
                  <option value="Construction">Construction</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Oil & Gas">Oil & Gas</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
                {errors.industry && touchedFields.industry && (
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
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                      "website"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("website", {
                      pattern: {
                        value:
                          /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/,
                        message: "Invalid URL format",
                      },
                    })}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    onBlur={() => handleFieldInteraction("website")}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {renderInputStatus("website")}
                  </div>
                </div>
                {errors.website && touchedFields.website && (
                  <p className="text-sm text-red-500">
                    {errors.website.message}
                  </p>
                )}
              </div>

              {/* CR Number */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  CR Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FileText size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter CR number"
                    className={`w-full px-4 py-2.5 pl-10 pr-10 border ${getInputBorderClass(
                      "crNumber"
                    )} rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                    {...register("crNumber", {
                      required: "CR number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Must be 10 digits",
                      },
                    })}
                    onChange={(e) =>
                      handleInputChange("crNumber", e.target.value)
                    }
                    onBlur={() => handleFieldInteraction("crNumber")}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {renderInputStatus("crNumber")}
                  </div>
                </div>
                {errors.crNumber && touchedFields.crNumber && (
                  <p className="text-sm text-red-500">
                    {errors.crNumber.message}
                  </p>
                )}
              </div>

              {/* About Company */}
              <div className="col-span-1 md:col-span-3 space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  About Company <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  className={`w-full px-4 py-3 border ${getInputBorderClass(
                    "companyAbout"
                  )} rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                  placeholder="Enter details about your company"
                  {...register("companyAbout", {
                    required: "Company description is required",
                    validate: (v) => !!v.trim() || "Cannot be blank",
                    minLength: {
                      value: 20,
                      message: "Minimum 20 characters required",
                    },
                    maxLength: {
                      value: ABOUT_MAX_LENGTH,
                      message: `Maximum ${ABOUT_MAX_LENGTH} characters`,
                    },
                  })}
                  onChange={(e) =>
                    handleInputChange("companyAbout", e.target.value)
                  }
                  onBlur={() => handleFieldInteraction("companyAbout")}
                />
                {errors.companyAbout && touchedFields.companyAbout && (
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
    touchedFields,
  ]);

  return (
    <div className="px-4 md:px-8 pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
          {companyStep > 1 ? (
            <div className="mb-8">
              <label className="block text-gray-700 text-lg font-medium mb-2">
                Business Logo <span className="text-red-500">*</span>
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
                        alt="Company logo preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <Building className="w-8 h-8" />
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
                      PNG, JPG or WEBP. Max 2MB. Recommended square ratio.
                    </p>
                    {errors.compLogo && isDirty && (
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
                Profile Photo <span className="text-red-500">*</span>
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
                      PNG, JPG or WEBP. Max 2MB. Recommended square ratio.
                    </p>
                    {errors.profilePhoto && isDirty && (
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            ref={formRef}>
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
                whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid ? 0.98 : 1 }}>
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
