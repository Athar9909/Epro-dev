import React, { useState } from 'react';
// import { Star, Shield, Truck, Clock, HelpCircle, ChevronDown } from 'lucide-react';

const ProductDetail = () => {
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
        { id: 'technical', label: 'Technical Details' },
        { id: 'attachments', label: 'Attachments' },
        { id: 'shipping', label: 'Shipping & Payments' },
        { id: 'reviews', label: 'Reviews (18)' },
        { id: 'ask', label: 'Ask about product' }
    ];

    const specifications = [
        { label: 'Level of practice:', value: 'Beginner' },
        { label: 'Drop:', value: '6 mm' },
        { label: 'Working outside:', value: 'Non marking' },
        { label: 'Running Intensity:', value: 'Support Sea freight' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className=" mx-auto p-4">
                {/* Header Buttons */}
                <div className="flex items-center gap-4 justify-end mb-4">
                    <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1 bg-[#F4C63B] p-2 rounded-md">
                            <img
                                className="font-semibold"
                                src="/resources/icons/quote.svg"
                                alt="quote"
                            />
                            Quote (01)
                        </div>
                        <div className="flex items-center gap-1 bg-[#009EB4] p-2 rounded-md">
                            <img
                                className="font-semibold"
                                src="/resources/icons/bag.svg"
                                alt="bag"
                            />
                            PR (01)
                        </div>
                    </div>
                </div>

                <div className=" overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Images */}
                        <div className="space-y-4 bg-white p-6 rounded-btn">
                            {/* Main Image */}
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={productImages[selectedImage]}
                                    alt="Product"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Thumbnail Images */}
                            <div className="flex gap-2 overflow-x-auto">
                                {productImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-[#e5e5e5]'
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
                        <div className="space-y-6 bg-white p-6 rounded-btn">
                            {/* Product Info */}
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Medical | Equipment • Part No. 2023532</p>
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="text-center p-3 rounded-lg bg-[#009EB41A]">
                                    <div className="text-lg font-bold text-[#009EB4]">$ 104.52</div>
                                    <div className="text-sm text-gray-600">1 - 500 Pieces</div>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-[#009EB41A]">
                                    <div className="text-lg font-bold text-[#009EB4]">$ 104.52</div>
                                    <div className="text-sm text-gray-600">500 - 1000 Pieces</div>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-[#009EB41A]">
                                    <div className="text-lg font-bold text-[#009EB4]">$ 104.52</div>
                                    <div className="text-sm text-gray-600">1000 - 5000 Pieces</div>
                                </div>
                            </div>

                            {/* Vendor Details */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Vendor Details</h3>
                                <div className="flex items-center gap-3 p-3 border-2 border-[#e5e5e5] rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl bg-[#f3f3f3] p-4 rounded-btn">
                                            <img src='/resources/icons/nafat.svg' alt='nafat.svg' />
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500">✓ Certified Vendor</p>
                                        <p className="font-medium text-gray-900">Al-Karim Pvt Ltd</p>
                                    </div>
                                    <button className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-md text-sm font-medium">
                                        View Profile →
                                    </button>
                                </div>
                            </div>

                            {/* Add to Scope Button */}
                            <button className="w-full py-4 bg-[#009EB4] text-white rounded-lg font-semibold text-lg transition-colors">
                                <span className='flex items-center justify-center gap-2'>
                                    <img
                                        className="font-semibold"
                                        src="/resources/icons/addWhite.svg"
                                        alt="add-icon"
                                    />
                                    Add to Scope of Work
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Features Row */}
                    <div className="">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
                            <div className="flex items-start justify-center flex-col pl-4 bg-white border-2 h-28 rounded-btn border-[#e5e5e5]">
                                <img
                                    className="font-semibold w-8"
                                    src="/resources/icons/card.svg"
                                    alt="card-icon"
                                />
                                <p className=" font-light text-gray-700 text-lg">Safety payment</p>
                            </div>
                            <div className="flex items-start justify-center flex-col pl-4 bg-white border-2 h-28 rounded-btn border-[#e5e5e5]">
                                <img
                                    className="font-semibold w-8"
                                    src="/resources/icons/document.svg"
                                    alt="document-icon"
                                />
                                <p className=" font-light text-gray-700 text-lg">More than 5k stationary shops</p>
                            </div>
                            <div className="flex items-start justify-center flex-col pl-4 bg-white border-2 h-28 rounded-btn border-[#e5e5e5]">
                                <img
                                    className="font-semibold w-8"
                                    src="/resources/icons/truck.svg"
                                    alt="truck-icon"
                                />
                                <p className=" font-light text-gray-700 text-lg mt-2">with-in 2-3 business days</p>
                            </div>
                            <div className="flex items-start justify-center flex-col pl-4 bg-white border-2 h-28 rounded-btn border-[#e5e5e5]">
                                <img
                                    className="font-semibold w-8"
                                    src="/resources/icons/info.svg"
                                    alt="info-icon"
                                />
                                <p className=" font-light text-gray-700 text-lg my-1">Safety payment</p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="">
                        <div className="flex flex-wrap ">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? 'bg-[#009EB4] rounded-tl-2xl rounded-tr-2xl text-[#fff]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
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

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-4">Description:</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            Boba etiam ut tellus leo vel potest ullacorper singulari compassionate sapponum at tristique, quae in Taewan omnis 1980 orta sunt. Boba refert ad
                                            pilus maurasque laoriosum in turpis posus inventas, quae typice lacere leo nigra pharenonunum.
                                            <span className="text-[#009EB4] cursor-pointer hover:underline ml-1">See More...</span>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'technical' && (
                                <div className="text-gray-700">
                                    <h3 className="font-semibold text-gray-900 mb-4">Technical Specifications:</h3>
                                    <p>Detailed technical information would be displayed here...</p>
                                </div>
                            )}

                            {activeTab === 'attachments' && (
                                <div className="text-gray-700">
                                    <h3 className="font-semibold text-gray-900 mb-4">Product Attachments:</h3>
                                    <p>Product manuals, certificates, and other documents would be listed here...</p>
                                </div>
                            )}

                            {activeTab === 'shipping' && (
                                <div className="text-gray-700">
                                    <h3 className="font-semibold text-gray-900 mb-4">Shipping & Payment Information:</h3>
                                    <p>Shipping methods, payment options, and delivery information would be displayed here...</p>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="text-gray-700">
                                    <h3 className="font-semibold text-gray-900 mb-4">Customer Reviews (18):</h3>
                                    <p>Customer reviews and ratings would be displayed here...</p>
                                </div>
                            )}

                            {activeTab === 'ask' && (
                                <div className="text-gray-700">
                                    <h3 className="font-semibold text-gray-900 mb-4">Ask About This Product:</h3>
                                    <p>Contact form or inquiry options would be displayed here...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;