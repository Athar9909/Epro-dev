import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Calendar,
    Clock,
    Bell,
    Copy,
    ChevronDown,
    Users
} from 'lucide-react';
import AppNavbar from '../../components/AppNavbar';
import { useNavigate } from 'react-router-dom';
import AppMeetingView from './AppMeetingView';
import AppMeetingAdd from './AppMeetingAdd';

const AppMeeting = () => {
    const navigate = useNavigate()
    const [currentView, setCurrentView] = useState('calendar');
    console.log(currentView)
    const [selectedDate, setSelectedDate] = useState(12);

    // Sample data
    const days = [
        { num: 9, day: 'Mon', dots: 4 },
        { num: 10, day: 'Tue', dots: 1 },
        { num: 11, day: 'Wed', dots: 2 },
        { num: 12, day: 'Thur', dots: 4 },
        { num: 13, day: 'Fri', dots: 0 },
        { num: 14, day: 'Sat', dots: 4 }
    ];

    const meetings = [
        {
            time: '02:00 PM',
            title: 'Daily Stand Up Meeting',
            date: '20 Dec, 2024',
            duration: '12:00 PM - 01:30 PM',
            status: 'Ongoing',
            participants: 7
        },
        {
            time: '03:00 PM',
            title: 'Daily Stand Up Meeting',
            date: '20 Dec, 2024',
            duration: '12:00 PM - 01:30 PM',
            status: 'Upcoming',
            participants: 7
        }
    ];

    const participants = [
        { name: 'Fahad Abdulaziz Al-Saud', avatar: true },
        { name: 'Layla Fahad', avatar: true },
        { name: 'Majed Saad', avatar: true },
        { name: 'Huda Ahmed', avatar: true },
        { name: 'Abdur Beck', avatar: true }
    ];

    const renderDots = (count) => {
        const colors = ['bg-cyan-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400'];
        return (
            <div className="flex justify-center space-x-0.5 mt-1">
                {Array.from({ length: Math.min(count, 4) }, (_, i) => (
                    <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${colors[i] || 'bg-gray-400'}`}
                    />
                ))}
            </div>
        );
    };

    const CalendarView = () => (
        <div className="bg-white min-h-screen">
            <div className="flex gap-1 py-6 pl-3 bg-white">
                <ChevronLeft className="text-md" onClick={() => navigate(-1)} />
                <p className="text-[16px] font-medium">
                    Meetings
                </p>
            </div>
            <div className='max-w-sm mx-auto '>
                {/* Month Navigation */}
                <div className="flex items-center justify-between px-4">
                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                    <h2 className="text-lg font-semibold">April 2025</h2>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                {/* Calendar Days */}
                <div className="flex justify-between px-2 py-4">
                    {days.map((day) => (
                        <div className='flex gap-1 flex-col justify-between'>
                            <div key={day.num} className={`flex flex-col items-center  border  p-1 rounded-[16px] ${day.num === selectedDate ? ' bg-[#009eb410] border-[#009eb4]' : 'bg-white border-[#e5e5e5]'}`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center`}>
                                    <span className="font-semibold">{day.num}</span>
                                </div>
                                <span className="text-xs text-gray-500 mt-1">{day.day}</span>
                            </div>
                            {day.dots > 0 && renderDots(day.dots)}
                        </div>
                    ))}
                </div>

                {/* Meetings List */}
                <div className="py-4 space-y-4">
                    {meetings.map((meeting, index) => (
                        <div key={index}>
                            <div className="text-sm font-medium text-gray-600 mb-2 relative flex items-center">
                                <span>
                                    {meeting.time}
                                </span>
                                <div className='ml-3 w-[300px] h-[1px] bg-[#E5E5E5]'></div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4 w-[80vw] ml-auto">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${meeting.status === 'Ongoing'
                                        ? 'bg-cyan-400 text-white'
                                        : 'bg-cyan-100 text-cyan-600'
                                        }`}>
                                        {meeting.status}
                                    </span>
                                    <div className="flex items-center">
                                        <div className="flex -space-x-2">
                                            {Array.from({ length: 3 }, (_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500 ml-2">+ {meeting.participants} more</span>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">{meeting.title}</h3>
                                <p className="text-sm text-gray-500 mb-3">{meeting.date} | {meeting.duration}</p>
                                {meeting.status === 'Ongoing' && (
                                    <button className="bg-yellow-400 text-black px-4 py-2 rounded font-medium text-sm flex items-center">
                                        <Plus className="w-4 h-4 mr-1" />
                                        Join
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Time Slots */}
                <div className="px-4 space-y-4 pb-20">
                    {['04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'].map((time) => (
                        <div key={time} className="text-sm font-medium text-gray-600">{time}</div>
                    ))}
                </div>
                <div className='w-full mb-20'>
                    <button
                        onClick={() => setCurrentView('add')}
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
    );


    const renderCurrentView = () => {
        switch (currentView) {
            case 'calendar':
                return <CalendarView />;
            case 'details':
                return <AppMeetingView
                    participants={participants}
                    setCurrentView={setCurrentView} />;
            case 'add':
                return <AppMeetingAdd
                    setCurrentView={setCurrentView} />;
            default:
                return <CalendarView />;
        }
    };

    return (
        <div className="bg-[#f4f4f4] mb-20">
            {/* <div className="flex gap-1 py-6 pl-3 bg-white">
                <ChevronLeft className="text-md" onClick={() => navigate(-1)} />
                <p className="text-[16px] font-medium">
                    Meetings
                </p>
            </div> */}
            {renderCurrentView()}

            {/* Navigation for demo purposes */}
            {/* <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-2 z-50">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setCurrentView('calendar')}
                        className={`px-3 py-1 rounded text-xs ${currentView === 'calendar' ? 'bg-cyan-400 text-white' : 'bg-gray-200'}`}
                    >
                        Calendar
                    </button>
                    <button
                        onClick={() => setCurrentView('details')}
                        className={`px-3 py-1 rounded text-xs ${currentView === 'details' ? 'bg-cyan-400 text-white' : 'bg-gray-200'}`}
                    >
                        Details
                    </button>
                    <button
                        onClick={() => setCurrentView('add')}
                        className={`px-3 py-1 rounded text-xs ${currentView === 'add' ? 'bg-cyan-400 text-white' : 'bg-gray-200'}`}
                    >
                        Add
                    </button>
                </div>
            </div> */}
            <AppNavbar />
        </div>
    );
};

export default AppMeeting;