import React, { useRef, useState } from 'react';
import { Search, ChevronDown, Plus } from 'lucide-react';
import MeetingCard from './MeetingCard';
// import MeetingCard from './MeetingCard';

const Meeting = ({ onCreateMeeting }) => {
    const [currentMonth, setCurrentMonth] = useState('May 2025');
    const [viewType, setViewType] = useState('Week');
    const dateInputRef = useRef(null);

    const openDatePicker = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker?.() || dateInputRef.current.click();
        }
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    const weekDays = [
        { date: 16, day: 'Mon' },
        { date: 17, day: 'Tue' },
        { date: 18, day: 'Wed' },
        { date: 19, day: 'Thu' },
        { date: 20, day: 'Fri' },
        { date: 21, day: 'Sat' },
        { date: 22, day: 'Sun' },
    ];

    const timeSlots = [
        '03:00 PM',
        '04:00 PM',
        '05:00 PM',
        '06:00 PM',
        '07:00 PM',
        '08:00 PM',
        '09:00 PM',
    ];

    const meetings = [
        {
            id: 1,
            title: 'Daily Stand Up Meeting',
            date: '20 Dec, 2024',
            time: '10:00 PM - 01:30 PM',
            status: 'Ongoing',
            participants: 7,
            column: 0,
            timeSlot: 0,
        },
        {
            id: 2,
            title: 'Daily Stand Up Meeting',
            date: '20 Dec, 2024',
            time: '10:00 PM - 01:30 PM',
            status: 'Upcoming',
            participants: 7,
            column: 0,
            timeSlot: 1,
        },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Meeting Calender</h1>
                <p className="text-gray-600">We found 140 amazing properties that match your search.</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <div
                        className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200 cursor-pointer"
                        onClick={openDatePicker}
                    >
                        <img src="/resources/icons/calenderActive.svg" alt="calendar-icon" />
                        <input
                            type="date"
                            ref={dateInputRef}
                            className="outline-none bg-white text-sm hide-calendar-icon"
                            min={today}
                        />
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>

                </div>

                <div className="flex items-center gap-3">
                <div className="relative flex border border-[#e5e5e5] px-3 py-[6px] rounded-btn bg-white">
                    <Search className="w-4 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        placeholder="Search here"
                        className="pl-10 w-65 outline-none"
                    />
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>⌘</span>
                        <span>K</span>
                    </div>
                </div>

                    <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
                        <img src="/resources/icons/calenderActive.svg" alt="calendar-icon" />
                        <span className="text-sm font-medium">{viewType}</span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>

                    <button
                        onClick={onCreateMeeting}
                        className="px-6 py-2 bg-[#009EB4] text-white rounded-md flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Meeting
                    </button>
                </div>
            </div>

            {/* Meeting Grid */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Week Header */}
                <div className="grid grid-cols-8 border-b border-gray-200">
                    <div className="p-4"></div>
                    {weekDays.map((day, index) => (
                        <div key={index} className="p-4 text-center border-l border-gray-200">
                            <div className="text-lg font-semibold text-gray-900">{day.date}</div>
                            <div className="text-sm text-gray-500">{day.day}</div>
                        </div>
                    ))}
                </div>

                {/* Time Slots */}
                {timeSlots.map((time, timeIndex) => (
                    <div key={timeIndex} className="grid grid-cols-8 border-b border-gray-200 min-h-[100px]">
                        <div className="p-4 text-sm text-gray-600 border-r border-gray-200 flex items-start">
                            {time}
                        </div>
                        {weekDays.map((day, dayIndex) => (
                            <div key={dayIndex} className="p-2 border-l border-gray-200 relative">
                                {meetings
                                    .filter(meeting => meeting.column === dayIndex && meeting.timeSlot === timeIndex)
                                    .map(meeting => (
                                        <MeetingCard key={meeting.id} meeting={meeting} />
                                    ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Meeting;
