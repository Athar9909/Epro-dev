
import React from 'react';
import { Search, User, Plus } from 'lucide-react';

const MemberSearch = ({ onAddMember, searchQuery, onSearchChange }) => {
  const suggestedMembers = [
    { name: 'Fahad Abdulaziz', email: 'fahad@gmail.com', isAdded: true },
    { name: 'Fahad Abdulaziz', email: 'fahad@gmail.com', isAdded: false },
    { name: 'Fahad Abdulaziz', email: 'fahad@gmail.com', isAdded: false },
  ];

  const filteredMembers = suggestedMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Add Members
      </label>
      
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input 
          placeholder="fahad@gmail"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button 
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>

      {/* Member Suggestions */}
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {filteredMembers.map((member, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-700">{member.email}</span>
            </div>
            
            {member.isAdded ? (
              <span className="text-xs text-cyan-600 font-medium bg-cyan-50 px-2 py-1 rounded-full">
                Added
              </span>
            ) : (
              <button
                size="sm"
                variant="outline"
                onClick={() => onAddMember({ name: member.name, email: member.email })}
                className="text-cyan-600 border-cyan-200 hover:bg-cyan-50 text-xs px-3 py-1 h-auto"
              >
                Add
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberSearch;
