import React, { useState } from 'react';
import { Star, MapPin, Phone, Mail, Award, ChevronDown, ChevronUp, Plus, Minus, ChevronRight, ChevronLeft, Share2 } from 'lucide-react';

const AppVendorDetails = () => {
    const [expandedCategory, setExpandedCategory] = useState('Technology');
    const [activeTab, setActiveTab] = useState("Categories")
    const toggleCategory = (category) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    return (
        <div className=" bg-[#f4f4f4] min-h-screen ">
            {/* Company Image */}
            <div className="relative">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop"
                    alt="Company Building"
                    className="w-full h-48 object-cover"
                />
                <div className=' absolute top-4 left-4 text-white w-12 flex justify-center items-center h-12 bg-[#27272780] bg-blur-sm rounded-full'>
                    <ChevronLeft />
                </div>
                <div className=' absolute top-4 right-4 text-white w-12 flex justify-center items-center h-12 bg-[#27272780] bg-blur-lg rounded-full'>
                    <Share2 />
                </div>
            </div>

            {/* Company Info */}
            <div className="px-4 py-4 rounded-tl-[16px] rounded-tr-[16px] mb-6 bg-white">
                <div className="flex items-center mb-2">
                    <div className="flex text-[#F4C63B] mr-2">
                        {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                        <Star className="w-4 h-4 text-[#A8A8A8]" />
                    </div>
                    <span className="text-sm text-[#272727]">4.5/5 (39 reviews)</span>
                    <span className="ml-auto text-sm text-[#A8A8A8]">ID: 89765678</span>
                </div>

                <h1 className="text-2xl font-bold text-[#272727] mb-2">Jannat Pvt Ltd</h1>
                <p className="mb-4">
                    <strong className='mr-2'>
                        Served Countries:
                    </strong>
                    UAE, Saudi Arabia, United States of America, Germany, China, Sri Lanka.
                </p>

                <div className="space-y-2 flex flex-wrap">
                    <div className="flex items-center bg-[#f7f7f7] rounded-[5px] w-fit px-4 py-1">
                        <img src='/resourcesApp/iconsApp/callActive.svg' alt='call-icon' />
                        <span className="text-[#272727]">+966 849494948S</span>
                    </div>
                    <div className="flex items-center bg-[#f7f7f7] rounded-[5px] w-fit px-4 py-1">
                        <img src='/resourcesApp/iconsApp/emailActive.svg' alt='email-icon' />
                        <span className="text-[#272727]">jannat345@gmail.com</span>
                    </div>
                    <div className="flex items-center bg-[#f7f7f7] rounded-[5px] w-fit px-4 py-1">
                        <img src='/resourcesApp/iconsApp/location.svg' alt='location-icon' />
                        <span className="text-[#272727]">Dubai Park Saudi Arabia</span>
                    </div>
                    <div className="flex items-center bg-[#f7f7f7] rounded-[5px] w-fit px-4 py-1">
                        <img src='/resourcesApp/iconsApp/docActive.svg' alt='doc-icon' />
                        <span className="text-[#272727]">Trade License</span>
                    </div>
                </div>
            </div>

            {/* Certifications */}
            <div className="px-4 mb-6 bg-white py-2">
                <h2 className="text-lg font-semibold text-[#272727] mb-4">Certifications</h2>
                <div className="flex space-x-4">
                    <div className="w-16 h-16 border border-[#e5e5e5] rounded-[5px] flex items-center justify-center">
                        <img src="/resourcesApp/iconsApp/certificate.svg" alt="ISO" className="w-12 h-12" />
                    </div>
                    <div className="w-16 h-16 border border-[#e5e5e5] rounded-[5px] flex items-center justify-center">
                        <img src="/resourcesApp/iconsApp/certificate.svg" alt="ISO" className="w-12 h-12" />
                    </div>
                </div>
            </div>

            {/* Categories Tabs */}
            <div className="px-4  bg-white pt-2">
                <div className="flex border-b border-[#e5e5e5]">
                    <button onClick={() => setActiveTab('Categories')} className={`px-4 py-2  font-medium ${activeTab == "Categories" ? "text-[#009eb4] border-b-2 border-[#009eb4]" : "text-[#737B7D]"}`}>Categories</button>
                    <button onClick={() => setActiveTab('Company')} className={`px-4 py-2 ${activeTab == "Company" ? "text-[#009eb4] border-b-2 border-[#009eb4]" : "text-[#737B7D]"} `}>Company</button>
                    <button onClick={() => setActiveTab('Projects')} className={`px-4 py-2 ${activeTab == "Projects" ? "text-[#009eb4] border-b-2 border-[#009eb4]" : "text-[#737B7D]"} `}>Projects</button>
                    <button onClick={() => setActiveTab('Review')} className={`px-4 py-2 ${activeTab == "Review" ? "text-[#009eb4] border-b-2 border-[#009eb4]" : "text-[#737B7D]"} `}>Review</button>
                </div>
            </div>
            {
                activeTab == "Categories" &&
                (
                    <>
                        {/* Served Categories */}
                        <div className="px-4 py-4 mb-6 bg-white">
                            <h3 className="text-lg font-semibold text-[#272727] mb-4">Served Categories</h3>

                            {/* Technology Category */}
                            <div className="border border-[#e5e5e5] rounded-lg mb-2">
                                <ul
                                    onClick={() => toggleCategory('Technology')}
                                    className={`w-full flex items-center justify-between p-4 bg-[#009eb4] text-white ${expandedCategory !== 'Technology' ? 'rounded-[10px]' : 'rounded-tl-[10px] rounded-tr-[10px]'}`}
                                >
                                    <span className="font-medium">Technology</span>
                                    {expandedCategory === 'Technology' ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </ul>
                                {expandedCategory === 'Technology' && (
                                    <div className="p-4 bg-[#009eb4] rounded-bl-[10px] rounded-br-[10px]">
                                        <div className="flex flex-wrap bg-white rounded-[10px] p-3 gap-2">
                                            <span className="px-3 py-1 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#272727]">Furniture</span>
                                            <span className="px-3 py-1 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#272727]">Electronics</span>
                                            <span className="px-3 py-1 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#272727]">Clothing</span>
                                            <span className="px-3 py-1 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#272727]">Toys</span>
                                            <span className="px-3 py-1 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#272727]">Kitchenware</span>
                                            <span className="px-3 py-1 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#272727]">Kitchenware</span>
                                            <span className="px-3 py-1 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#272727]">Kitchenware</span>
                                            <span className="px-3 py-1 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#272727]">Kitchenware</span>
                                            <span className="px-3 py-1 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#272727]">Kitchenware</span>
                                            <span className="px-3 py-1 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#272727]">Books</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Other Categories */}
                            {['Health', 'Finance', 'Education', 'Travel', 'Entertainment'].map((category) => (
                                <div key={category} className="border border-[#e5e5e5] rounded-lg mb-2">
                                    <button
                                        onClick={() => toggleCategory(category)}
                                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                                    >
                                        <span className="font-medium text-[#272727]">{category}</span>
                                        <Minus className="w-5 h-5 text-[#A8A8A8]" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )
            }

            {
                activeTab == 'Company' &&
                (
                    <>
                        <div className=" mb-6 ">
                            <div className='bg-white px-4 py-2'>
                                <h2 className="text-lg font-semibold text-[#272727] mb-4">Company Details</h2>
                                <div className='border border-[#e7e7e7] p-4 rounded-[10px]'>
                                    <div className='flex justify-between'>
                                        <p className='text-[#737B7D]'>Website:</p>
                                        <p>https://company.in</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='text-[#737B7D]'>No. of Employees:</p>
                                        <p>1001-4000 </p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='text-[#737B7D]'>Location:</p>
                                        <p>Sulaimania, Riyadh Saudi</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='text-[#737B7D]'>Company age:</p>
                                        <p>40 Y 4 M</p>
                                    </div>
                                </div>

                            </div>
                            <div className="space-x-4 mt-4 bg-white px-4 py-2">
                                <h2 className="text-lg font-semibold text-[#272727] mb-4">Attachments</h2>
                                <div className="w-full border border-[#e5e5e5] rounded-[5px] flex items-center justify-start p-2 mb-2">
                                    <img src="/resourcesApp/iconsApp/pdf.svg" alt="pdf-icon" className="w-12 h-12" />
                                    <span>company trade.jpg</span>
                                </div>
                                <div className="w-full border border-[#e5e5e5] rounded-[5px] flex items-center justify-start p-2 mb-2">
                                    <img src="/resourcesApp/iconsApp/pdf.svg" alt="pdf-icon" className="w-12 h-12" />
                                    <span>company trade.jpg</span>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

            {
                activeTab == "Projects" &&
                (
                    <div className='  bg-[#fff]'>

                        <h3 className="text-lg font-semibold text-[#272727] mb-4 pl-5 pt-2">Previous Project</h3>
                        <div className='flex gap-2 w-11/12 mx-auto'>
                            <div className="mx-auto h-58 relative mb-4 border border-[#e5e5e5] p-3 rounded-[10px] bg-white shadow-md">
                                <img
                                    className="w-full h- object-cover rounded-xl bg-gray-100"
                                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop"
                                    alt='project-image'
                                />
                                <p className='rounded-[10px] w-fit bg-[#F7F7F7] border border-[#e5e5e5] px-2 py-0.5 text-[#414141] text-[14px] mt-2'>Design System</p>
                                <p>Turbocharge X400 Engine Kit Project</p>
                            </div>
                            <div className="mx-auto h-58 relative mb-4 border border-[#e5e5e5] p-3 rounded-[10px] bg-white shadow-md">
                                <img
                                    className="w-full h- object-cover rounded-xl bg-gray-100"
                                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop"
                                    alt='project-image'
                                />
                                <p className='rounded-[10px] w-fit bg-[#F7F7F7] border border-[#e5e5e5] px-2 py-0.5 text-[#414141] text-[14px] mt-2'>Design System</p>
                                <p>Turbocharge X400 Engine Kit Project</p>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                activeTab == "Review" &&
                (
                    <div className="bg-white p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
                        {/* Section Header */}
                        <h1 className="text-2xl font-bold mb-6">Reviews</h1>

                        {/* Overall Rating */}
                        <div className="mb-8 flex bg-[#f7f7f7] p-4 rounded-[10px]">
                            <div className='bg-white p-2 w-full flex gap-1 items-center rounded-[10px]'>
                                <img className='w-16 h-16' src="/resources/icons/user-img.svg" alt='user-icon' />
                                <div className='flex justify-between gap-1'>
                                    <div className="">
                                        <h2 className="font-semibold text-sm mb-2">Overall Rating of Vendor</h2>
                                        <span className="text-amber-500 font-bold text-md pr-2">
                                            4.8/5</span>
                                        <span className="text-gray-500 text-sm">(93 reviews)</span>
                                    </div>
                                    <div className=" text-right">
                                        <p className="text-amber-500 font-bold text-md pr-2">
                                            4.8/5</p>
                                        <p className="text-gray-500 text-sm">Over Rating</p>
                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* Customer Ratings Title */}

                        {/* Review Cards */}
                        <div className="space-y-6">
                            {/* Add Review Section */}
                            <div className="mt-8 flex justify-between items-center">
                                <h2 className="font-semibold text-lg mb-4">Customer Ratings</h2>
                                <button className="bg-[#009eb4] text-white px-4 py-2 rounded-md transition-colors flex gap-1">
                                    <img src='/resources/icons/addWhite.svg' alt='add-icon' />
                                    <span>
                                        Add review
                                    </span>
                                </button>
                            </div>

                            {/* Review 1 */}
                            <div className="border border-[#e5e5e5] rounded-[10px] p-4">
                                <div className="flex gap-2">
                                    <img className='w-16 h-16' src="/resources/icons/user-img.svg" alt='user-icon' />
                                    <div className='flex justify-between w-full'>
                                        <div>
                                            <h3 className="font-medium">Sophia Lee</h3>
                                            <div className="flex text-amber-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>12 July 2024</div>
                                    </div>
                                </div>
                                <h4 className="font-medium text-gray-800 mb-2">Exceptional Experience</h4>
                                <p className="text-gray-600 mb-2">
                                    The catering provided by Al Sahra Buffet Services exceeded our expectations. Every dish was delicious, and the staff went above and beyond to ensure everything ran smoothly.
                                </p>
                                <p className="text-gray-400 text-sm">12 July 2024</p>
                            </div>

                            {/* Review 2 */}
                            <div className="border border-[#e5e5e5] rounded-[10px] p-4">
                                <div className="flex gap-2">
                                    <img className='w-16 h-16' src="/resources/icons/user-img.svg" alt='user-icon' />
                                    <div className='flex justify-between w-full'>
                                        <div>
                                            <h3 className="font-medium">Sophia Lee</h3>
                                            <div className="flex text-amber-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>12 July 2024</div>
                                    </div>
                                </div>
                                <h4 className="font-medium text-gray-800 mb-2">Exceptional Experience</h4>
                                <p className="text-gray-600 mb-2">
                                    The catering provided by Al Sahra Buffet Services exceeded our expectations. Every dish was delicious, and the staff went above and beyond to ensure everything ran smoothly.
                                </p>
                                <p className="text-gray-400 text-sm">12 July 2024</p>
                            </div>
                        </div>
                    </div>
                )
            }


            {/* Select Button */}
            <div className="px-4 py-4 bg-white">
                <button className="w-full bg-[#009eb4] text-white py-4 rounded-lg font-medium text-lg">
                    Select For SOW
                </button>
            </div>

        </div>
    );
};

export default AppVendorDetails;