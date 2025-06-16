import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Heart, Plus, Share2 } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Star, Shield, Truck, Clock, HelpCircle, ChevronDown } from 'lucide-react';

const AppProductDetail = () => {
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [activeTab, setActiveTab] = useState('description');

    const productImages = [
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?w=400&h=400&fit=crop'
    ]

    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'review', label: 'Review' }
    ];

    const specifications = [
        { label: 'Level of practice:', value: 'Beginner' },
        { label: 'Drop:', value: '6 mm' },
        { label: 'Working outside:', value: 'Non marking' },
        { label: 'Running Intensity:', value: 'Support Sea freight' }
    ];

    return (
        <div className="min-h-screen bg-[#f4f4f4]">
            <div className=" overflow-hidden">
                <div className="flex gap-1 justify-between pt-4 px-4 pl-3 bg-transparent items-center">
                    <div className="text-lg bg-[#cbcbcb] text-white w-10 h-10 rounded-full flex justify-center items-center" onClick={() => navigate(-1)}>
                        <ChevronLeft />
                    </div>
                    <div className='flex gap-2'>
                        <div className="text-lg bg-[#cbcbcb] text-white w-10 h-10 rounded-full flex justify-center items-center">
                            <Heart />
                        </div>
                        <div className="text-lg bg-[#cbcbcb] text-white w-10 h-10 rounded-full flex justify-center items-center">
                            <Share2 />
                        </div>
                    </div>
                </div>

                {/* Left Column - Images */}
                <div className="space-y-4 rounded-btn">
                    {/* Main Image */}
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden p-6">
                        <img
                            src={productImages[selectedImage]}
                            alt="Product"
                            className="w-full h-full object-cover rounded-[10px]"
                        />
                    </div>

                    {/* Thumbnail Images */}
                    <div className="flex justify-between gap-2 overflow-x-auto bg-white px-6 py-2">
                        {productImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`flex-shrink-0 w-22 h-22 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-[#e5e5e5]'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column - Product Details */}
                <div className="space-y-6 bg-white p-6 rounded-btn mt-4">
                    {/* Product Info */}
                    <div>
                        <p className="text-sm text-gray-500 mb-2 border border-[#e5e5e5] bg-[#f7f7f7] p-1 rounded-[6px]">Medical | Equipment • Part No. 2023532</p>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                            Gemi Cervical (HOT) Cautery Machine for Gynaec ENT & skin CC-3T
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <img
                                        key={i}
                                        className="w-4 h-4"
                                        src={
                                            i < 4
                                                ? '/resources/icons/star.svg' // filled star
                                                : '/resources/icons/emptyStar.svg' // empty star
                                        }
                                        alt="star"
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">4.6 (24 review)</span>
                        </div>
                    </div>

                    {/* Product Options */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Color Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Colours
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedColor}
                                    onChange={(e) => setSelectedColor(e.target.value)}
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                >
                                    <option value="">Choose Colour</option>
                                    <option value="white">White</option>
                                    <option value="beige">Beige</option>
                                    <option value="gray">Gray</option>
                                </select>
                                {/* <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" /> */}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Size
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                >
                                    <option value="">Select Size</option>
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                </select>
                                {/* <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" /> */}
                            </div>
                        </div>
                    </div>

                    {/* Pricing Options */}
                    <AnimatePresence>
                        <div className="relative overflow-x-scroll">
                            <motion.div
                                className="flex gap-4 py-2 px-4"
                                drag="x"
                                dragConstraints={{ right: 0, left: -600 }} // Adjust based on your content width
                                whileTap={{ cursor: "grabbing" }}
                            >
                                <div className="flex-shrink-0 text-center p-3 rounded-lg bg-[#009EB41A] w-[50vw]">
                                    <div className="text-lg font-bold text-[#009EB4] w-full">$ 104.52</div>
                                    <div className="text-sm text-gray-600">1 - 500 Pieces</div>
                                </div>
                                <div className="flex-shrink-0 text-center p-3 rounded-lg bg-[#009EB41A] w-[50vw]">
                                    <div className="text-lg font-bold text-[#009EB4]">$ 104.52</div>
                                    <div className="text-sm text-gray-600">500 - 1000 Pieces</div>
                                </div>
                                <div className="flex-shrink-0 text-center p-3 rounded-lg bg-[#009EB41A] w-[50vw]">
                                    <div className="text-lg font-bold text-[#009EB4]">$ 104.52</div>
                                    <div className="text-sm text-gray-600">1000 - 5000 Pieces</div>
                                </div>
                            </motion.div>
                        </div>
                    </AnimatePresence>

                    {/* Vendor Details */}
                    <div className="bg-white rounded-lg p-4 border-2 border-[#e5e5e5] hover:shadow-md transition-shadow">
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
                                <h4 className="font-medium text-gray-900 mb-1">Al-Karim Pvt Ltd</h4>
                                <h4 className="font-medium text-gray-500 mb-1 text-xs">Karim Hussain Jannat </h4>
                            </div>
                            <div>
                                <div className="flex items-center space-x-2 mb-2 border-2 border-[#e5e5e5] bg-[#f7f7f7] p-1 rounded-md ">
                                    <img
                                        className="font-semibold"
                                        src="/resources/icons/star.svg"
                                        alt="star"
                                    />
                                    <span className="text-sm text-gray-600">4</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2 mb-2 border-2 border-[#e5e5e5] bg-[#f7f7f7] p-1 rounded-md ">
                                    <img
                                        className="font-semibold w-6 h-6"
                                        src="/resources/icons/buildingActive.svg"
                                        alt="buildingActive-icon"
                                    />
                                </div>
                            </div>
                        </div>



                        <div className="flex items-center justify-between text-xs text-gray-500 w-full gap-2">
                            <button className='bg-[#009eb5] w-full py-1 text-white rounded-[6px]'>✓ Certified</button>
                            <button className='bg-[#009eb5] w-full py-1 text-white rounded-[6px]'>ID: 12345</button>
                        </div>
                    </div >
                </div>

                {/* Tabs Section */}
                <div className="">
                    <div className="flex justify-center items-center">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-4 text-sm font-medium transition-colors bg-white w-full mt-4 ${activeTab === tab.id
                                    ? 'text-[#009eb5] border-b-2 border-[#009eb5]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 '
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 bg-white rounded-bl-2xl rounded-br-2xl">
                        {activeTab === 'description' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-4">Product Specification:</h3>
                                    <div className="space-y-3">
                                        {specifications.map((spec, index) => (
                                            <div key={index} className="flex">
                                                <div className="w-40 text-sm text-gray-600">{spec.label}</div>
                                                <div className="text-sm text-gray-900">{spec.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className=''>
                                    <h3 className="font-semibold text-gray-900 mb-4 ">Description:</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Boba etiam ut tellus leo vel potest ullacorper singulari compassionate sapponum at tristique, quae in Taewan omnis 1980 orta sunt. Boba refert ad
                                        pilus maurasque laoriosum in turpis posus inventas, quae typice lacere leo nigra pharenonunum.
                                        <span className="text-[#009EB4] cursor-pointer hover:underline ml-1">See More...</span>
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'review' && (
                            <div className="text-gray-700">
                                <h3 className="font-semibold text-gray-900 mb-4">Shipping & Payment Information:</h3>
                                <p>Shipping methods, payment options, and delivery information would be displayed here...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4">
                <button className="flex justify-center items-center gap-1 bg-[#009eb4] text-white w-full p-4 rounded-[10px]">
                    <Plus className="w-6 h-6" />
                    <span className="text-xl font-medium">Scope of Work</span>
                </button>
            </div>
        </div>);
};

export default AppProductDetail;