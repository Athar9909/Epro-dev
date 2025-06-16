import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AppPayment from "../components/AppPayment";
import AppPlans from "../components/AppPlans";

const AppStepFive = ({ setCurrentStep, setVarHeight }) => {
  const [selectedPlan, setSelectedPlan] = useState("gold");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showPaymentView, setShowPaymentView] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("apple");
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
    // setVarHeight("80vh");
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
    <div className="min-h-screen rounded-[16px] ">
      <AnimatePresence>
        {!showPaymentView ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-6xl mx-auto bg-white rounded-[16px]">
              <div className="bg-white px-4 py-5 rounded-tl-[10px] rounded-tr-[10px]">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                    Choose a Plan
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Pick the perfect plan and enjoy exclusive benefits.
                  </p>
                </div>

                {/* <div className="flex justify-center ">
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
                </div> */}
              </div>

              {/* Plans Grid */}
              <AppPlans plans={plans}
                setSelectedPlan={setSelectedPlan}
                selectedPlan={selectedPlan} />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto p-4">
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
          <AppPayment
            paymentSuccess={paymentSuccess}
            handlePaymentSubmit={handlePaymentSubmit}
            isProcessing={isProcessing}
            selectedPlanData={selectedPlanData}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            privacyPoints={privacyPoints}
            setShowPaymentView={setShowPaymentView}
            cardData={cardData}
            billingCycle={billingCycle}
            handleCardInput={handleCardInput}
            saveCard={saveCard}
            setSavedCard={setSaveCard} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppStepFive;
