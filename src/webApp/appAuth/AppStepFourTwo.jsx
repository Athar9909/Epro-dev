import { useForm } from "react-hook-form";
import { useState } from "react";
import { Camera } from "lucide-react";

const AppStepFourTwo = ({ setCurrentStep }) => {
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
        <div className="max-w-5xl mx-auto p-4 rounded-[16px] bg-white">
            <div className="">
                {/* Profile Photo Upload */}
                <div className="mb-8">
                    <label className="block text-gray-700 text-[20px] font-bold text-center">
                        Create Profile
                    </label>
                    <p className="text-[12px] text-gray-600 my-1 text-center">
                        Create a new account & start exploring
                    </p>
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
                            label="Company Name"
                            // icon="/resources/icons/user.svg"
                            // placeholder="Enter your name"
                            error={errors.firstName}
                            register={register("firstName", {
                                required: "First name is required",
                            })}
                        />
                        <InputField
                            label="Company Tagline"
                            // icon="/resources/icons/user.svg"
                            // placeholder="Enter your name"
                            error={errors.lastName}
                            register={register("lastName", {
                                required: "Last name is required",
                            })}
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="w-full">
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
                                // icon="/resources/icons/phone.svg"
                                // placeholder="Enter your number"
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

                    {/* email address */}
                    <InputField
                        type="email"
                        label="Email Address"
                        // icon="/resources/icons/email.svg"
                        // placeholder="Enter your email"
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

                    {/* founding date */}
                    <InputField
                        type="founding-date"
                        label="Founding Date"
                        icon="/resources/icons/calender.svg"
                        // placeholder="Minimum 8 characters"
                        error={errors.password}
                        register={register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Minimum 8 characters",
                            },
                        })}
                    />

                    {/* About */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            About You
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Tell us about yourself..."
                            className={`w-full px-4 py-3 border ${errors.about ? "border-red-500" : "border-gray-300"
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
                        // icon="/resources/icons/lock.svg"
                        // placeholder="Minimum 8 characters"
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
                        // icon="/resources/icons/lock.svg"
                        // placeholder="Re-enter your password"
                        error={errors.confirmPassword}
                        register={register("confirmPassword", {
                            required: "Confirm your password",
                            validate: (val) =>
                                val === password || "Passwords do not match",
                        })}
                    />


                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-start">
                        <button
                            // type="submit"
                            // disabled={!isValid || !agreeToTerms}
                            className="flex-1 px-6 py-3 text-white rounded-md font-medium hover:opacity-90 transition-opacity"
                            style={{
                                backgroundColor:
                                    !isValid || !agreeToTerms ? "#ccc" : "#009EB4",
                                // cursor: !isValid || !agreeToTerms ? "not-allowed" : "pointer",
                            }}
                            onClick={() => setCurrentStep(5)}>
                            Continue
                        </button>
                    </div>
                </form>
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
    <div className="w-full">
        {label && (
            <label className="block text-sm font-semibold text-gray-700 mb-1">
                {label}
            </label>
        )}
        <div className="relative">
            <input
                type={type}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-[#009EB4] focus:ring-opacity-50 focus:outline-none`}
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

export default AppStepFourTwo;
