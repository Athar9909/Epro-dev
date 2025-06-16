import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronLeft, Home, Calendar, FileText, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppPopUp from '../components/AppPopUp';
import AppNavbar from '../components/AppNavbar';

const AppSubCategories = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // const tabs = ['All Categories', 'Product', 'Service', 'Rental Service'];

    // Dummy data for the equipment categories
    const equipmentData = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment'
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment'
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment'
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment'
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment'
        },
        {
            id: 9,
            image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment'
        },
        {
            id: 10,
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment'
        }
    ];

    return (
        <>
            <div className="max-w-7xl mx-auto h-screen overflow-hidden">
                {/* Heading */}
                <div className="flex gap-1 py-6 pl-3 bg-white">
                    <ChevronLeft className="text-lg" onClick={() => navigate(-1)} />
                    <p className="text-[16px] font-medium">
                        Medical Equipments
                    </p>
                </div>

                <div className='flex'>
                    {/* Left-Grid */}
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className={`grid grid-cols-1 gap-2 w-[30%] mr-auto py-4 overflow-y-auto h-[100vh]
                        `}>
                            {equipmentData.map((item, index) => (
                                <div className={`${activeTab == item.id ? "bg-[#e8f7f3] rounded-tr-[10px] rounded-br-[10px] p-1 text-[#009EB4]" : ''} px-4`}>
                                    <button
                                        key={item.id}
                                        className={`w-24 h-30 text-center transition-shadow duration-300 cursor-pointer group
                                    `}
                                        onClick={() => setActiveTab(item.id)}
                                    >
                                        <div className={`h-20 flex items-center justify-center`}>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className=" object-cover rounded-[10px] transition-transform duration-300"
                                            />
                                        </div>
                                        <h3 className="text-sm sm:text-base font-semibold transition-colors">
                                            {item.title}
                                        </h3>
                                    </button>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                    {/* right-grid */}
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-2 gap-2 w-[70%] ml-auto h-fit px-6 py-4 items-center justify-center">
                            {equipmentData.map((item) => (
                                <Link
                                    to="/User-App/Products"
                                    key={item.id}
                                    className="w-26 h-26 text-center transition-shadow duration-300 overflow-hidden cursor-pointer group"
                                >
                                    <div className={`h-20 flex items-center justify-center`}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className=" object-cover rounded-[16px] transition-transform duration-300"
                                        />
                                    </div>
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                                        {item.title}
                                    </h3>
                                </Link>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <AppNavbar />
            </div>

            {/* <AppPopUp
                type="bottomPopup"
                btnTwo="Continue"
                heading="Choose an option to create a 
SOW(Score of Work)?"
                options={{
                    optionOne: "Create With Standard Template",
                    optionTwo: "Create Your Own SOW"
                }}
                setIsCompleted={setIsCompleted}
            /> */}

            {/* <AppPopUp
                type="alert"
                heading="Alert!"
                des="You need to submit a request to view your all recent transaction. Do yoi want to send a request to your heads?"
                btnOne="No Need"
                btnTwo="Send Request" /> */}

            {/* <AppPopUp
            type={"fullScreenPopup"}
                url={"/resources/icons/success.svg"}
                btnTwo={"Try Again"}
                heading={"Meeting Creation Failed"}
                des={"We couldn’t schedule your meeting. Please try again or check the details."} /> */}
        </>
    );
};

export default AppSubCategories;