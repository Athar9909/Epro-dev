import { ChevronLeft, Plus } from "lucide-react";

const AppMeetingView = ({ participants, setCurrentView }) => {
    return (
        <div className=" min-h-screen">

            {/* Header */}
            <div className="flex gap-1 py-6 pl-3 bg-white">
                <ChevronLeft className="text-md" onClick={() => setCurrentView('calender')} />
                <p className="text-[16px] font-medium">
                    Add New Meeting
                </p>
            </div>
            <div className="max-w-sm mx-auto pt-3 py-16">
                {/* Basic Details Section */}
                <div className="">
                    <h2 className="font-semibold text-gray-900 mb-4">Basic Details</h2>
                    <div className="p-4 bg-white rounded-[10px]">

                        <div className="space-y-4">
                            <div className="flex">
                                <span className="text-gray-500 w-20">Title:</span>
                                <span className="font-medium">Sprint Planning & Prioritization</span>
                            </div>
                            <hr className="text-[#e5e5e5]" />
                            <div className="flex">
                                <span className="text-gray-500 w-20">Date:</span>
                                <span className="font-medium">18 April, 2025</span>
                            </div>
                            <hr className="text-[#e5e5e5]" />
                            <div className="flex">
                                <span className="text-gray-500 w-20">Start Time:</span>
                                <span className="font-medium">10:00 AM</span>
                            </div>
                            <hr className="text-[#e5e5e5]" />
                            <div className="flex">
                                <span className="text-gray-500 w-20">End Time:</span>
                                <span className="font-medium">11:00 AM</span>
                            </div>
                            <hr className="text-[#e5e5e5]" />
                            <div className="flex">
                                <span className="text-gray-500 w-20">Reminder:</span>
                                <span className="font-medium">10 Mins Before</span>
                            </div>
                            <hr className="text-[#e5e5e5]" />
                            <div className="flex">
                                <span className="text-gray-500 w-20">Notes:</span>
                                <div>
                                    <div className="font-medium">John to send out shared</div>
                                    <div className="font-medium">timeline doc (Due: April 22)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Participants Section */}
                <div className="">
                    <h2 className="font-semibold text-gray-900 mb-4 mt-4">Participants</h2>
                    <div className=" bg-white rounded-[10px] px-4 py-4 flex flex-wrap gap-2 items-center">
                        {participants.map((participant, index) => (
                            <div key={index} className="flex items-center justify-center bg-[#fafafa] p-2 rounded-full">
                                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
                                <span className="font-medium">{participant.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Join Meeting Button */}
            <div className="fixed bottom-4 left-4 right-4">
                <button className="w-full bg-cyan-400 text-white py-3 rounded-lg font-medium flex items-center justify-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Join Meeting
                </button>
            </div>
        </div>
    )
};

export default AppMeetingView