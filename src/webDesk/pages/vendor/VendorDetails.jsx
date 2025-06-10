import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendorDetails = () => {
    const [activeTab, setActiveTab] = useState('All Categories');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

  const vendors = [
    { name: 'Al-Karim Co Ltd', des: 'Technolab Solutions', rating: 4.5, id: 'BMT120976', certified: true, type: "Construction" },
    { name: 'Apex Designs LLC', des: 'Technolab Solutions', rating: 4.3, id: '44574632313', certified: true, type: "Construction" },
    { name: 'Technolab Solutions', des: 'Technolab Solutions', rating: 4.7, id: '234487800', certified: true, type: "Construction" }
  ];

    const tabs = ['All Vendor', 'Product', 'Service', 'Rental Service'];

    const VendorCard = ({ vendor }) => (
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-lg">
                        {vendor.logo}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                            {vendor.name}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {vendor.location}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-gray-700">{vendor.rating}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
                <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded">
                    {vendor.type}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    {vendor.subType}
                </span>
            </div>

            <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                    {vendor.certified && (
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-green-600 font-medium">Certified</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                    <span>ID: {vendor.id_number}</span>
                </div>
            </div>
        </div>
    );

    const totalPages = Math.ceil(vendors.length / 15);

    return (
        <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen">
            <div className='bg-white m-6 rounded-btn p-6'>
            {/* Heading */}
            <div className='bg-white mb-8 rounded-btn border border-[#e5e5e5] p-3'>
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Vendor Details
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
                            <span>All Vendor</span>
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
                            <span>Rental</span>
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
                                // value={searchTerm}
                                // onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009EB4] focus:border-transparent"
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

            {/* Vendor Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    vendors.map((vendor, index) => (
                        <Link
                        to="/Dashboard/Vendor-Details/Vendor-Profile"
                         key={index} className="bg-white rounded-lg p-4 border-2 border-[#e5e5e5] hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-12 h-12  flex items-center justify-center">
                                    <img
                                        className="font-semibold"
                                        src="/resources/icons/vendorComp.svg"
                                        alt="vendorComp"
                                    />
                                </div>
                                <div>
                                    <span className="btn-pri text-xs px-2 py-1 mx-1 rounded">Active</span>
                                    <span className="btn-pri text-xs px-2 py-1 rounded">Active</span>
                                    <h4 className="font-medium text-gray-900 mb-1">{vendor.name}</h4>
                                    <h4 className="font-medium text-gray-500 mb-1 text-xs">{vendor.des}</h4>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 mb-2 border-2 border-[#e5e5e5] bg-[#f7f7f7] p-1 rounded-md">
                                        <img
                                            className="font-semibold"
                                            src="/resources/icons/star.svg"
                                            alt="star"
                                        />
                                        <span className="text-sm text-gray-600">{vendor.rating}</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2 mb-2 border-2 border-[#e5e5e5] bg-[#f7f7f7] p-1 rounded-md">
                                        <img
                                            className="font-semibold w-6 h-6"
                                            src="/resources/icons/buildingActive.svg"
                                            alt="buildingActive-icon"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>✓ Certified</span>
                                <span>ID: {vendor.id}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-20">
                <p className="text-sm text-gray-600">
                    Showing 15 out of 59 rows
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-1">
                        {[1, 2, 3].map((page, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 text-sm rounded ${currentPage === page
                                    ? 'bg-[#009EB4] text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <span className="px-2 text-gray-400">...</span>
                        <button
                            onClick={() => setCurrentPage(18)}
                            className="w-8 h-8 text-sm rounded text-gray-600 hover:bg-gray-100"
                        >
                            18
                        </button>
                    </div>

                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm bg-[#009EB4] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next Page
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default VendorDetails;