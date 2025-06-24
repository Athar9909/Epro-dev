import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { resetPassword } from '../../Redux-config/slices/authSlice';

export default function AppResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { data, loginMethod } = location.state || {};

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [hasTyped, setHasTyped] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        if (!validatePassword(formData.password)) {
            toast.error("Password doesn't meet requirements");
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                confirmPassword: formData.confirmPassword,
                newPassword: formData.password,
                ...(loginMethod === "phone"
                    ? { phoneNumber: data?.phone }
                    : { email: data?.email }),
                ...(loginMethod === "phone" && { countryCode: data?.countryCode }),
            };

            const response = await dispatch(resetPassword(payload)).unwrap();

            if (response?.error === false) {
                navigate("/login");
            } else {
                throw new Error(response?.message || "Password reset failed");
            }
        } catch (error) {
            console.error("Password reset error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return regex.test(password);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (!hasTyped && value) {
            setHasTyped(true);
        }
    };

    const passwordRequirements = [
        {
            text: "8–16 characters",
            valid: formData.password.length >= 8 && formData.password.length <= 16,
            key: 'length'
        },
        {
            text: "Uppercase & lowercase letters",
            valid: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password),
            key: 'case'
        },
        {
            text: "At least one number (0-9)",
            valid: /\d/.test(formData.password),
            key: 'number'
        },
        {
            text: "Special character (@, #, $, etc.)",
            valid: /[@$!%*?&]/.test(formData.password),
            key: 'special'
        },
    ];

    return (
        <div className='bg-[#ecf8f6] min-h-screen flex items-center'>
            <div className="w-full max-w-md mx-auto p-4">
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[#272727] mb-2">Reset Password</h2>
                        <p className="text-[#272727]">Securely reset your password and regain access.</p>
                    </div>

                    <form onSubmit={onSubmit}>
                        <div className="space-y-4">
                            {/* New Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-[#272727] mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Create a new password"
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009EB4] focus:border-transparent"
                                        required
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#272727] focus:outline-none"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        <img
                                            src={showPassword ? '/resources/icons/eye-slash.svg' : '/resources/icons/eye.svg'}
                                            alt={showPassword ? "Hide password" : "Show password"}
                                            className="w-5 h-5"
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-[#272727] mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Re-enter your password"
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009EB4] focus:border-transparent"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#272727] focus:outline-none"
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    >
                                        <img
                                            src={showConfirmPassword ? '/resources/icons/eye-slash.svg' : '/resources/icons/eye.svg'}
                                            alt={showConfirmPassword ? "Hide password" : "Show password"}
                                            className="w-5 h-5"
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Password Requirements */}
                            <div className="space-y-2 mt-4">
                                <p className="text-sm text-gray-600">Password must contain:</p>
                                <div className="space-y-2">
                                    {passwordRequirements.map((req) => (
                                        <div key={req.key} className='flex gap-2 items-center text-sm'>
                                            {hasTyped && req.valid ? (
                                                <img
                                                    src='/resourcesApp/iconsApp/checkActive.svg'
                                                    alt="Valid"
                                                    className='w-4 h-4'
                                                />
                                            ) : (
                                                <img
                                                    src='/resources/icons/check.svg'
                                                    alt="Valid"
                                                    className='w-4 h-4'
                                                />
                                            )
                                            }
                                            <span className={hasTyped ? (req.valid ? "text-green-600" : "text-gray-500") : "text-gray-500"}>
                                                {req.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || !validatePassword(formData.password) || formData.password !== formData.confirmPassword}
                                className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors mt-4 ${isLoading || !validatePassword(formData.password) || formData.password !== formData.confirmPassword
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-[#009EB4] hover:bg-[#008a9d]"
                                    }`}
                            >
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}