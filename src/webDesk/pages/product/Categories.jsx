import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [activeTab, setActiveTab] = useState('All Categories');
    const [searchTerm, setSearchTerm] = useState('');

    const tabs = ['All Categories', 'Product', 'Service', 'Rental Service'];

    // Dummy data for the equipment categories
    const equipmentData = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 9,
            image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 10,
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 11,
            image: 'https://images.unsplash.com/photo-1619112093798-8d7c16c0e1b1?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 12,
            image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 13,
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 14,
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        },
        {
            id: 15,
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
            category: 'Medical / Equipment',
            title: 'Diagnostic Equipment',
            color: 'bg-[#fff]'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-[#f7f7f7]">
            <div className='bg-white mb-8 p-6 rounded-btn'>
                {/* Heading */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Categories Details
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        We found 140 amazing properties that match your search.
                    </p>
                </div>

                {/* Navigation and Search */}
                <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-2">
                    {/* Tabs */}
                    <div className="flex bg-[#F5F7F9] border border-[#e5e5e5] rounded-lg p-1 w-full lg:w-1/2">
                        <button
                            onClick={() => setActiveTab('All Categories')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'All Categories'
                                ? 'bg-white text-[#009EB4] shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            {
                                activeTab === "All Categories" ?
                                    <img src='/resources/icons/filter.svg' alt='phone.svg' />
                                    :
                                    ""
                            }
                            <span>All Categories</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Product')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'Product'
                                ? 'bg-white text-[#009EB4] shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <span>Product</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Service')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'Service'
                                ? 'bg-white text-[#009EB4] shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <span>Service</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Rental Service')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'Rental Service'
                                ? 'bg-white text-[#009EB4] shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <span>Rental Service</span>
                        </button>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex gap-3">
                        <div className="relative flex-1 lg:w-80">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search here"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-md w-full sm:w-auto justify-center border border-[#e5e5e5] bg-white"
                        > <img
                                className="font-semibold w-fit"
                                src="/resources/icons/filter.svg"
                                alt="filter"
                            />
                            Filters
                        </button>
                    </div>
                </div>

            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
                {equipmentData.map((item) => (
                    <Link
                    to="/Dashboard/Categories/Sub-Categories"
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

            {/* Load More Button */}
            {/* <div className="flex justify-center mt-8">
                <button className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium">
                    Load More Results
                </button>
            </div> */}
        </div>
    );
};

export default Categories;