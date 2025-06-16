import { Bell, Calendar, ChevronDown, ChevronLeft, ChevronRight, Clock, Copy, Plus } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AppMeetingAdd = ({ setCurrentView }) => {
    const navigate = useNavigate()
    return (
        <>
            <div className="min-h-screen">
                <div className="flex gap-1 py-6 pl-3 bg-white">
                    <ChevronLeft className="text-md" onClick={() => setCurrentView('calender')} />
                    <p className="text-[16px] font-medium">
                        Add New Meeting
                    </p>
                </div>

                <div className='max-w-sm mx-auto mt-4'>
                    <div className="space-y-4">
                        {/* Add Title */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Add Title</h3>
                            <input
                                type="text"
                                placeholder="Enter Title"
                                className="w-full border-2 border-[#009eb4] rounded-[10px] p-3 focus:outline-none focus:border-cyan-500 bg-white"
                            />
                        </div>

                        {/* Add Note */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Add Note</h3>
                            <textarea
                                placeholder="Enter Note Here..."
                                rows="4"
                                className="w-full border border-gray-200 rounded-[10px] p-3 focus:outline-none focus:border-[#009eb4] text-gray-500 bg-white"
                            />
                        </div>

                        {/* Date & Time */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Date & Time</h3>
                            <div className="space-y-3 bg-white px-2 rounded-[10px] py-2">
                                <div className="flex items-center justify-between py-3 border-b border-[#e5e5e5]">
                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                                        <span>Date</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <span className="mr-2">18 April, 2025</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-[#e5e5e5]">
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 text-gray-400 mr-3" />
                                        <span>Start Time</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <span className="mr-2">10:00 AM</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-3 ">
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 text-gray-400 mr-3" />
                                        <span>End Time</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <span className="mr-2">11:00 AM</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add Members */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-gray-900">Add Members</h3>
                                <button className="text-[#009eb4] text-sm font-medium">Add From Past Meetings</button>
                            </div>

                            <div className="flex items-center justify-between py-3 bg-white px-3 rounded-[10px]">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                                        <Plus className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <span>Add Members</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Meeting Link */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Meeting Link</h3>
                            <div className="flex items-center bg-[#fff] rounded-[10px] p-4">
                                <span className="flex-1 text-gray-600 text-sm">http://sample.info/eprocurement.ass...</span>
                                <Copy className="w-4 h-4 text-gray-400 ml-2" />
                            </div>
                        </div>

                        {/* Reminder */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Reminder</h3>
                            <div className="flex items-center justify-between py-3 bg-white rounded-[10px] px-4 mb-4">
                                <div className="flex items-center">
                                    <Bell className="w-5 h-5 text-gray-400 mr-3" />
                                    <span>10 Minutes before</span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Create Meeting Button */}
                    {/* <div className="fixed bottom-4 left-4 right-4">
                <button
                    onClick={() => setCurrentView('calendar')}
                    className="w-full bg-[#009eb4] text-white py-3 rounded-[10px] font-medium flex items-center justify-center"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Meeting
                </button>
            </div> */}

                    <div className='w-full mb-20'>
                        <button
                            onClick={() => setCurrentView('details')}
                            className='text-[14px] border border-[#009EB4] px-2 py-3 rounded-[10px] w-full bg-[#009EB4] text-white hover:bg-[#00819a] transition-colors flex gap-2 justify-center items-center'
                        >
                            <img src='/resources/icons/addWhite.svg' alt='add-icon' />
                            <span>
                                Add New Meeting
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppMeetingAdd
