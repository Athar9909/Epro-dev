import { Calendar, ChevronLeft, Clock, FileText, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppNavbar from "../../components/AppNavbar";

const AppCategories = () => {
    const [type, setType] = useState("product")
    const navigate = useNavigate()

    const categories = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 9,
            image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 10,
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 11,
            image: 'https://images.unsplash.com/photo-1619112093798-8d7c16c0e1b1?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 12,
            image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 13,
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 14,
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        },
        {
            id: 15,
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
        }
    ];
    return (
        <>
            <div className="min-h-screen bg-[#f4f4f4]">
                <div className="flex gap-1 py-6 pl-3 bg-white">
                    <ChevronLeft className="text-lg" onClick={() => navigate(-1)} />
                    <p className="text-[16px] font-medium">
                        Categories
                    </p>
                </div>

                {/* Hero Banner */}
                <div className="p-4">
                    <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold mb-2">Find What You Need</h2>
                            <p className="text-sm opacity-90">Browse over 1,000 curated categories to find high quality Products tailored for your business.</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className=" px-4 mb-4">
                    <div className="flex space-x-8">
                        <button className={`py-3 text-gray-500 font-medium ${type === "product" ? 'border-b-2 border-teal-600 text-teal-600' : ''}`} onClick={() => setType("product")} >Products</button>
                        <button className={`py-3 text-gray-500 ${type === "service" ? 'border-b-2 border-teal-600 text-teal-600' : ''}`} onClick={() => setType("service")}>Services</button>
                        <button className={`py-3 text-gray-500 ${type === "rental" ? 'border-b-2 border-teal-600 text-teal-600' : ''}`} onClick={() => setType("rental")}>Rental</button>
                    </div>
                </div>


                {/* Products */}
                {
                    type == "product" &&
                    <div className="px-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Products Categories</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {categories.map((item) => (
                                <Link
                                    to="/User-App/Categories/Sub-Categories"
                                    key={item.id}
                                    className="bg-white rounded-[16px] p-4 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group"
                                >
                                    <div className="">
                                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                                    </div>
                                    <div className={`bg-white h-32 sm:h-36 flex items-center justify-center`}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-[16px] group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                }

                {/* service */}
                {
                    type == "service" &&
                    <div className="px-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Categories</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {categories.map((item) => (
                                <Link
                                    to="/User-App/Categories/Sub-Categories"
                                    key={item.id}
                                    className="bg-white rounded-[16px] p-4 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group"
                                >
                                    <div className="">
                                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                                    </div>
                                    <div className={`bg-white h-32 sm:h-36 flex items-center justify-center`}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-[16px] group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                }
                {/*  Rental*/}
                {
                    type == "rental" &&
                    <div className="px-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rental Categories</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {categories.map((item) => (
                                <Link
                                    to="/User-App/Categories/Sub-Categories"
                                    key={item.id}
                                    className="bg-white rounded-[16px] p-4 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group"
                                >
                                    <div className="">
                                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                                    </div>
                                    <div className={`bg-white h-32 sm:h-36 flex items-center justify-center`}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-[16px] group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                }

                <AppNavbar />
            </div>
        </>
    )
};

export default AppCategories;