import React, { useState } from 'react';
import {
  ChevronLeft,
  Search,
  Filter,
  ChevronRight,
  FileText,
  Download,
  Plus,
  ListFilter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppSOWManager = () => {
  const navigate = useNavigate()
  const [currentView, setCurrentView] = useState('documents');
  const [activeTab, setActiveTab] = useState('My Documents');
  const [activeFilter, setActiveFilter] = useState('SOWs');

  // Sample data
  const documents = [
    {
      id: '#SOW682709',
      title: 'Pile Driving Machine | Request of P...',
      date: '20 Dec, 2024',
      time: '12:00 PM - 01:30 PM',
      status: 'Pending',
      icon: '📋'
    },
    {
      id: '#SOW682709',
      title: 'Pile Driving Machine | Request of P...',
      date: '20 Dec, 2024',
      time: '12:00 PM - 01:30 PM',
      status: 'Rejected',
      icon: '📋'
    },
    {
      id: '#SOW682709',
      title: 'Pile Driving Machine | Request of P...',
      date: '20 Dec, 2024',
      time: '12:00 PM - 01:30 PM',
      status: 'Approved',
      icon: '📋'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-[#F4C63B]';
      case 'Rejected':
        return 'text-red-500';
      case 'Approved':
        return 'text-green-500';
      default:
        return 'text-[#A8A8A8]';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return '⏱';
      case 'Rejected':
        return '⊗';
      case 'Approved':
        return '✓';
      default:
        return '';
    }
  };

  const CreateSOWView = () => (
    <div className="bg-white min-h-screen ">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <button onClick={() => setCurrentView('documents')}>
            <ChevronLeft className="w-6 h-6 text-[#272727]" />
          </button>
          <h1 className="text-lg font-semibold ml-4 text-[#272727]">Create SOW</h1>
        </div>
      </div>

      <div className='bg-[#f7f7f7] py-4'>
      {/* Company Header */}
      <div className="mx-4 mb-6 p-4 bg-white border border-[#e5e5e5] rounded-lg ">
        <div className="flex items-center mb-2">
          <div className="w-12 h-12 bg-[#A8A8A8] rounded mr-3 flex items-center justify-center">
            <span className="text-xs text-white font-bold">U</span>
          </div>
          <div>
            <div className="font-semibold text-[#272727]">Hindustan Unilever Ltd</div>
          </div>
        </div>
      </div>

      {/* SOW Details */}
      <div className="mb-6 w-11/12 mx-auto bg-white border border-[#e5e5e5] p-4 rounded-[10px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#272727]">SOW Details</h2>
          <span className="bg-[#009eb4] text-white px-3 py-1 rounded text-sm">SOW6549874</span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">Document for</div>
            <div className="font-medium text-[#272727]">Products</div>
          </div>

          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">SOW Title</div>
            <div className="font-medium text-[#272727]">lorem ipsum</div>
          </div>

          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">SOW Creator</div>
            <div className="font-medium text-[#272727]">lorem ipsum</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[#A8A8A8] text-sm mb-1">Designation</div>
              <div className="font-medium text-[#272727]">lorem ipsum</div>
            </div>
            <div>
              <div className="text-[#A8A8A8] text-sm mb-1">Department</div>
              <div className="font-medium text-[#272727]">lorem ipsum</div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="mx-4 mb-6 bg-white border border-[#e5e5e5] p-4 rounded-[10px]">
        <h2 className="text-lg font-semibold text-[#272727] mb-4">Company Details</h2>

        <div className="space-y-4">
          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">Introduction</div>
            <div className="text-[#272727] text-sm leading-relaxed">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,
            </div>
          </div>

          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">Company Info</div>
            <div className="text-[#272727] text-sm leading-relaxed">
              It is a long established fact that a reader will be distracted by the readable content of a page
            </div>
          </div>

          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">Objectives</div>
            <div className="text-[#272727] text-sm">lorem ipsum</div>
          </div>

          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">Scope Description</div>
            <div className="text-[#272727] text-sm">lorem ipsum</div>
          </div>
        </div>
      </div>

      {/* Products/Services Table */}
      <div className="mx-4 mb-6 bg-white border border-[#e5e5e5] p-4 rounded-[10px]">
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

      {/* Other Details */}
      <div className="mx-4 mb-6 bg-white border border-[#e5e5e5] p-4 rounded-[10px]">
        <h2 className="text-lg font-semibold text-[#272727] mb-4">Other Details</h2>

        <div className="space-y-4">
          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">Time Line</div>
            <div className="text-[#272727] text-sm">Products</div>
          </div>

          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">Location</div>
            <div className="text-[#272727] text-sm">lorem ipsum</div>
          </div>

          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">Assumptions & Constraints</div>
            <div className="text-[#272727] text-sm">lorem ipsum</div>
          </div>

          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">Payment Terms</div>
            <div className="text-[#272727] text-sm">lorem ipsum</div>
          </div>

          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">Change Management</div>
            <div className="text-[#272727] text-sm">lorem ipsum</div>
          </div>

          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">Other Requirements</div>
            <div className="text-[#272727] text-sm">lorem ipsum</div>
          </div>

          <div>
            <div className="text-[#A8A8A8] text-sm mb-1">Appendices & Attachment</div>
            <div className="flex items-center mt-2">
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center mr-2">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-[#272727] text-sm">table.jpg</span>
            </div>
          </div>
        </div>
      </div>

      </div>


      {/* Action Buttons */}
      <div className="bg-white flex space-x-3 w-11/12 mx-auto py-4">
        <button className="flex-1 border border-[#009eb4] text-[#009eb4] py-3 rounded-lg font-medium">
          Save as Draft
        </button>
        <button className="flex-1 bg-[#009eb4] text-white py-3 rounded-lg font-medium flex items-center justify-center">
          <Download className="w-4 h-4 mr-2" />
          Submit
        </button>
      </div>
    </div>
  );

  const AppSOW = () => (
    <div className="min-h-screen w-full">

      {/* Header */}
      {/* <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <ChevronLeft className="w-6 h-6 text-[#272727]" />
          <h1 className="text-lg font-semibold ml-4 text-[#272727]">My Documents</h1>
        </div>
        <button className="text-[#009eb4] font-medium">Saved Draft</button>
      </div> */}
      <div className="flex gap-1 py-6 pl-3 bg-white justify-between">
        <div className='flex gap-1'>
          <ChevronLeft className="text-md" onClick={() => navigate(-1)} />
          <p className="text-[16px] font-medium">
            My Documents
          </p>
        </div>
        <span className='text-[#009eb4] pr-3'>Saved Draft</span>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-4 bg-white">
        <div className="relative">
          {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A8A8A8]" /> */}
          <img className='absolute left-3 top-1/2 transform -translate-y-1/2' src="/resourcesApp/iconsApp/search.svg" alt="search-icon" />
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-[10px] text-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4 bg-white w-full">
        <div className="flex justify-center space-x-20 border-b border-[#e5e5e5]">
          {['My Documents', 'Vendor Documents'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium ${activeTab === tab
                ? 'text-[#009eb4] border-b-2 border-[#009eb4]'
                : 'text-[#A8A8A8]'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Pills */}
      <div className="px-4">
        <div className="flex space-x-3 mb-4">
          {['SOWs', 'PRs', 'RFPs/RFIs', 'RFQs'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === filter
                ? 'border border-[#009eb4] bg-[#ddeaf0] text-[#272727]'
                : 'bg-gray-100 text-[#272727]'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Today Section */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#272727]">Today</h2>
          <button className="flex items-center text-[#A8A8A8]">
            <ListFilter className="w-4 h-4 mr-1" />
            <span className="text-sm">Filter</span>
          </button>
        </div>

        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="bg-white border border-[#e5e5e5] rounded-lg p-4">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#009eb4] rounded-lg flex items-center justify-center mr-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <div className="text-sm text-[#A8A8A8] mb-1">{doc.id}</div>
                  <h3 className="font-semibold text-[#272727] mb-1">{doc.title}</h3>
                  <p className="text-sm text-[#A8A8A8] mb-3">{doc.date} | {doc.time}</p>

                  <button className="bg-[#F4C63B] text-[#272727] px-4 py-2 rounded font-medium text-sm flex items-center">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e5e5e5]">
                <div className="flex items-center">
                  <span className="text-sm text-[#A8A8A8] mr-2">Status</span>
                  <span className={`text-sm font-medium flex items-center ${getStatusColor(doc.status)}`}>
                    <span className="mr-1">{getStatusIcon(doc.status)}</span>
                    {doc.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Yesterday Section */}
      <div className="px-4 mb-20">
        <h2 className="text-lg font-semibold text-[#272727] mb-4">Yesterday</h2>

        <div className="bg-white border border-[#e5e5e5] rounded-lg p-4">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-[#009eb4] rounded-lg flex items-center justify-center mr-3">
              <FileText className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1">
              <div className="text-sm text-[#A8A8A8] mb-1">#SOW682709</div>
              <h3 className="font-semibold text-[#272727] mb-1">Pile Driving Machine | Request of P...</h3>
              <p className="text-sm text-[#A8A8A8] mb-3">20 Dec, 2024 | 12:00 PM - 01:30 PM</p>

              <button className="bg-[#F4C63B] text-[#272727] px-4 py-2 rounded font-medium text-sm flex items-center">
                View Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#e5e5e5]">
            <div className="flex items-center">
              <span className="text-sm text-[#A8A8A8] mr-2">Status</span>
              <span className="text-sm font-medium flex items-center text-green-500">
                <span className="mr-1">✓</span>
                Approved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Create New SOW Button */}

      <div className=' py-4 bg-white'>
        <button
          onClick={() => setCurrentView('create')}
          className='w-11/12 mx-auto text-[14px] border border-[#009EB4] px-2 py-4 rounded-[10px] bg-[#009EB4] text-white hover:bg-[#00819a] transition-colors flex gap-2 justify-center items-center'
        >
          <img src='/resources/icons/addWhite.svg' alt='add-icon' />
          <span>
            Create New SOW
          </span>
        </button>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'create':
        return <CreateSOWView />;
      case 'documents':
        return <AppSOW />;
      default:
        return <AppSOW />;
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-[#f4f4f4]">
      {renderCurrentView()}

      {/* Navigation for demo purposes */}
      {/* <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-2 z-50">
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentView('documents')}
            className={`px-3 py-1 rounded text-xs ${currentView === 'documents' ? 'bg-[#009eb4] text-white' : 'bg-gray-200'}`}
          >
            Documents
          </button>
          <button
            onClick={() => setCurrentView('create')}
            className={`px-3 py-1 rounded text-xs ${currentView === 'create' ? 'bg-[#009eb4] text-white' : 'bg-gray-200'}`}
          >
            Create SOW
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default AppSOWManager;