import { useForm } from "react-hook-form";
import { useState } from "react";

const StepFour = ({ setCurrentStep }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "info@techgropse.com",
      password: "",
      confirmPassword: "",
      about: "",
      phoneNumber: "",
      countryCode: "+966",
    },
  });

  const password = watch("password");

  const onSubmit = (data) => {
    if (!agreeToTerms) return;
    console.log("Final Data:", { ...data, profilePhoto: image });
    setCurrentStep((prev) => prev + 1);
  };

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

  return (
    <div className="px-4 md:px-8 pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg p-6 md:p-8">
          {/* Profile Photo Upload */}
          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Profile Photo
            </label>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-dashed border-gray-300 px-4 py-4 rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white bg-white">
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
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  PNG or JPG. Recommended square ratio.
                </p>
              </div>
              {/* Upload triggers input click */}
              <button
                type="button"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
                className="px-6 py-2 text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#009EB4" }}>
                Upload
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="First Name"
                icon="/resources/icons/user.svg"
                placeholder="Enter your name"
                error={errors.firstName}
                register={register("firstName", {
                  required: "First name is required",
                })}
              />
              <InputField
                label="Last Name"
                icon="/resources/icons/user.svg"
                placeholder="Enter your name"
                error={errors.lastName}
                register={register("lastName", {
                  required: "Last name is required",
                })}
              />
              <InputField
                type="email"
                label="Email Address"
                icon="/resources/icons/email.svg"
                placeholder="Enter your email"
                error={errors.email}
                register={register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                showValid
              />

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    {...register("countryCode")}
                    className="px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="+966">+966</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                  <InputField
                    type="tel"
                    name="phoneNumber"
                    icon="/resources/icons/phone.svg"
                    placeholder="Enter your number"
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
              </div>

              {/* About */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    minLength: {
                      value: 10,
                      message: "Minimum 10 characters",
                    },
                  })}
                />
                {errors.about && (
                  <span className="text-sm text-red-500">
                    {errors.about.message}
                  </span>
                )}
              </div>

              <InputField
                type="password"
                label="Password"
                icon="/resources/icons/lock.svg"
                placeholder="Minimum 8 characters"
                error={errors.password}
                register={register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
                  },
                })}
              />

              <InputField
                type="password"
                label="Confirm Password"
                icon="/resources/icons/lock.svg"
                placeholder="Re-enter your password"
                error={errors.confirmPassword}
                register={register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (val) =>
                    val === password || "Passwords do not match",
                })}
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 border-gray-300"
                style={{ accentColor: "#009EB4" }}
              />
              <label className="text-sm text-gray-700">
                I agree to the Terms of Service & Privacy Policy
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-start">
              <button
                type="button"
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50"
                onClick={() => setCurrentStep((prev) => prev - 1)}>
                Back
              </button>
              <button
                // type="submit"
                // disabled={!isValid || !agreeToTerms}
                className="flex-1 px-6 py-3 text-white rounded-md font-medium hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor:
                    !isValid || !agreeToTerms ? "#ccc" : "#009EB4",
                  // cursor: !isValid || !agreeToTerms ? "not-allowed" : "pointer",
                }}
                onClick={()=>setCurrentStep(5)}>
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
}) => (
  <div>
    {label && (
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 pl-10 pr-10 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none`}
        {...register}
      />
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <img src={icon} alt="icon" />
        </div>
      )}
      {showValid && !error && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
          ✓
        </div>
      )}
    </div>
    {error && <p className="text-sm text-red-500">{error.message}</p>}
  </div>
);

export default StepFour;
