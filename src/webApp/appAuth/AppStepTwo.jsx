import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import CommNote from "./CommNote";

const AppStepTwo = ({ type = "email", setCurrentStep }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const value = watch(type);

  const onSubmit = (data) => {
    console.log("Verified Data:", data);
  };

  const renderFieldLabel = () => {
    switch (type) {
      case "email":
        return "Email Address";
      case "phone":
        return "Phone Number";
      case "nafath":
        return "Nafath ID";
      default:
        return "Value";
    }
  };

  const renderFieldPlaceholder = () => {
    switch (type) {
      case "email":
        return "Enter your email";
      case "phone":
        return "Enter your mobile number";
      case "nafath":
        return "Enter Nafath ID";
      default:
        return "";
    }
  };

  const renderValidation = () => {
    switch (type) {
      case "email":
        return {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Enter a valid email",
          },
        };
      case "phone":
        return {
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Enter a valid 10-digit phone number",
          },
        };
      case "nafath":
        return {
          required: "Nafath ID is required",
          minLength: {
            value: 5,
            message: "Must be at least 5 characters",
          },
        };
      default:
        return {};
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 rounded-[16px] bg-white">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="text-center mb-6">
          <div
            className={`border p-4 w-20 h-20 flex justify-center items-center mx-auto rounded-full cursor-pointer transition-all duration-300 hover:shadow-md ${"border-[#009EB4] bg-[#009EB420]"}`}>
            <img
              src={`/resources/icons/emailId.svg`}
              alt={`${type}-icon`}
              className="w-10 h-10"
            />
          </div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-1 mt-4">
            Enter your {renderFieldLabel()}
          </h2>
          <p className="text-gray-600 text-[12px] leading-relaxed">
            Please verify your identity using the selected method.
          </p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {renderFieldLabel()}
          </label>
          <div className="relative">
            <input
              type={type === "email" ? "email" : "text"}
              placeholder={renderFieldPlaceholder()}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none transition pl-6 md:pl-12
                ${errors[type]
                  ? "border-red-500"
                  : value
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              {...register(type, renderValidation())}
            />

            {/* Icon Left (Optional) */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {/* <img
                src={`/resources/icons/${type}.svg`}
                alt={`${type}-icon`}
                className="w-4 h-4 md:w-6 md:h-6"
              /> */}
            </div>

            {/* Check Icon Right */}
            {value && !errors[type] && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
                ✓
              </div>
            )}
          </div>
          {errors[type] && (
            <p className="text-red-500 text-sm mt-1">{errors[type].message}</p>
          )}
        </div>

        <div className="border border-[#009EB4] bg-[#F6FEFF] p-2 flex gap-1 items-center rounded-[10px] text-xs my-6">
          <img
            className="font-semibold w-6 h-6"
            src="/resourcesApp/iconsApp/infoActive.svg"
            alt="info"
          />
          <p>You can add your company details from your profile</p>
        </div>

        {/* Action Buttons */}
        <div className="flex">
          <div
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="pri-btn text-center"
            to={"/User-App/SignUp"}>
            Continue
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppStepTwo;
