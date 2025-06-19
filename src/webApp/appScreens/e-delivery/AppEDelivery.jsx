import { ChevronLeft, Share2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShareToComponent from '../../components/AppShareTo'
import AppESignatureComponent from '../../components/AppEStamp'

const AppEDelivery = () => {
    const navigate = useNavigate()
    const [isShare, setIsShare] = useState(false)
    const [shareTo, setShareTo] = useState(null)
    const [eSignature, setESignature] = useState(false)
    return (
        <div className='bg-[#f4f4f4] min-h-screen max-w-7xl mx-auto h-screen overflow-y-auto'>
            {
                eSignature ? (
                    <>
                        {/* Heading */}
                        <div className="flex gap-1 py-6 pl-3 bg-white">
                            <ChevronLeft className="text-lg" onClick={() => navigate(-1)} />
                            <p className="text-[16px] font-medium">
                                E-DN #89NJHGG
                            </p>
                        </div>
                        {
                            shareTo && (
                                <div className="flex items-center justify-start w-full bg-[#F6FEFF]">
                                    <div className="w-18 h-18  flex items-center justify-center">
                                        <img
                                            className="font-semibold w-12 h-12 rounded-[16px]"
                                            src="/resources/icons/certified.svg"
                                            alt="vendorComp"
                                        />
                                    </div>
                                    <div className='text-[#009eb4]'>
                                        <p className='text-md'>Congratulation</p>
                                        <p className='text-sm'>Your purchase request accepted by End User.</p>
                                    </div>

                                </div>
                            )
                        }
                        {/* Details */}
                        <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3 w-full">
                                <div className="w-18 h-18  flex items-center justify-center">
                                    <img
                                        className="font-semibold w-20 h-20 rounded-[16px]"
                                        src="/resources/icons/vendorComp.svg"
                                        alt="vendorComp"
                                    />
                                </div>
                                <div>
                                    <span className="btn-pri text-xs px-2 py-1 mr-1 rounded">Construction</span>
                                    <span className="btn-pri text-xs px-2 py-1 rounded">Construction</span>
                                    <h4 className="font-medium text-gray-900 mb-1">Al-Karim Pvt Ltd</h4>
                                    <h4 className="font-medium text-gray-500 mb-1 text-xs">Karim Hussain Jannat </h4>
                                </div>
                                <div className='flex items-end'>
                                    <p className='text-gray-500'>12 July 2025</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-[#272727] w-full gap-2">
                                <p>The catering provided by Al Sahra Buffet Services exceeded our expectations. Every dish was delicious, and the staff went above and beyond to ensure everything ran smoothly.
                                    exceeded our expectations. Every dish was delicious, and the staff went above and beyond to ensure everything ran smoothly.</p>
                            </div>
                        </div >

                        {/* Products/Services/Rental Services */}
                        <div className=" bg-white border border-[#e5e5e5] p-4 my-4">
                            <h2 className="text-lg font-semibold text-[#272727] mb-4">Products/Services/Rental Services</h2>

                            <div className="border border-[#e5e5e5] rounded-lg overflow-hidden">
                                <div className="bg-[#009eb4] text-white grid grid-cols-4 text-sm font-medium">
                                    <div className="p-3">Item Code</div>
                                    <div className="p-3">Item Description</div>
                                    <div className="p-3">Quantity</div>
                                    <div className="p-3">Item</div>
                                </div>

                                <div className="bg-white">
                                    <div className="grid grid-cols-4 text-sm border-b border-[#e5e5e5]">
                                        <div className="p-3 text-[#272727]">#2332</div>
                                        <div className="p-3 text-[#272727]">Lorem ipsum dolor sit amet,</div>
                                        <div className="p-3 text-[#272727]">34</div>
                                        <div className="p-3 text-[#272727]">#</div>
                                    </div>
                                    <div className="grid grid-cols-4 text-sm border-b border-[#e5e5e5]">
                                        <div className="p-3 text-[#272727]">#2333</div>
                                        <div className="p-3 text-[#272727]">Lorem ipsum dolor sit amet,</div>
                                        <div className="p-3 text-[#272727]">56</div>
                                        <div className="p-3 text-[#272727]">#</div>
                                    </div>
                                    <div className="grid grid-cols-4 text-sm">
                                        <div className="p-3 text-[#272727]">#2334</div>
                                        <div className="p-3 text-[#272727]">Lorem ipsum dolor sit amet,</div>
                                        <div className="p-3 text-[#272727]">13</div>
                                        <div className="p-3 text-[#272727]">#</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Attachments */}
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
                    </>
                ) : (
                    <AppESignatureComponent />
                )
            }


            {
                shareTo ? (
                    <>
                        {/* track and e-signature buttons */}
                        <div className=" bg-white shadow-md p-4 mt-4">
                            <div className='flex gap-4'>
                                <button className="flex justify-center items-center gap-1 w-[40vw] p-4 rounded-[10px] bg-[#F4C63B]"
                                    onClick={() => navigate("/User-App/Track-Delivery-Order")}>
                                    Track Delivery
                                </button>
                                <button className="flex justify-center items-center gap-1 bg-[#009eb4] text-white w-[60vw] p-4 rounded-[10px]"
                                    onClick={() => setESignature(true)}>
                                    <img src='/resources/icons/addWhite.svg' alt='add-icon' />
                                    <span>Add E-Signature</span>
                                </button>
                            </div>
                        </div>
                    </>
                )
                    :
                    (
                        <>
                            {/* Share button */}
                            <div className="p-4 mt-4 bg-white">
                                <button className="w-full bg-[#009eb4] text-white py-4 rounded-lg font-medium text-lg flex justify-center items-center gap-2"
                                    onClick={() => setIsShare(true)}>
                                    <Share2 />
                                    <span>Share</span>
                                </button>
                            </div>
                        </>
                    )
            }


            {/* Share To Module */}
            {
                isShare && (
                    <AppShareToComponent
                        setIsShare={setIsShare}
                        shareTo={shareTo}
                        setShareTo={setShareTo} />
                )
            }
        </div>
    )
}

export default AppEDelivery
