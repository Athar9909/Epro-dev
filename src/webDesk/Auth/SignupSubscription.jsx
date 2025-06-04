import React, { useState } from 'react';

export default function SignupSubscription() {
    const [selectedPlan, setSelectedPlan] = useState('gold');
    const [billingCycle, setBillingCycle] = useState('monthly');

    const plans = [
        {
            id: 'free',
            name: 'Free Plan',
            price: '0 AED',
            period: 'Per month',
            features: [
                'Limited access to features',
                'Product Reviews',
                'No premium support'
            ],
            icon: 'assets/resources/icons/subscriptionPlan.svg',
            bgColor: 'bg-white',
            borderColor: 'border-[#009EB4]'
        },
        {
            id: 'gold',
            name: 'Gold Plan',
            price: '200 AED',
            period: 'Per month',
            features: [
                'Contrary to popular belief',
                'Contrary to popular belief. Lorem ipsum is not is...',
                'Lorem ipsum is simply dummy text of the printing'
            ],
            icon: 'assets/resources/icons/subscriptionPlan.svg',
            bgColor: 'bg-white',
            borderColor: 'border-[#009EB4]',
            recommended: true
        },
        {
            id: 'diamond',
            name: 'Diamond Plan',
            price: '400 AED',
            period: 'Per month',
            features: [
                'Limited access to features',
                'Product Reviews',
                'No premium support'
            ],
            icon: 'assets/resources/icons/subscriptionPlan.svg',
            bgColor: 'bg-white',
            borderColor: 'border-[#009EB4]'
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
                                3
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">STEP 03</span>
                        </div>

                        <div className="flex-1 h-px bg-gray-300 mx-4"></div>

                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">
                                4
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-500 hidden sm:inline">STEP 04</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 md:px-8 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Title and Description */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Subscription Plan
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            Choose the perfect subscription plan and enjoy exclusive benefits.
                        </p>
                    </div>

                    {/* Billing Toggle */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-[#f7f7f7] rounded-lg p-1 shadow-sm border border-[#e5e5e5]">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${billingCycle === 'monthly'
                                    ? 'bg-[#009EB4] text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {/* <img src="assets/resources/icons/filter.svg" alt='filter-icon' /> */}
                                <span>
                                    Monthly
                                </span>
                            </button>
                            <button
                                onClick={() => setBillingCycle('annual')}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${billingCycle === 'annual'
                                    ? 'bg-[#009EB4] text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <span>
                                    Annual
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Plans Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative bg-white rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${selectedPlan === plan.id ? plan.borderColor : 'border-[#e5e5e5]'
                                    } ${plan.recommended ? 'transform scale-105' : ''}`}
                                onClick={() => setSelectedPlan(plan.id)}
                            >
                                {plan.recommended && (
                                    <div className="absolute -z-10 -top-4 left-1/2 transform -translate-x-1/2 w-full">
                                        <div className="bg-[#009EB4] text-white pr-4 pl-2 py-1 rounded-tl-2xl rounded-tr-2xl text-xs flex gap-2 items-center justify-start font-medium">
                                            <img src="assets/resources/icons/percentage.svg" alt='percentage-icon' />
                                            <span>
                                                Recommended
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-6 text-start">
                                    <img src={plan.icon} className="text-4xl mb-4" alt='plan-icon' />
                                    <div className="text-2xl md:text-3xl font-bold text-[#009EB4] mb-1">
                                        {plan.price}
                                        <span className="text-sm text-gray-600 mb-4 pl-1">{plan.period}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Features Included</h4>
                                    <ul className="space-y-2">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start text-sm text-gray-600">
                                                <div className="w-4 h-4 rounded-full bg-[#009EB4] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                    <img src="assets/resources/icons/tick.svg" alt='tick-icon' />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="text-start">
                                    <div className="text-sm text-gray-600 mb-3">See benefits →</div>
                                    <button className="w-full py-2 px-4 border border-[#009EB4] text-[#009EB4] rounded-md hover:bg-[#009EB4] hover:text-white transition-colors">
                                        Choose Plan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors">
                            Back
                        </button>
                        <button className="flex-1 px-6 py-3 bg-[#009EB4] text-white rounded-md font-medium hover:bg-opacity-90 transition-colors">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}