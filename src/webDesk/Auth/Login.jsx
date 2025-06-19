import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from "../../Redux-config/slices/authSlice";
import { setUserType } from "../../Redux-config/apisModel/apiService";
import CountryCodeDrop from "../common/countryCodeDrop";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);
  const { userType } = useSelector((state) => state.misc);
  const [loginMethod, setLoginMethod] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      phone: "",
      email: "",
      password: "",
      countryCode: "+966",
    },
  });

  // Load saved credentials if they exist
  useEffect(() => {
    const savedCredentials = localStorage.getItem("savedCredentials");
    if (savedCredentials) {
      const {
        phone,
        email,
        password,
        countryCode,
        rememberMe: savedRememberMe,
      } = JSON.parse(savedCredentials);
      reset({ phone, email, password, countryCode });
      setRememberMe(savedRememberMe);
    }

    if (token) navigate("/dashboard");
  }, [token, navigate, error, reset]);

  useEffect(() => {
    setUserType(userType);
  }, [userType]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...(loginMethod === "phone" && { countryCode: data.countryCode }),
        ...(loginMethod === "phone" && { phoneNumber: data.phone }),
        ...(loginMethod === "email" && { email: data.email }),
        password: data?.password,
      };

      if (rememberMe) {
        localStorage.setItem(
          "savedCredentials",
          JSON.stringify({
            phone: data.phone,
            email: data.email,
            password: data.password,
            countryCode: data.countryCode,
            rememberMe: true,
          })
        );
      } else {
        localStorage.removeItem("savedCredentials");
      }

      const response = await dispatch(loginUser(payload)).unwrap();
      if (response?.error === false && response?.error_code === 200) {
        toast.success("Login successful!");
        navigate("/Dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  const switchVariants = {
    phone: { x: 0 },
    email: { x: "100%" },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="min-h-screen bg-[#fefefe] flex p-4">
      {/* Left Side - Banner (Desktop only) */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="hidden md:flex lg:w-[35%] bg-gradient-to-br from-[#009EB4] to-teal-500 relative overflow-hidden rounded-container shadow-md">
        <div className="bg-[url(/resources/images/homeBanner.svg)] w-full bg-cover bg-center relative z-10 flex flex-col justify-between p-8 text-white">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-${i === 0 ? "8" : "2"} h-2 rounded-full ${
                  i === 0 ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex-1 flex items-end">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-4">Find What You Need</h1>
              <p className="text-lg opacity-90">
                Browse over 1,000 curated categories to find top-quality
                products tailored for your business.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#009EB4]/80 to-teal-500/80" />
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full lg:w-[65%] flex flex-col items-center justify-center p-4 sm:p-8 bg-white border-2 border-[#e5e5e5] sm:ml-4 rounded-container shadow-md">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="w-full max-w-4xl">
          <div className="flex justify-between mb-8 flex-wrap gap-2 flex-col-reverse sm:flex-row">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center bg-[#e7e7e7] p-2 rounded-btn">
              <img
                src="/resources/icons/language.svg"
                alt="Language"
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-600 ml-2">English ▼</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-sm bg-[#e7e7e7] py-4 px-2 rounded-btn">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                to="/User-web/Profile-Selection"
                className="text-[#009EB4] hover:underline">
                Sign up
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Form Content */}
        <motion.div variants={itemVariants} className="w-full max-w-2xl">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <img
                src="/resources/logo/logo-bg-white.svg"
                alt="Logo"
                className="h-12"
              />
            </motion.div>
          </div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            variants={containerVariants}
            className="space-y-6">
            {/* Form Header */}
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Login to your Account
              </h2>
              <p className="text-gray-600">
                Welcome back! Please sign in to your existing account
              </p>
            </motion.div>

            {/* Login Method Toggle */}
            <motion.div
              variants={itemVariants}
              className="relative bg-gray-100 rounded-lg p-1 h-12">
              <motion.div
                animate={loginMethod}
                variants={switchVariants}
                className="absolute w-1/2 h-10 bg-white rounded-md shadow-sm"
              />
              <div className="relative flex h-full">
                <button
                  type="button"
                  onClick={() => setLoginMethod("phone")}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors z-10 ${
                    loginMethod === "phone"
                      ? "text-[#009EB4]"
                      : "text-gray-600 hover:text-gray-800"
                  }`}>
                  <img
                    src={
                      loginMethod === "phone"
                        ? "/resources/icons/phoneActive.svg"
                        : "/resources/icons/call.svg"
                    }
                    alt="Phone"
                    className="w-5 h-5"
                  />
                  <span>Phone</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod("email")}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors z-10 ${
                    loginMethod === "email"
                      ? "text-[#009EB4]"
                      : "text-gray-600 hover:text-gray-800"
                  }`}>
                  <img
                    src={
                      loginMethod === "email"
                        ? "/resources/icons/emailActive.svg"
                        : "/resources/icons/email.svg"
                    }
                    alt="Email"
                    className="w-5 h-5"
                  />
                  <span>Email</span>
                </button>
              </div>
            </motion.div>

            {/* Form Fields */}
            <motion.div variants={containerVariants} className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={loginMethod}
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {loginMethod === "phone" ? "Phone Number" : "Email Address"}
                  </label>

                  {loginMethod === "phone" ? (
                    <div className="flex gap-2">
                      <div className="w-1/4">
                        <CountryCodeDrop
                          selectedCode={watch("countryCode") || "+966"}
                          onSelect={(code) => setValue("countryCode", code)}
                          register={register("countryCode", {
                            required: "Country code is required",
                          })}
                          error={errors.countryCode}
                        />
                      </div>

                      <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <img
                            src="/resources/icons/call.svg"
                            alt="Phone"
                            className="h-5 w-5 text-gray-400"
                          />
                        </div>
                        <input
                          type="number"
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message:
                                "Please enter a valid 10-digit phone number",
                            },
                          })}
                          placeholder="Enter phone number"
                          className={`w-full pl-10 px-3 py-2 border ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <img
                          src="/resources/icons/email.svg"
                          alt="Email"
                          className="h-5 w-5 text-gray-400"
                        />
                      </div>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Please enter a valid email",
                          },
                        })}
                        placeholder="Enter your email"
                        className={`w-full pl-10 px-3 py-2 border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`}
                      />
                    </div>
                  )}
                  {errors[loginMethod] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[loginMethod]?.message}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img
                      src="/resources/icons/lock.svg"
                      alt="Password"
                      className="h-5 w-5 text-gray-400"
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    placeholder="At least 8 characters"
                    className={`w-full pl-10 px-3 py-2 pr-10 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <img
                      src={
                        showPassword
                          ? "/resources/icons/eye-slash.svg"
                          : "/resources/icons/eye.svg"
                      }
                      alt={showPassword ? "Hide password" : "Show password"}
                      a
                      className="h-5 w-5"
                    />
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#009EB4] border-gray-300 rounded focus:ring-teal-600"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#009EB4] hover:underline">
                  Forgot password?
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center bg-[#009EB4] text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 transition-colors font-medium">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </motion.div>
            </motion.div>

            {/* Social Login Options */}
            <motion.div variants={containerVariants} className="space-y-3">
              <motion.div
                variants={itemVariants}
                className="text-center text-sm text-gray-500 flex items-center justify-center">
                <hr className="flex-1 border-gray-300" />
                <span className="px-3">or Continue with</span>
                <hr className="flex-1 border-gray-300" />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                  <img
                    src="/resources/icons/nafat.svg"
                    alt="Nafath"
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Login with Nafath
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                  <img
                    src="/resources/icons/guest.svg"
                    alt="Guest"
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Login as Guest
                  </span>
                </button>
              </motion.div>
            </motion.div>

            {/* Footer Links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-x-4 text-xs text-gray-500 pt-4">
              <Link to="/privacy" className="hover:text-gray-700">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-gray-700">
                Terms & Condition
              </Link>
              <span>•</span>
              <Link to="/help" className="hover:text-gray-700">
                Help Center
              </Link>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
