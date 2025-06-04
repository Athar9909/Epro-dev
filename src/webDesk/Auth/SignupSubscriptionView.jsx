import React, { useState } from 'react';

export default function SignupSubscriptionView() {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardData, setCardData] = useState({
        number: '',
        expiry: '',
        cvv: '',
        name: ''
    });
    const [saveCard, setSaveCard] = useState(false);

    const handleCardInput = (e) => {
        const { name, value } = e.target;
        setCardData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const privacyPoints = [
        {
            title: "1. Use of your personal data",
            description: "The personal data you share with us is stored and encrypted across our secure systems."
        },
        {
            title: "2. Data retention period",
            description: "Your personal data will only stay for as long as necessary to fulfill the purposes for which it was collected, as set out in this privacy notice."
        },
        {
            title: "3. Third parties",
            description: "We may share your personal data with trusted third parties to assist in providing our services, only under strict confidentiality agreements."
        },
        {
            title: "4. User rights",
            description: "You have the right to access, correct, or delete your personal data at any time, as well as the right to limit processing or object to processing."
        },
        {
            title: "5. Cookies policy",
            description: "Our website uses cookies to improve user experience. You can manage your cookie preferences through your browser settings."
        },
        {
            title: "6. Security measures",
            description: "We implement advanced technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction."
        },
        {
            title: "7. Changes to the privacy policy",
            description: "We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons."
        },
        {
            title: "8. Changes to the privacy policy",
            description: "We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Progress Steps */}
            <div className="w-full px-4 py-6 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 md:mb-8">
                        User Sign Up Process
                    </h1>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-8 md:mb-12">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-[#009EB4] flex items-center justify-center text-white text-sm font-medium">
                                ✓
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">STEP 01</span>
                        </div>

                        <div className="flex-1 h-px bg-[#009EB4] mx-4"></div>

                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-[#009EB4] flex items-center justify-center text-white text-sm font-medium">
                                ✓
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">STEP 02</span>
                        </div>

                        <div className="flex-1 h-px bg-[#009EB4] mx-4"></div>

                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-[#009EB4] flex items-center justify-center text-white text-sm font-medium">
                                ✓
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">STEP 03</span>
                        </div>

                        <div className="flex-1 h-px bg-[#009EB4] mx-4"></div>

                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">
                                4
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-500 hidden sm:inline">STEP 04</span>
                        </div>
                    </div>

                    {/* Back Button */}
                    <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6">
                        <span className="mr-2">←</span>
                        Back to Subscription Plan
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 md:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                         {/* Payment Method Header */}
                            <div className="bg-white rounded-lg p-6 shadow-sm w-full mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-20 h-20 rounded-lg flex items-center justify-center text-white">
                                            <img src="assets/resources/icons/secure.svg" alt='secure-icon' />

                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900">Choose Payment Method</h2>
                                            <p className="text-sm text-gray-600">All transactions are secure and encrypted</p>
                                        </div>
                                    </div>
                                    <button className="bg-[#009EB4] text-white px-4 py-2 rounded-md text-sm hover:bg-opacity-90 transition-colors">
                                        Proceed Payment →
                                    </button>
                                </div>
                            </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Left Column - Privacy Policy */}
                        <div className="space-y-6">
                       

                            {/* What you will get */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">What you will get</h3>
                                <div className="space-y-4">
                                    {privacyPoints.map((point, index) => (
                                        <div key={index} className="text-sm">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-[#009EB4] rounded-full mt-2 flex-shrink-0"></div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900 mb-1">{point.title}</h4>
                                                    <p className="text-gray-600 text-xs leading-relaxed">{point.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Payment Form */}
                        <div className="space-y-6">
                            {/* Selected Plan */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Plan</h3>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm bg-yellow-200 text-yellow-800 px-2 py-1 rounded">You save 100 SAR annually</span>
                                        <button className="text-[#009EB4] text-sm font-medium">Change</button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900">300 AED <span className="text-sm font-normal">Per month</span></h4>
                                            <p className="text-sm text-gray-600">Silver Plan</p>
                                            <p className="text-xs text-gray-500">500 AED billed annually</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>

                                {/* Payment Options */}
                                <div className="space-y-3 mb-6">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="apple"
                                            checked={paymentMethod === 'apple'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 text-[#009EB4]"
                                        />
                                        <span className="text-2xl">🍎</span>
                                        <span className="text-gray-700">Apple Pay</span>
                                    </label>

                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 text-[#009EB4]"
                                        />
                                        <span className="text-2xl">💳</span>
                                        <span className="text-gray-700">Debit/Credit Card</span>
                                        <div className="w-4 h-4 bg-[#009EB4] rounded-full flex items-center justify-center ml-auto">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                    </label>
                                </div>

                                {/* Card Form */}
                                {paymentMethod === 'card' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Card Number
                                            </label>
                                            <input
                                                type="text"
                                                name="number"
                                                value={cardData.number}
                                                onChange={handleCardInput}
                                                placeholder="Enter card details"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-transparent"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    type="text"
                                                    name="expiry"
                                                    value={cardData.expiry}
                                                    onChange={handleCardInput}
                                                    placeholder="MM"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    CVV
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={cardData.cvv}
                                                    onChange={handleCardInput}
                                                    placeholder="YY"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="saveCard"
                                                checked={saveCard}
                                                onChange={(e) => setSaveCard(e.target.checked)}
                                                className="w-4 h-4 text-[#009EB4] rounded"
                                            />
                                            <label htmlFor="saveCard" className="text-sm text-gray-700">
                                                Securely save card details
                                            </label>
                                        </div>

                                        <button className="w-full bg-[#009EB4] text-white py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors">
                                            Proceed Payment
                                        </button>
                                    </div>
                                )}

                                {/* Payment Options */}
                                <div className="mt-6 space-y-2">
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <span className="text-green-500">🟢</span>
                                        <span>Tamby (Split in 4 Interest-Free Payment)</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <span className="text-orange-500">🟠</span>
                                        <span>Tabara (Split in 4 Interest-Free Payment)</span>
                                    </div>
                                </div>

                                {/* Saved Card */}
                                <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Saved Card</h4>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <span>💳</span>
                                        <span>•••• •••• •••• 1234</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}