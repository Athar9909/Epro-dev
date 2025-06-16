import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const AppPlans = ({ plans, selectedPlan, setSelectedPlan }) => {
    // Enhanced plans data with more realistic features
    const enhancedPlans = [
        {
            id: "free",
            name: "Free Plan",
            price: "0 AED",
            period: "/mo",
            subtitle: "Basic Access",
            features: [
                "Limited Access To Features",
                "Basic Customer Support",
                "Standard Analytics",
                "Email Support Only"
            ],
            icon: "/resources/icons/subscriptionPlan.svg",
            recommended: false
        },
        {
            id: "gold",
            name: "Gold Plan",
            price: "300 AED",
            period: "/mo",
            subtitle: "Unlock Full Potential",
            features: [
                "Limited Access To Features",
                "Priority Customer Support",
                "Priority Customer Support",
                "Limited Access To Features",
                "Priority Customer Support",
                "Limited Access To Features"
            ],
            icon: "/resources/icons/subscriptionPlan.svg",
            recommended: true
        },
        {
            id: "diamond",
            name: "Diamond Plan",
            price: "500 AED",
            period: "/mo",
            subtitle: "Premium Experience",
            features: [
                "Full Access To All Features",
                "Dedicated Account Manager",
                "Advanced Analytics Dashboard",
                "24/7 Priority Support",
                "Early Access To New Features",
                "Custom Integration Support"
            ],
            icon: "/resources/icons/subscriptionPlan.svg",
            recommended: false
        }
    ];

    const plansToUse = enhancedPlans.length > 0 ? enhancedPlans : plans;

    return (
        <div className="w-full">
            <AnimatePresence>
                <div className="flex gap-6 overflow-x-auto pb-4 px-4 scrollbar-hide">
                    <style jsx>{`
                        .scrollbar-hide {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>

                    {plansToUse.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            // initial={{ opacity: 0, y: 20 }}
                            // animate={{ opacity: 1, y: 0 }}
                            // transition={{ delay: index * 0.1 }}
                            // whileHover={{ y: -5 }}
                            className={`relative flex-shrink-0 w-80 overflow-hidden cursor-pointer transition-all duration-300  h-fit`}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {/* Background gradient */}
                            <div className={`${selectedPlan === plan.id ? 'bg-[#009EB4] text-white' : 'bg-white border border-[#e5e5e5]  text-gray-900'} rounded-2xl p-6 overflow-hidden shadow-md hover:shadow-xl`}>
                                {/* Recommended badge */}
                                {plan.recommended && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute top-0 right-0 w-42 bg-[#F4C63B] rounded-bl-2xl rounded-tr-2xl px-3 py-2  text-xl font-bold"
                                    >
                                        Most Popular
                                    </motion.div>
                                )}

                                {/* Decorative elements */}
                                {/* <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full translate-y-12 -translate-x-12"></div> */}

                                {/* Plan header */}
                                <div className="relative z-10 mb-6">
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <p className="text-opacity-90 text-sm">{plan.subtitle}</p>
                                </div>

                                {/* Price */}
                                <div className="relative z-10 mb-8">
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-bold">{plan.price.split(' ')[0]}</span>
                                        <span className="text-lg ml-1">{plan.period}</span>
                                    </div>
                                    <p className="text-opacity-75 text-sm mt-1">Excl. Vat</p>
                                    <p className="text-opacity-90 text-sm mt-2">
                                        Lorem Ipsum is simply dummy text of the printing and type setting.
                                    </p>
                                </div>

                                {/* Select button */}
                                <button
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${selectedPlan === plan.id
                                            ? 'bg-white text-gray-900 shadow-lg'
                                            : 'bg-[#009EB4] bg-opacity-20 text-white hover:bg-opacity-30'
                                        }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPlan(plan.id);
                                    }}
                                >
                                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                                </button>
                                {/* Features section */}
                                <div className={`${selectedPlan === plan.id ? 'bg-[#009EB4]' : 'bg-white'} px-2 py-6`}>
                                    <h4 className="font-bold  mb-4 text-lg">Features Included :</h4>
                                    <div className="space-y-3">
                                        {plan.features.map((feature, featureIndex) => (
                                            <motion.div
                                                key={featureIndex}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                                                className="flex items-start text-sm"
                                            >
                                                <span className="leading-relaxed pl-1">{feature}</span>
                                                {featureIndex < 2 && (
                                                    <span className="ml-auto bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
                                                        NEW
                                                    </span>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </AnimatePresence>

            {/* Scroll indicator */}
            <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                    {plansToUse.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${index === 0 ? 'bg-[#009EB4]' : ''
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppPlans;