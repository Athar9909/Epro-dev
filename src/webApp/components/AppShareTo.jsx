import React, { useState } from 'react';
import { Search, User } from 'lucide-react';

export default function AppShareToComponent({ setIsShare, setShareTo, shareTo }) {
    const [activeTab, setActiveTab] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const tabs = [
        { name: 'All', count: 24 },
        { name: 'Teams', count: 15 },
        { name: 'Vendors', count: 9 }
    ];

    const contacts = [
        { id:"1234567890", name: 'Faisal bin Abdulaziz', type: 'Vendor', avatar: '👤' },
        { id:"1234567891", name: 'Procurement Head', type: 'Team', avatar: '🔵' },
        { id:"1234567892", name: 'Salman bin Abdulaziz', type: 'Vendor', avatar: '👤' },
        { id:"1234567893", name: 'Salman bin Abdulaziz', type: 'Vendor', avatar: '👤' },
        { id:"1234567894", name: 'Salman bin Abdulaziz', type: 'Vendor', avatar: '👤' },
        { id:"1234567895", name: 'Salman bin Abdulaziz', type: 'Vendor', avatar: '👤' }
    ];

    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
        if (activeTab === 'All') return matchesSearch;
        if (activeTab === 'Teams') return matchesSearch && contact.type === 'Team';
        if (activeTab === 'Vendors') return matchesSearch && contact.type === 'Vendor';
        return false;
    });

    return (
        <div className="fixed inset-0 max-w-xl mx-auto bg-[#272727CC] bg-blur-sm min-h-screen flex items-center justify-center">
            {/* Modal */}
            <div className="bg-white rounded-[16px] w-full max-w-sm h-[86vh] flex justify-between flex-col">
                <div>
                    {/* Header */}
                    <div className="p-6 pb-4 text-center">
                        <h2 className="text-[25px] font-semibold" style={{ color: '#272727' }}>Share To</h2>
                    </div>
                    {/* Search */}
                    <div className="p-4 bg-white">
                        <div className="relative">
                            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-7 h-7 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by Name"
                                className="w-full pl-10 px-4 py-3 focus:outline-none border-b border-[#e5e5e5]"
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="px-6 pb-4">
                        <div className="flex space-x-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`pb-2 border-b-2 transition-colors ${activeTab === tab.name ? 'border-current' : 'border-transparent'
                                        }`}
                                    style={{
                                        color: activeTab === tab.name ? '#009eb4' : '#A8A8A8'
                                    }}
                                >
                                    <span className="font-medium">{tab.name}</span>
                                    <span className="ml-2">{tab.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contact List */}
                    <div className="px-6 pb-6 max-h-88 overflow-y-auto">
                        <div className="space-y-3">
                            {filteredContacts.map((contact, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-between p-3 cursor-pointer hover:bg-[#e5f4f7] ${shareTo?.id === contact?.id ? 'bg-[#e5f4f7]' : ''
                                        }`}
                                    onClick={() => {setShareTo(contact); console.log(contact)}}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                            {contact.type === 'Team' ? (
                                                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#272727' }}></div>
                                            ) : (
                                                <User className="w-5 h-5" style={{ color: '#A8A8A8' }} />
                                            )}
                                        </div>
                                        <span className="font-medium text-[#272727]">
                                            {contact.name}
                                        </span>
                                    </div>
                                    <span className="text-sm px-2 py-1 rounded text-[#009eb4] bg-[#f0f9ff]">
                                        {contact.type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    {/* Action Buttons */}
                    <div className="flex space-x-3 p-4">
                        <button
                            className="flex-1 py-3 px-4 rounded-lg border font-medium"
                            style={{
                                borderColor: '#e5e5e5',
                                color: '#272727'
                            }}
                            onClick={() => setIsShare(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex-1 py-3 px-4 rounded-lg text-white font-medium"
                            style={{ backgroundColor: '#009eb4' }}
                            onClick={() => setIsShare(false)}
                        >
                            Share
                        </button>
                    </div>
                </div>

                {/* Bottom Section */}
                {/* <div className="p-6 pt-0">
          <button 
            className="w-full py-3 px-4 rounded-lg border font-medium"
            style={{ 
              borderColor: '#009eb4',
              color: '#009eb4',
              backgroundColor: 'transparent'
            }}
          >
            Add E-Signature/Stamp
          </button>
        </div> */}
            </div>
        </div>
    );
}