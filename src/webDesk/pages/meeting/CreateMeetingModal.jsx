import React, { useState } from 'react';
import { X, Calendar, Clock, User, Plus, Bell, Link, Search } from 'lucide-react';

const CreateMeetingModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [reminder, setReminder] = useState('10');
  const [meetingUrl, setMeetingUrl] = useState('');
  const [addedMembers, setAddedMembers] = useState([
    { id: 1, name: 'Fahad Abdulaziz', email: 'fahad@gmail.com' }
  ]);

  if (!isOpen) return null;

  const handleAddMember = (member) => {
    const newMember = {
      id: addedMembers.length + 1,
      ...member
    };
    setAddedMembers([...addedMembers, newMember]);
  };

  const handleRemoveMember = (id) => {
    setAddedMembers(addedMembers.filter(member => member.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
        <div className='p-4 border border-[#e7e7e7] m-6 rounded-btn'>
          {/* Header */}
          <div className="p-2 border-b border-[#e7e7e7]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Meeting Details</h2>
                <p className="text-sm text-gray-600 mt-1">We found 140 amazing properties that match your search.</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-6 p-2">
            {/* Meeting Title */}
            <div>
              <label className="block text-md font-medium text-gray-900 mb-2">
                Meeting Title
              </label>
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 bg-[#f7f7f7] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]"
              />
            </div>

            {/* Add Note */}
            <div>
              <label className="block text-md font-medium text-gray-900 mb-2">
                Add Note
              </label>
              <textarea
                placeholder="Enter Note here"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full min-h-[80px] px-3 py-2 border bg-[#f7f7f7] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4] resize-none"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-md font-medium text-gray-900 mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    placeholder="Select Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border bg-[#f7f7f7] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-md font-medium text-gray-900 mb-2">
                  Start Time
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="time"
                    placeholder="Select Time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border bg-[#f7f7f7] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-md font-medium text-gray-900 mb-2">
                  End Time
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="time"
                    placeholder="Select Time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border bg-[#f7f7f7] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]"
                  />
                </div>
              </div>
            </div>

            {/* Add Members */}
            <div className='bg-[#F5F7F9] p-4 rounded-btn'>
              <label className="block text-md font-medium text-gray-900 mb-2">
                Add Members
              </label>
              {/* <div className="flex">
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 border bg-white border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]"
              />
              <button
                onClick={() => handleAddMember({ name: searchQuery, email: `${searchQuery.toLowerCase()}@example.com` })}
                className="px-4 py-2 bg-[#009EB4] text-white rounded-r-md transition-colors"
              >
                Add
              </button>
            </div> */}

              <div className="relative flex justify-between border border-[#e5e5e5] px-3 py-3 rounded-btn bg-white">
                <Search className="w-4 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Search here"
                  className="pl-10 w-65 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>⌘</span>
                  <span>K</span>
                </div>
              </div>
              {/* Added Members */}
              {addedMembers.length > 0 && (
                <div className='py-2'>
                  <label className="block text-md font-medium text-gray-900 mb-3">
                    Added Members
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {addedMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-2 bg-white border border-[#009EB4] rounded-lg px-3 py-2"
                      >
                        <User className="w-5 h-5 bg-[#f7f7f7] text-black rounded-md p-1" />
                        <span className="text-md">{member.name}</span>
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-cyan-600 hover:text-cyan-800 transition-colors"
                        >
                          <X className="w-5 h-5 bg-[#009EB4] text-white rounded-full p-1" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>


            {/* Reminder and Meeting URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-md font-medium text-gray-900 mb-2">
                  Reminder
                </label>
                <div className="relative">
                  <Bell className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#009EB4]" />
                  <select
                    value={reminder}
                    onChange={(e) => setReminder(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-[#f7f7f7] focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4] appearance-none "
                  >
                    <option value="5">5 minutes before</option>
                    <option value="10">10 minutes before</option>
                    <option value="15">15 minutes before</option>
                    <option value="30">30 minutes before</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-md font-medium text-gray-900 mb-2">
                  Meeting URL
                </label>
                <div className="relative">
                  <Link className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    placeholder="Paste URL here"
                    value={meetingUrl}
                    onChange={(e) => setMeetingUrl(e.target.value)}
                    className="pl-10 w-full px-3 py-2 bg-[#f7f7f7] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#009EB4] focus:border-[#009EB4]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="p-6 flex justify-between gap-3">
          <div className=''>
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-900 hover:bg-gray-50 transition-colors mr-3"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#F4C63B]  rounded-md text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Rescheduled
          </button>

          </div>
          <button
            className="px-6 py-2 bg-[#009EB4] text-white rounded-md flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMeetingModal;