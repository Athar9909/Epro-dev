import React, { useState } from 'react'

const Header = () => {
    const [selectedProfile, setSelectedProfile] = useState(null);

    const handleProfileSelect = (type) => {
        setSelectedProfile(type);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className=" px-4 py-4">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <img className="text-teal-500 font-bold text-xl" src='assets/resources/logo/logo.svg' />
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className=" text-sm bg-[#F2EFEA] flex gap-2 p-2 rounded-btn">
                            <img className="text-teal-500 font-bold text-xl" src='assets/resources/icons/eng-flag.png' />
                            <span>
                                English
                            </span>
                        </div>
                        <button className="bg-[#009EB4] text-white px-4 py-2 rounded-btn transition-colors">
                            Log in
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-[url(assets/resources/images/banner1.svg)] px-4 pt-2 pb-16 h-[25dvh] md:h-[35dvh]">
                <div className="max-w-6xl mx-auto mt-6 sm:mt-12">
                    <button className="bg-white text-gray-700 px-4 py-2 rounded-btn mb-8 hover:bg-gray-50 transition-colors">
                        ← Back
                    </button>
                </div>
            </div>

            {/* Profile Selection Card */}
            <div className="relative -top-20 sm:-top-35 px-4">
                <div className="max-w-2xl mx-auto bg-white rounded-container shadow-lg p-6 sm:px-16 sm:py-10">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Select your profile Type</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            has been the industry's standard dummy text ever since the 1500s.
                        </p>
                    </div>

                    {/* Profile Options */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        {/* Individual Profile */}
                        <div
                            className={`border-2 rounded-lg p-6 text-center cursor-pointer transition-all hover:shadow-md ${selectedProfile === 'individual'
                                ? 'border-[#009EB4] bg-teal-50'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                            onClick={() => handleProfileSelect('individual')}
                        >
                            <div className="mb-4">
                                <div className="w-26 h-26 rounded-lg mx-auto flex items-center justify-center">
                                    <img className="font-semibold" src='assets/resources/icons/people.svg' />
                                </div>
                            </div>
                            <h3 className="font-medium text-gray-900">Continue as Individual</h3>
                        </div>

                        {/* Company Profile */}
                        <div
                            className={`border-2 rounded-lg p-6 text-center cursor-pointer transition-all hover:shadow-md ${selectedProfile === 'company'
                                ? 'border-[#009EB4] bg-teal-50'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                            onClick={() => handleProfileSelect('company')}
                        >
                            <div className="mb-4">
                                <div className="w-26 h-26 rounded-lg mx-auto flex items-center justify-center">
                                    <img className="font-semibold" src='assets/resources/icons/building.svg' />

                                </div>
                            </div>
                            <h3 className="font-medium text-gray-900">Continue as Company</h3>
                        </div>
                    </div>

                    {/* Info Note */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">i</span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-blue-800">
                                    <strong>Note:</strong> You can add your company details from your profile
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="text-center text-gray-500 text-sm">Or</div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                        <button className="flex-1 bg-[#009EB4] text-white py-3 px-6 rounded-btn hover:bg-teal-600 transition-colors font-medium">
                            Continue as Guest
                        </button>
                        <button
                            className={`flex-1 py-3 px-6 rounded-btn font-medium transition-colors ${selectedProfile
                                ? 'bg-gray-900 text-white hover:bg-gray-800'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                            disabled={!selectedProfile}
                        >
                            Next Step
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-16 bg-[#009EB4] text-center py-4">
                <p className="text-white text-sm">
                    © Techgropse Group - 2025 All Right Reserved
                </p>
            </div>
        </div>
    )
}

export default Header
