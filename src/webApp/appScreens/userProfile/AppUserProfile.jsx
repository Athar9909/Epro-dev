import React from 'react';
import { User, ChevronRight, Calendar } from 'lucide-react';
import { useSelector } from 'react-redux';

const AppUserProfile = () => {
  const registerData = useSelector((state) => state.misc.registerData);

    return (
        <div className="max-w-xl mx-auto bg-white min-h-screen text-[#272727]">
            {/* Header */}
            <div className="flex items-center px-4 py-3 border-b" style={{ borderColor: '#e5e5e5' }}>
                <ChevronRight className="w-5 h-5 mr-3 rotate-180" style={{ color: '#272727' }} />
                <h1 className="text-lg font-medium" style={{ color: '#272727' }}>Edit Profile</h1>
            </div>

            {/* Profile Photo Section */}
            <div className="flex flex-col items-center py-6">
                <div className="w-25 h-25 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                    <img src="/resourcesApp/iconsApp/userGray.svg" alt='user-icon' />
                </div>
                <button className="text-sm" style={{ color: '#009eb4' }}>Edit Photo</button>
            </div>

            {/* Profile Fields */}
            <div className="px-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: '#e5e5e5' }}>
                    <span className="text-sm">Name</span>
                    <span className="text-sm font-medium">Idea Company</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: '#e5e5e5' }}>
                    <span className="text-sm">Tag Line</span>
                    <span className="text-sm">Get an Idea</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: '#e5e5e5' }}>
                    <span className="text-sm">Email</span>
                    <span className="text-sm">Idea@gmail.com</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: '#e5e5e5' }}>
                    <span className="text-sm">Phone Number</span>
                    <span className="text-sm">+966 9890909890</span>
                </div>
            </div>

            {/* Company Detail Section */}
            <div className="mt-6">
                <div className="px-6 py-2 text-xs font-medium uppercase tracking-wide" style={{ color: '#272727', backgroundColor: '#f5f5f5' }}>
                    Company Detail
                </div>

                <div className="px-6 space-y-4">
                    <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: '#e5e5e5' }}>
                        <span className="text-sm">Founding date</span>
                        <div className="flex items-center">
                            <span className="text-sm mr-2">20 Aug, 1980</span>
                            <Calendar className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: '#e5e5e5' }}>
                        <span className="text-sm">Location</span>
                        <div className="flex items-center">
                            <span className="text-sm mr-2">Palm Jumeirah</span>
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: '#e5e5e5' }}>
                        <span className="text-sm">IKTVA Members</span>
                        <div className="flex items-center">
                            <span className="text-sm mr-2">1090</span>
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: '#e5e5e5' }}>
                        <span className="text-sm">Company Size</span>
                        <div className="flex items-center">
                            <span className="text-sm mr-2">1001-5000</span>
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Others Section */}
            <div className="mt-6">
                <div className="px-6 py-2 text-xs font-medium uppercase tracking-wide" style={{ color: '#272727', backgroundColor: '#f5f5f5' }}>
                    Others
                </div>

                <div className="px-6 space-y-4">
                    <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: '#e5e5e5' }}>
                        <span className="text-sm">Industry</span>
                        <span className="text-sm">20 Aug, 1997</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: '#e5e5e5' }}>
                        <span className="text-sm">Website Link</span>
                        <span className="text-sm">www.idea.com</span>
                    </div>

                    <div className="flex justify-between items-start py-3 border-b" style={{ borderColor: '#e5e5e5' }}>
                        <span className="text-sm">Bio</span>
                        <span className="text-sm text-right flex-1 ml-4">
                            I am just an ordinary guy who merge pixels together with
                        </span>
                    </div>
                </div>
            </div>

            {/* Edit Button */}
            <div className="p-4 mt-8">
                <button
                    className="w-full py-3 rounded-lg text-white font-medium"
                    style={{ backgroundColor: '#009eb4' }}
                >
                    Edit
                </button>
            </div>

            {/* Bottom Indicator */}
            {/* <div className="flex justify-center pb-4">
                <div className="w-32 h-1 bg-black rounded-full"></div>
            </div> */}
        </div>
    );
};

export default AppUserProfile;