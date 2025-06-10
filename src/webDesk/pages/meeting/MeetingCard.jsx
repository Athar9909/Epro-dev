
import React from 'react';
import { Users, Plus } from 'lucide-react';


const MeetingCard = ({ meeting }) => {
  const isOngoing = meeting.status === 'Ongoing';
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow duration-200 w-[200px]">
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isOngoing 
            ? 'bg-cyan-100 text-cyan-700' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          {meeting.status}
        </span>
        
        {/* Participants */}
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            {[...Array(3)].map((_, index) => (
              <div 
                key={index}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium"
              >
                {String.fromCharCode(65 + index)}
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-500">+{meeting.participants} more</span>
        </div>
      </div>

      {/* Meeting Title */}
      <h3 className="font-medium text-gray-900 mb-1 text-sm">{meeting.title}</h3>
      
      {/* Meeting Time */}
      <p className="text-xs text-gray-500 mb-3">{meeting.date} | {meeting.time}</p>

      {/* Join Button */}
      <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-3 rounded-md text-sm flex items-center justify-center gap-1 transition-colors duration-200">
        <Plus className="w-4 h-4" />
        Join
      </button>
    </div>
  );
};

export default MeetingCard;