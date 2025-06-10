import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommNote from "./CommNote";
import { Download } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const StepFive = ({ setCurrentStep, setVarHeight }) => {
  const [selectedPlan, setSelectedPlan] = useState("gold");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showPaymentView, setShowPaymentView] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [saveCard, setSaveCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      id: "free",
      name: "Free Plan",
      price: billingCycle === "monthly" ? "0 AED" : "0 AED",
      period: billingCycle === "monthly" ? "Per month" : "Per year",
      features: [
        "Limited access to features",
        "Product Reviews",
        "No premium support",
      ],
      icon: "/resources/icons/subscriptionPlan.svg",
      bgColor: "bg-white",
      borderColor: "border-[#009EB4]",
    },
    {
      id: "gold",
      name: "Gold Plan",
      price: billingCycle === "monthly" ? "200 AED" : "1800 AED",
      period: billingCycle === "monthly" ? "Per month" : "Per year",
      savings: billingCycle === "annual" ? "Save 600 AED" : "",
      features: [
        "Full access to all features",
        "Priority customer support",
        "Advanced analytics dashboard",
      ],
      icon: "/resources/icons/subscriptionPlan.svg",
      bgColor: "bg-white",
      borderColor: "border-[#009EB4]",
      recommended: true,
    },
    {
      id: "diamond",
      name: "Diamond Plan",
      price: billingCycle === "monthly" ? "400 AED" : "3600 AED",
      period: billingCycle === "monthly" ? "Per month" : "Per year",
      savings: billingCycle === "annual" ? "Save 1200 AED" : "",
      features: [
        "All Gold features plus",
        "Dedicated account manager",
        "Early access to new features",
      ],
      icon: "/resources/icons/subscriptionPlan.svg",
      bgColor: "bg-white",
      borderColor: "border-[#009EB4]",
    },
  ];

  const handleCardInput = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setVarHeight("80vh");
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const privacyPoints = [
    {
      title: "1. Use of your personal data",
      description:
        "The personal data you share with us is stored and encrypted across our secure systems.",
    },
    {
      title: "2. Data retention period",
      description:
        "Your personal data will only stay for as long as necessary to fulfill the purposes for which it was collected.",
    },
    {
      title: "3. Third parties",
      description:
        "We may share your personal data with trusted third parties to assist in providing our services.",
    },
    {
      title: "4. User rights",
      description:
        "You have the right to access, correct, or delete your personal data at any time.",
    },
  ];

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {!showPaymentView ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 md:px-8 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white px-4 py-5 mb-8 rounded-2xl">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                    Subscription Plan
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Choose the perfect subscription plan and enjoy exclusive
                    benefits.
                  </p>
                </div>

                <div className="flex justify-center ">
                  <div className="bg-[#f7f7f7] rounded-lg p-1 shadow-sm border border-[#e5e5e5]">
                    <button
                      onClick={() => setBillingCycle("monthly")}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${billingCycle === "monthly"
                          ? "bg-[#009EB4] text-white"
                          : "text-gray-600 hover:text-gray-900"
                        }`}>
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle("annual")}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${billingCycle === "annual"
                          ? "bg-[#009EB4] text-white"
                          : "text-gray-600 hover:text-gray-900"
                        }`}>
                      Annual
                    </button>
                  </div>
                </div>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ y: -5 }}
                    className={`relative bg-white rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${selectedPlan === plan.id
                        ? plan.borderColor
                        : "border-[#e5e5e5]"
                      } ${plan.recommended ? "transform scale-105" : ""}`}
                    onClick={() => setSelectedPlan(plan.id)}>
                    {plan.recommended && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -z-10 -top-4 left-1/2 transform -translate-x-1/2 w-[101%]">
                        <div className="bg-[#009EB4] text-white pr-4 pl-2 py-1 rounded-tl-2xl rounded-tr-2xl text-xs flex gap-2 items-center justify-start font-medium">
                          <img
                            src="/resources/icons/percentage.svg"
                            alt="percentage-icon"
                          />
                          <span>Recommended</span>
                        </div>
                      </motion.div>
                    )}

                    {plan.savings && (
                      <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {plan.savings}
                      </div>
                    )}

                    <div className="mb-6 text-start">
                      <img
                        src={plan.icon}
                        className="text-4xl mb-4"
                        alt="plan-icon"
                      />
                      <div className="text-2xl md:text-3xl font-bold text-[#009EB4] mb-1">
                        {plan.price}
                        <span className="text-sm text-gray-600 mb-4 pl-1">
                          {plan.period}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {plan.name}
                      </h3>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Features Included
                      </h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start text-sm text-gray-600">
                            <div className="w-4 h-4 rounded-full bg-[#009EB4] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <img
                                src="/resources/icons/tick.svg"
                                alt="tick-icon"
                              />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-start">
                      <div className="text-sm text-gray-600 mb-3">
                        See benefits →
                      </div>
                      <button
                        className={`w-full py-2 px-4 border rounded-md transition-colors ${selectedPlan === plan.id
                            ? "bg-[#009EB4] text-white border-[#009EB4]"
                            : "border-[#009EB4] text-[#009EB4] hover:bg-[#009EB4] hover:text-white"
                          }`}>
                        {selectedPlan === plan.id ? "Selected" : "Choose Plan"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowPaymentView(true);
                    setVarHeight("150vh");
                  }}
                  className="flex-1 px-6 py-3 bg-[#009EB4] text-white rounded-md font-medium hover:bg-opacity-90 transition-colors">
                  Continue
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gray-50">
            <div className="px-4 md:px-8 py-8">
              <div className="max-w-7xl mx-auto">
                {!paymentSuccess && (
                  <div className="bg-white rounded-lg p-6 shadow-sm w-full mb-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <div className="flex items-center space-x-3 mb-4 md:mb-0">
                        <div className="w-16 h-16 rounded-lg flex items-center justify-center text-white">
                          <img
                            src="/resources/icons/secure.svg"
                            alt="secure-icon"
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">
                            Choose Payment Method
                          </h2>
                          <p className="text-sm text-gray-600">
                            All transactions are secure and encrypted
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handlePaymentSubmit}
                        disabled={isProcessing}
                        className="bg-[#009EB4] text-white px-4 py-2 rounded-md text-sm hover:bg-opacity-90 transition-colors disabled:opacity-70">
                        {isProcessing ? "Processing..." : "Proceed Payment →"}
                      </button>
                    </div>
                  </div>
                )}

                <AnimatePresence>
                  {paymentSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg p-8 shadow-sm text-center  items-center relative top-10">
                      <div className="rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-40 h-40 rounded-full bg-[#009EB4] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <img
                            src="/resources/icons/paySuccess.svg"
                            alt="tick-icon"
                          />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Payment Successful!
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Your subscription to {selectedPlanData.name} has been
                        activated. You have successfully purchase standard
                        Subscription Plan. Now You have some new features.
                      </p>
                      <div className="flex space-x-4 mt-6">
                        <Link className="flex custom-btn bg-gray-100 text-gray-800 gap-2">
                          <Download />
                          Download invoice
                        </Link>
                        <button
                          type="submit"
                          onClick={() => navigate("/UserLogin")}
                          className={`flex-1  custom-btn text-white text-center ${"bg-[#009EB4] hover:bg-teal-600"}`}>
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            What you will get
                          </h3>
                          <div className="space-y-4">
                            {privacyPoints.map((point, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-sm">
                                <div className="flex items-start space-x-3">
                                  <div className="w-2 h-2 bg-[#009EB4] rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-1">
                                      {point.title}
                                    </h4>
                                    <p className="text-gray-600 text-xs leading-relaxed">
                                      {point.description}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Selected Plan
                          </h3>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              {selectedPlanData.savings && (
                                <span className="text-sm bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                                  {selectedPlanData.savings}
                                </span>
                              )}
                              <button
                                onClick={() => setShowPaymentView(false)}
                                className="text-[#009EB4] text-sm font-medium">
                                Change
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-xl font-bold text-gray-900">
                                  {selectedPlanData.price}{" "}
                                  <span className="text-sm font-normal">
                                    {selectedPlanData.period}
                                  </span>
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {selectedPlanData.name}
                                </p>
                                {billingCycle === "annual" && (
                                  <p className="text-xs text-gray-500">
                                    {selectedPlanData.price.replace(/\D/g, "") /
                                      12}{" "}
                                    AED billed monthly
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Payment Method */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="bg-white rounded-lg p-6 shadow-sm"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>

                          {/* Payment Options */}
                          <div className="space-y-3 mb-6">
                            {/* Apple Pay */}
                            <motion.div
                              whileHover={{ y: -2 }}
                              className='w-full px-4 py-2 border border-[#e7e7e7] rounded-btn'
                            >
                              <label className="flex flex-row-reverse items-center justify-between cursor-pointer w-full">
                                <input
                                  type="radio"
                                  name="payment"
                                  value="apple"
                                  checked={paymentMethod === 'apple'}
                                  onChange={(e) => setPaymentMethod(e.target.value)}
                                  className="w-4 h-4 text-[#009EB4] ml-2"
                                />
                                <div className="flex items-center space-x-3">
                                  <motion.span
                                    className="text-2xl bg-[#f3f3f3] p-4 rounded-btn"
                                  >
                                    <img src='/resources/icons/apple.svg' alt='apple.svg' />
                                  </motion.span>
                                  <span className="text-gray-700">Apple Pay</span>
                                </div>
                              </label>
                            </motion.div>

                            {/* Card Pay */}
                            <AnimatePresence>
                              <motion.div
                                key="card-payment"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='w-full px-4 py-2 border border-[#e7e7e7] rounded-btn'
                              >
                                <label className="flex flex-row-reverse items-center justify-between cursor-pointer w-full">
                                  <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-4 h-4 text-[#009EB4] ml-2"
                                  />
                                  <div className="flex items-center space-x-3">
                                    <motion.span

                                      className="text-2xl bg-[#f3f3f3] p-4 rounded-btn"
                                    >
                                      <img src='/resources/icons/card.svg' alt='card.svg' />
                                    </motion.span>
                                    <span className="text-gray-700">Debit/Credit Card</span>
                                  </div>
                                </label>

                                {/* Card Form */}
                                <AnimatePresence>
                                  {paymentMethod === 'card' && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <hr className='border-[#e5e5e5] my-2 border-t' />
                                      <div className="space-y-4 bg-[#e5e5e5] p-6 rounded-container mx-6 mt-2">
                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 0.1 }}
                                        >
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Card Number
                                          </label>
                                          <input
                                            type="text"
                                            name="number"
                                            value={cardData.number}
                                            onChange={handleCardInput}
                                            placeholder="Enter card details"
                                            className="w-full px-4 py-3 border border-[#e7e7e7] bg-white rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-transparent"
                                          />
                                        </motion.div>
                                        <div className="grid grid-cols-2 gap-4">
                                          <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.15 }}
                                          >
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                              Expiry Date
                                            </label>
                                            <input
                                              type="text"
                                              name="expiry"
                                              value={cardData.expiry}
                                              onChange={handleCardInput}
                                              placeholder="MM"
                                              className="w-full px-4 py-3 border border-[#e7e7e7] bg-white rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-transparent"
                                            />
                                          </motion.div>
                                          <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                          >
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                              CVV
                                            </label>
                                            <input
                                              type="text"
                                              name="cvv"
                                              value={cardData.cvv}
                                              onChange={handleCardInput}
                                              placeholder="YY"
                                              className="w-full px-4 py-3 border border-[#e7e7e7] bg-white rounded-md focus:ring-2 focus:ring-[#009EB4] focus:border-transparent"
                                            />
                                          </motion.div>
                                        </div>
                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 0.25 }}
                                          className="flex items-center space-x-2"
                                        >
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
                                        </motion.div>
                                        <motion.button
                                          whileHover={{ scale: 1.02 }}
                                          whileTap={{ scale: 0.98 }}
                                          className="w-full bg-[#009EB4] text-white py-3 rounded-btn font-medium hover:bg-opacity-90 transition-colors"
                                          onClick={handlePaymentSubmit}
                                          disabled={isProcessing}>
                                          {isProcessing ? "Processing..." : "Proceed Payment →"}
                                        </motion.button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            </AnimatePresence>

                            {/* Tabby Pay */}
                            <motion.div
                              whileHover={{ y: -2 }}
                              className='w-full px-4 py-2 border border-[#e7e7e7] rounded-btn'
                            >
                              <label className="flex flex-row-reverse items-center justify-between cursor-pointer w-full">
                                <input
                                  type="radio"
                                  name="payment"
                                  value="tabby"
                                  checked={paymentMethod === 'tabby'}
                                  onChange={(e) => setPaymentMethod(e.target.value)}
                                  className="w-4 h-4 text-[#009EB4] ml-2"
                                />
                                <div className="flex items-center space-x-3">
                                  <motion.span
                                    className="bg-[#f3f3f3] py-4 px-[6px] rounded-btn"
                                  >
                                    <img src='/resources/icons/tabby.svg' alt='tabby.svg' className='w-10' />
                                  </motion.span>
                                  <span className="text-gray-700">Tabby (Split in 4 Interest-Free Payment)</span>
                                </div>
                              </label>
                            </motion.div>

                            {/* Tamara Pay */}
                            <motion.div
                              whileHover={{ y: -2 }}
                              className='w-full px-4 py-2 border border-[#e7e7e7] rounded-btn'
                            >
                              <label className="flex flex-row-reverse items-center justify-between cursor-pointer w-full">
                                <input
                                  type="radio"
                                  name="payment"
                                  value="tamara"
                                  checked={paymentMethod === 'tamara'}
                                  onChange={(e) => setPaymentMethod(e.target.value)}
                                  className="w-4 h-4 text-[#009EB4] ml-2"
                                />
                                <div className="flex items-center space-x-3">
                                  <motion.span
                                    className="bg-[#f3f3f3] py-5 px-[6px] rounded-btn"
                                  >
                                    <img src='/resources/icons/tamara.svg' alt='tamara.svg' className='w-10' />
                                  </motion.span>
                                  <span className="text-gray-700">Tamara (Split in 4 Interest-Free Payment)</span>
                                </div>
                              </label>
                            </motion.div>
                          </div>

                          {/* Saved Card */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <h4 className="font-medium text-gray-900 mb-2">Saved Card</h4>
                            <motion.div
                              whileHover={{ y: -2 }}
                              className='w-full px-4 py-2 border border-[#e7e7e7] rounded-btn'
                            >
                              <label className="flex flex-row-reverse justify-between items-center cursor-pointer">
                                <input
                                  type="radio"
                                  name="payment"
                                  value="visa"
                                  checked={paymentMethod === 'visa'}
                                  onChange={(e) => setPaymentMethod(e.target.value)}
                                  className="w-4 h-4 text-[#009EB4]"
                                />
                                <div className="flex items-center space-x-3">
                                  <motion.span
                                    className=" bg-[#f3f3f3] py-5 px-[16px] rounded-btn"
                                  >
                                    <img src='/resources/icons/visa.svg' alt='visa.svg' />
                                  </motion.span>
                                  <span className="text-gray-700">*** *** *** 123</span>
                                </div>
                              </label>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StepFive;