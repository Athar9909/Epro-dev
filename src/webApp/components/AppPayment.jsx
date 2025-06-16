import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';


const AppPayment = ({ paymentSuccess, handlePaymentSubmit, isProcessing, selectedPlanData, paymentMethod, setPaymentMethod, privacyPoints, setShowPaymentView, cardData, billingCycle, handleCardInput, saveCard, setSaveCard }) => {
    const navigate = useNavigate()
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-screen">
                    <div className="">
                        <div className="max-w-7xl mx-auto relative">
                            <AnimatePresence>
                                {paymentSuccess ? (
                                    <div className='flex w-full h-screen justify-center items-center'>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white rounded-lg p-8 shadow-sm text-center relative top-10 w-11/12 mx-auto">
                                        <div className="rounded-full flex items-center justify-center mx-auto mb-4">
                                            <img
                                                src="/resources/icons/success.svg"
                                                alt="tick-icon"
                                                className='w-30 h-30'
                                            />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            Successful!
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            Your subscription to {selectedPlanData.name} has been
                                            activated. You have successfully purchase standard
                                            Subscription Plan. Now You have some new features.
                                        </p>
                                        <div className="flex space-x-4 mt-6">
                                            <button
                                                type="submit"
                                                onClick={() => navigate("/User-App/Login")}
                                                className={`flex-1  custom-btn text-white text-center pri-btn`}>
                                                Go to Home
                                            </button>
                                        </div>
                                    </motion.div>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white px-4 rounded-[10px] py-4">
                                        {/* Payment Method */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="bg-white">
                                            <div className='p-4'>
                                                <h3 className="text-[20px] font-semibold text-gray-900 mb-4 text-center">
                                                    Payment Method
                                                </h3>
                                                <p className="text-[12px] text-gray-900 mb-4 text-center">
                                                    Secure your access with easy payments. Choose your method and proceed.
                                                </p>
                                            </div>

                                            {/* Payment Options */}
                                            <div className="space-y-3 mb-6">
                                                {/* Apple Pay */}
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.6 }}>
                                                    <h4 className="font-medium text-gray-900 mb-2 text-start">
                                                        UPI Methods
                                                    </h4>
                                                    <motion.div
                                                        whileHover={{ y: -2 }}
                                                        className="w-full px-4 py-2 border border-[#e7e7e7] rounded-[10px]">
                                                        <label className="flex flex-row-reverse items-center justify-between cursor-pointer w-full">
                                                            <input
                                                                type="radio"
                                                                name="payment"
                                                                value="apple"
                                                                checked={paymentMethod === "apple"}
                                                                onChange={(e) =>
                                                                    setPaymentMethod(e.target.value)
                                                                }
                                                                className="w-4 h-4 text-[#009EB4] ml-2"
                                                            />
                                                            <div className="flex items-center space-x-3">
                                                                <motion.span className="text-2xl bg-[#f3f3f3] p-4 rounded-[10px]">
                                                                    <img
                                                                        src="/resources/icons/apple.svg"
                                                                        alt="apple.svg"
                                                                    />
                                                                </motion.span>
                                                                <span className="text-gray-700">
                                                                    Apple Pay
                                                                </span>
                                                            </div>
                                                        </label>
                                                    </motion.div>
                                                </motion.div>

                                                {/* Card Pay */}
                                                <AnimatePresence>
                                                    <motion.div
                                                        key="card-payment"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="w-full px-4 py-2 border border-[#e7e7e7] rounded-[10px]">
                                                        <label className="flex flex-row-reverse items-center justify-between cursor-pointer w-full">
                                                            <input
                                                                type="radio"
                                                                name="payment"
                                                                value="card"
                                                                checked={paymentMethod === "card"}
                                                                onChange={(e) =>
                                                                    setPaymentMethod(e.target.value)
                                                                }
                                                                className="w-4 h-4 text-[#009EB4] ml-2"
                                                            />
                                                            <div className="flex items-center space-x-3">
                                                                <motion.span className="text-2xl bg-[#f3f3f3] p-4 rounded-[10px]">
                                                                    <img
                                                                        src="/resources/icons/card.svg"
                                                                        alt="card.svg"
                                                                    />
                                                                </motion.span>
                                                                <span className="text-gray-700">
                                                                    Debit/Credit Card
                                                                </span>
                                                            </div>
                                                        </label>

                                                        {/* Card Form */}
                                                        <AnimatePresence>
                                                            {paymentMethod === "card" && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3 }}>
                                                                    <hr className="border-[#e5e5e5] my-2 border-t" />
                                                                    <div className="space-y-4 bg-[#EEEFF3] rounded-container p-2 rounded-[10px]">
                                                                        <motion.div
                                                                            initial={{ opacity: 0 }}
                                                                            animate={{ opacity: 1 }}
                                                                            transition={{ delay: 0.1 }}>
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
                                                                                transition={{ delay: 0.15 }}>
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
                                                                                transition={{ delay: 0.2 }}>
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
                                                                            className="flex items-center space-x-2">
                                                                            <input
                                                                                type="checkbox"
                                                                                id="saveCard"
                                                                                checked={saveCard}
                                                                                onChange={(e) =>
                                                                                    setSaveCard(e.target.checked)
                                                                                }
                                                                                className="w-4 h-4 text-[#009EB4] rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="saveCard"
                                                                                className="text-sm text-gray-700">
                                                                                Securely save card details
                                                                            </label>
                                                                        </motion.div>
                                                                        <motion.button
                                                                            whileHover={{ scale: 1.02 }}
                                                                            whileTap={{ scale: 0.98 }}
                                                                            className="w-full bg-[#009EB4] text-white py-3 rounded-[10px] font-medium hover:bg-opacity-90 transition-colors"
                                                                            onClick={handlePaymentSubmit}
                                                                            disabled={isProcessing}>
                                                                            {isProcessing
                                                                                ? "Processing..."
                                                                                : "Proceed Payment →"}
                                                                        </motion.button>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                </AnimatePresence>

                                                {/* Tabby Pay */}
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.6 }}>
                                                    <h4 className="font-medium text-gray-900 mb-2 text-start">
                                                        Other Method
                                                    </h4>
                                                    <motion.div
                                                        whileHover={{ y: -2 }}
                                                        className="w-full px-4 py-2 border border-[#e7e7e7] rounded-[10px] mb-3">
                                                        <label className="flex flex-row-reverse items-center justify-between cursor-pointer w-full ">
                                                            <input
                                                                type="radio"
                                                                name="payment"
                                                                value="tabby"
                                                                checked={paymentMethod === "tabby"}
                                                                onChange={(e) =>
                                                                    setPaymentMethod(e.target.value)
                                                                }
                                                                className="w-4 h-4 text-[#009EB4] ml-2"
                                                            />
                                                            <div className="flex items-center space-x-3">
                                                                <motion.span className="bg-[#f3f3f3] py-4 px-[6px] rounded-[10px]">
                                                                    <img
                                                                        src="/resources/icons/tabby.svg"
                                                                        alt="tabby.svg"
                                                                        className="w-10"
                                                                    />
                                                                </motion.span>
                                                                <span className="text-gray-700">
                                                                    Tabby
                                                                </span>
                                                            </div>
                                                        </label>
                                                    </motion.div>

                                                    {/* Tamara Pay */}
                                                    <motion.div
                                                        whileHover={{ y: -2 }}
                                                        className="w-full px-4 py-2 border border-[#e7e7e7] rounded-[10px]">
                                                        <label className="flex flex-row-reverse items-center justify-between cursor-pointer w-full">
                                                            <input
                                                                type="radio"
                                                                name="payment"
                                                                value="tamara"
                                                                checked={paymentMethod === "tamara"}
                                                                onChange={(e) =>
                                                                    setPaymentMethod(e.target.value)
                                                                }
                                                                className="w-4 h-4 text-[#009EB4] ml-2"
                                                            />
                                                            <div className="flex items-center space-x-3">
                                                                <motion.span className="bg-[#f3f3f3] py-5 px-[6px] rounded-[10px]">
                                                                    <img
                                                                        src="/resources/icons/tamara.svg"
                                                                        alt="tamara.svg"
                                                                        className="w-10"
                                                                    />
                                                                </motion.span>
                                                                <span className="text-gray-700">
                                                                    Tamara
                                                                </span>
                                                            </div>
                                                        </label>
                                                    </motion.div>
                                                </motion.div>
                                            </div>

                                            {/* Saved Card */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.6 }}>
                                                <h4 className="font-medium text-gray-900 mb-2 text-start">
                                                    Saved Card
                                                </h4>
                                                <motion.div
                                                    whileHover={{ y: -2 }}
                                                    className="w-full px-4 py-2 border border-[#e7e7e7] rounded-[10px]">
                                                    <label className="flex flex-row-reverse justify-between items-center cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="payment"
                                                            value="visa"
                                                            checked={paymentMethod === "visa"}
                                                            onChange={(e) =>
                                                                setPaymentMethod(e.target.value)
                                                            }
                                                            className="w-4 h-4 text-[#009EB4]"
                                                        />
                                                        <div className="flex items-center space-x-3">
                                                            <motion.span className=" bg-[#f3f3f3] py-5 px-[16px] rounded-[10px]">
                                                                <img
                                                                    src="/resources/icons/visa.svg"
                                                                    alt="visa.svg"
                                                                />
                                                            </motion.span>
                                                            <span className="text-gray-700">
                                                                *** *** *** 123
                                                            </span>
                                                        </div>
                                                    </label>
                                                </motion.div>
                                            </motion.div>

                                            {/* Continue Button */}
                                            <motion.button
                                                onClick={handlePaymentSubmit}
                                                disabled={isProcessing}
                                                className="bg-[#009EB4] text-white px-4 py-3 rounded-md text-sm hover:bg-opacity-90 transition-colors disabled:opacity-70 w-full mt-10">
                                                {isProcessing ? "Processing..." : "Proceed Payment →"}
                                            </motion.button>
                                        </motion.div>

                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {/* {!paymentSuccess && (
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
                            )} */}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default AppPayment
