import React from 'react';
import { ChevronLeft, Star, Shield, Phone } from 'lucide-react';

export default function AppTrackOrder() {
    return (
        <div className="bg-[#f4f4f4] min-h-screen">
            {/* Header */}
            <div className="bg-white shadow-md flex items-center px-4 py-4 border-b" style={{ borderColor: '#e5e5e5' }}>
                <ChevronLeft className="w-6 h-6" style={{ color: '#272727' }} />
                <h1 className="ml-4 text-lg font-semibold" style={{ color: '#272727' }}>Track Delivery</h1>
            </div>

            <div className="p-4 space-y-6">
                {/* Order Info Card */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm" style={{ color: '#A8A8A8' }}>Order ID</p>
                            <p className="font-semibold" style={{ color: '#272727' }}>#989008889</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm" style={{ color: '#A8A8A8' }}>E-Delivery Note</p>
                            <p className="font-semibold" style={{ color: '#272727' }}>#878990</p>
                        </div>
                    </div>
                </div>

                {/* Order Details Card */}
                <div className="bg-white shadow-md rounded-lg border p-4" style={{ borderColor: '#e5e5e5' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold" style={{ color: '#272727' }}>Order Details</h2>
                        <span className="px-3 py-1 rounded text-white text-sm" style={{ backgroundColor: '#009eb4' }}>
                            Active
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium" style={{ color: '#272727' }}>Product Name</p>
                            <p className="text-sm" style={{ color: '#A8A8A8' }}>Desktop Table</p>
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm font-medium" style={{ color: '#272727' }}>Category</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>Furniture</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium" style={{ color: '#272727' }}>Quantity</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>1089</p>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm font-medium" style={{ color: '#272727' }}>Payment Amount</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>1,50,000 SAR</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium" style={{ color: '#272727' }}>Payment Status</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>Paid</p>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm font-medium" style={{ color: '#272727' }}>Order Date</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>Mon, 20 Jan 2025</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium" style={{ color: '#272727' }}>Delivery Date</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>Mon, 20 Jan 2025</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium" style={{ color: '#272727' }}>Delivery Status</p>
                            <p className="text-sm font-semibold" style={{ color: '#009eb4' }}>On the Way</p>
                        </div>
                    </div>
                </div>

                {/* Vendor Info */}
                <div className="bg-white rounded-lg p-4 border-2 border-[#e5e5e5] hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center justify-center gap-2">
                            <img
                                className="font-semibold w-12 h-12  "
                                src="/resources/icons/vendorComp.svg"
                                alt="vendorComp"
                            />
                            <div className='text-start'>
                                <span className="rounded-[5px] border border-[#e5e5e5] text-xs px-2 py-1 mx-1 bg-[#f7f7f7]">Construction</span>
                                <span className="rounded-[5px] border border-[#e5e5e5] text-xs px-2 py-1 bg-[#f7f7f7]">2+ More</span>
                                <h4 className="font-medium text-gray-900 mb-1">Al-Karim Pvt Ltd</h4>
                                <h4 className="font-medium text-gray-500 mb-1 text-xs">Karim Hussain Jannat </h4>
                            </div>
                        </div>
                        <div>
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
                    </div>



                    <div className="flex items-center justify-between text-xs text-gray-500 w-full gap-2">
                        <div className='bg-[#009eb5] w-full py-1 text-white rounded-[6px] flex justify-center items-center gap-2'>
                            <img src="/resourcesApp/iconsApp/certifiedWhite.svg" alt='certified-icon' />
                            <span>
                                Certified
                            </span>
                        </div>
                        <div className='bg-[#009eb5] w-full py-1 text-white rounded-[6px] flex justify-center items-center gap-2'>
                            <img src="/resourcesApp/iconsApp/idWhite.svg" alt='certified-icon' />
                            <span>
                                ID:12345
                            </span>
                        </div>
                    </div>
                </div >

                {/* Order Status Timeline */}
                <div className="bg-white shadow-md rounded-lg border p-4" style={{ borderColor: '#e5e5e5' }}>
                    <h3 className="font-semibold mb-4" style={{ color: '#272727' }}>Order Status</h3>

                    <div className="space-y-4">
                        {/* Order Confirm */}
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: '#F4C63B' }}>
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium" style={{ color: '#272727' }}>Order Confirm</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>Al Olaya, Riyadh</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>Wed, 25 March 2025 - 12:56 AM</p>
                            </div>
                        </div>

                        {/* Vertical Line */}
                        <div className="ml-3 w-0.5 h-4" style={{ backgroundColor: '#F4C63B' }}></div>

                        {/* Order Shipped */}
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: '#F4C63B' }}>
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium" style={{ color: '#272727' }}>Order Shipped</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>Al-Hamra District, Jeddah</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>Wed, 25 March 2025 - 02:12 PM</p>
                            </div>
                        </div>

                        {/* Vertical Line */}
                        <div className="ml-3 w-0.5 h-4" style={{ backgroundColor: '#F4C63B' }}></div>

                        {/* Out for Delivery */}
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: '#F4C63B' }}>
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium" style={{ color: '#272727' }}>Out for Delivery</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>I Badiyah, Dammam</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>Fri, 25 March 2025</p>
                            </div>
                        </div>

                        {/* Vertical Line */}
                        <div className="ml-3 w-0.5 h-4" style={{ backgroundColor: '#e5e5e5' }}></div>

                        {/* Delivered */}
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1" style={{ borderColor: '#e5e5e5' }}>
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#e5e5e5' }}></div>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium" style={{ color: '#A8A8A8' }}>Delivered</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>Al Mahalah, Abha</p>
                                <p className="text-sm" style={{ color: '#A8A8A8' }}>Fri, 25 March 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}