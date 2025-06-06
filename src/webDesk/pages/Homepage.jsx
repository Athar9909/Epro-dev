import { useState } from 'react';

// Categories Grid Component
const CategoriesGrid = () => {
  const categories = [
    { name: 'Healthcare', count: '24 Product available', color: 'bg-blue-100', icon: '🏥' },
    { name: 'Electronics', count: '165 Product available', color: 'bg-green-100', icon: '📱' },
    { name: 'Furniture', count: '24 Product available', color: 'bg-yellow-100', icon: '🪑' },
    { name: 'Gadgets', count: '89 Product available', color: 'bg-purple-100', icon: '🎮' },
    { name: 'Devices', count: '116 Product available', color: 'bg-gray-100', icon: '⚙️' }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Explore Categories</h3>
        <button className="text-blue-600 hover:text-blue-800 font-medium">View All →</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <div key={index} className={`border border-[#e7e7e7] rounded-[15px] p-4 hover:shadow-md transition-shadow cursor-pointer`}>
            <h4 className="font-medium text-gray-900">{category.name}</h4>
            <p className="text-xs text-gray-600 mb-2">{category.count}</p>
            <img
              className="font-semibold w-full"
              src="resources/images/dummy_img.svg"
              alt="people"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Hero Banner Component
const HeroBanner = () => {
  return (
    <div className="bg-[url('/resources/images/Banner.svg')] p-6 mb-6 text-white relative overflow-hidden w-full">
      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Create Purchase</h2>
        <p className="text-blue-100 mb-4 max-w-md">
          Streamline your workflow, deliver winning proposals that leave a impression.
        </p>
        <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors flex gap-1">
          <img
            className="font-semibold"
            src="resources/icons/add2.svg"
            alt="add2"
          />
          Create Purchase
        </button>
      </div>
      {/* <div className="absolute right-0 top-0 opacity-20">
        <span className="text-8xl">🏢</span>
      </div> */}
    </div>
  );
};

// Meeting Schedule Component
const MeetingSchedule = () => {
  const meetings = [
    { title: 'Daily Stand Up Meeting', time: '9:00 - 10:00 AM', type: 'Ongoing', avatars: 7 },
    { title: 'Daily Stand Up Meeting', time: '10:00 - 11:00 AM', type: 'Upcoming', avatars: 7 }
  ];

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Meetings schedule</h4>
        <div className="text-sm flex gap-1">Show all
          <div className='bg-yellow-400 w-5 h-5 rounded-full flex justify-center items-center'>
            <img
              className="font-semibold"
              src="resources/icons/rightArrow.svg"
              alt="rightArrow"
            />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {meetings.map((meeting, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">

              <div className="flex items-center space-x-3 p-2 bg-[#f3f3f3] rounded-btn border border-[#e5e5e5]">
                <img src='/resources/icons/meetingActive.svg' alt='meetingActive.svg' />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded btn-pri`}>
                    {meeting.type}
                  </span>
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-gray-300 rounded-full border border-white"></div>
                    ))}
                    <span className="text-xs text-gray-500 ml-2">+{meeting.avatars} more</span>
                  </div>
                </div>
                <h5 className="font-medium text-gray-900">{meeting.title}</h5>
                <p className="text-sm text-gray-500">{meeting.time}</p>
              </div>
            </div>
            <div className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 flex gap-1">
              <img
                className="font-semibold"
                src="resources/icons/add2.svg"
                alt="add2"
              />
              <span>
                Join
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Recent Proposals Component
const RecentProposals = () => {
  const proposals = [
    { title: 'Pile Driving Machine | Request of Proposal', date: '20 Dec, 2024 | 12:00 PM - 3:30 PM', type: 'Construction' },
    { title: 'Pile Driving Machine | Request of Proposal', date: '20 Dec, 2024 | 12:00 PM - 3:30 PM', type: 'Upcoming' }
  ];

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Recent Proposal</h4>
        <div className="text-sm flex gap-1">Show all
          <div className='bg-yellow-400 w-5 h-5 rounded-full flex justify-center items-center'>
            <img
              className="font-semibold"
              src="resources/icons/rightArrow.svg"
              alt="rightArrow"
            />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {proposals.map((proposal, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3 p-2 bg-[#f3f3f3] rounded-btn border border-[#e5e5e5]">
                <img src='/resources/icons/document2.svg' alt='document2.svg' />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded btn-pri`}>
                    {proposal.type}
                  </span>
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-gray-300 rounded-full border border-white"></div>
                    ))}
                    <span className="text-xs text-gray-500 ml-2">+7 more</span>
                  </div>
                </div>
                <h5 className="font-medium text-gray-900">{proposal.title}</h5>
                <p className="text-sm text-gray-500">{proposal.date}</p>
              </div>
            </div>
            <button className="bg-yellow-500 text-gray-900 px-3 py-1 rounded text-sm hover:bg-yellow-600">
              View Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Project Progress Component
const ProjectProgress = () => {
  const projects = [
    { name: 'Project Safelteet', date: '20 Dec, 2024 | 12:00 PM - 3:30 PM', progress: 70, status: 'Active' },
    { name: 'Project EcoVision', date: '18 Dec, 2024 | 8:00 AM - 11:30 AM', progress: 50, status: 'In Progress' },
    { name: 'Project Skyward', date: '21 Dec, 2024 | 2:00 PM - 5:30 PM', progress: 30, status: 'Paused' },
    { name: 'Project QuantumLeap', date: '19 Dec, 2024 | 10:00 AM - 1:30 PM', progress: 80, status: 'Active' },
    { name: 'Project Greenlands', date: '22 Dec, 2024 | 9:00 AM - 12:30 PM', progress: 40, status: 'Pending' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Ongoing Projects</h4>
        <div className="text-sm flex gap-1">Show all
          <div className='bg-yellow-400 w-5 h-5 rounded-full flex justify-center items-center'>
            <img
              className="font-semibold"
              src="resources/icons/rightArrow.svg"
              alt="rightArrow"
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 p-2 bg-[#f3f3f3] rounded-btn border border-[#e5e5e5]">
                  <img src='/resources/icons/documentActive.svg' alt='documentActive.svg' />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">{project.name}</h5>
                  <p className="text-xs text-gray-500">{project.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded btn-pri ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Recent Transactions Component
const RecentTransactions = () => {
  const transactions = [
    { name: 'Desktop Table Project', date: 'June 10, 2024 - 11:00 AM', amount: '99 SAR', type: 'paid' },
    { name: 'Desktop Table Project', date: 'June 10, 2024 - 11:00 AM', amount: '99 SAR', type: 'paid' },
    { name: 'Desktop Table Project', date: 'June 10, 2024 - 9:00 AM', amount: '99 SAR', type: 'paid' },
    { name: 'Desktop Table Project', date: 'June 10, 2024 - 8:00 AM', amount: '99 SAR', type: 'paid' },
    { name: 'Desktop Table Project', date: 'June 10, 2024 - 11:00 AM', amount: '99 SAR', type: 'paid' },
    { name: 'Desktop Table Project', date: 'June 10, 2024 - 9:00 AM', amount: '99 SAR', type: 'paid' },
    { name: 'Desktop Table Project', date: 'June 10, 2024 - 9:00 AM', amount: '99 SAR', type: 'paid' }
  ];

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Recent Transactions</h4>
        <div className="text-sm flex gap-1">Show all
          <div className='bg-yellow-400 w-5 h-5 rounded-full flex justify-center items-center'>
            <img
              className="font-semibold"
              src="resources/icons/rightArrow.svg"
              alt="rightArrow"
            />
          </div>
        </div>
      </div>
      <div className="space-y-3 max-h-90 overflow-hidden">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3 p-2 bg-[#f3f3f3] rounded-btn border border-[#e5e5e5]">
                <img src='/resources/icons/wallet.svg' alt='wallet.svg' />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 text-sm">{transaction.name}</h5>
                <p className="text-xs text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-green-600">{transaction.amount}</p>
              <span className="inline-flex items-center text-xs text-green-600">
                ✓ Paid
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Vendor Cards Component
const VendorCards = () => {
  const vendors = [
    { name: 'Al-Karim Co Ltd', des: 'Technolab Solutions', rating: 4.5, id: 'BMT120976', certified: true, type: "Construction" },
    { name: 'Apex Designs LLC', des: 'Technolab Solutions', rating: 4.3, id: '44574632313', certified: true, type: "Construction" },
    { name: 'Technolab Solutions', des: 'Technolab Solutions', rating: 4.7, id: '234487800', certified: true, type: "Construction" }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Explore Vendor</h3>
        <button className="text-blue-600 hover:text-blue-800 font-medium">View All →</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map((vendor, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12  flex items-center justify-center">
                <img
                  className="font-semibold"
                  src="resources/icons/vendorComp.svg"
                  alt="vendorComp"
                />
              </div>
              <div>
                <span className="btn-pri text-xs px-2 py-1 mx-1 rounded">Active</span>
                <span className="btn-pri text-xs px-2 py-1 rounded">Active</span>
                <h4 className="font-medium text-gray-900 mb-1">{vendor.name}</h4>
                <h4 className="font-medium text-gray-500 mb-1 text-xs">{vendor.des}</h4>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2 border border-[#e5e5e5] bg-[#f7f7f7] p-1 rounded-md">
                  <img
                    className="font-semibold"
                    src="resources/icons/star.svg"
                    alt="star"
                  />
                  <span className="text-sm text-gray-600">{vendor.rating}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 mb-2 border border-[#e5e5e5] bg-[#f7f7f7] p-1 rounded-md">
                  <img
                    className="font-semibold w-6 h-6"
                    src="resources/icons/buildingActive.svg"
                    alt="buildingActive-icon"
                  />
                </div>
              </div>
            </div>



            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>✓ Certified</span>
              <span>ID: {vendor.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Services Grid Component
const ServicesGrid = () => {
  const services = [
    { name: 'Fineone FE-0034 Gold Cardio Pro Stethoscope', price: '150 SAR', category: 'Medical Equipment' },
    { name: 'Fineone FE-0034 Gold Cardio Pro Stethoscope', price: '150 SAR', category: 'Medical Equipment' },
    { name: 'Fineone FE-0034 Gold Cardio Pro Stethoscope', price: '150 SAR', category: 'Medical Equipment' },
    { name: 'Fineone FE-0034 Gold Cardio Pro Stethoscope', price: '150 SAR', category: 'Medical Equipment' },
    { name: 'Fineone FE-0034 Gold Cardio Pro Stethoscope', price: '150 SAR', category: 'Medical Equipment' }
  ];

  const vehicleServices = [
    { name: 'Vehicle Vendor Hire...', price: '150 SAR', category: 'Automobile' },
    { name: 'Vehicle Vendor Hire...', price: '150 SAR', category: 'Automobile' },
    { name: 'Vehicle Vendor Hire...', price: '150 SAR', category: 'Automobile' },
    { name: 'Vehicle Vendor Hire...', price: '150 SAR', category: 'Automobile' },
    { name: 'Vehicle Vendor Hire...', price: '150 SAR', category: 'Automobile' }
  ];

  const ServiceCard = ({ service, isVehicle = false }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className={`h-32 flex items-center justify-center mx-2 mt-7 relative`}>
        <img
          className="font-semibold w-full rounded-btn object-cover"
          src="resources/product/product.svg"
          alt="building-icon"
        />
        <div className={`text-xs px-2 py-1 rounded btn-pri flex gap-1 absolute left-2 -top-4 border-2 border-white`}>
          <img
            className="font-semibold"
            src="resources/icons/tickWhite.svg"
            alt="tickWhite-icon"
          />
          <span>
            {service.category}
          </span>
        </div>
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-500 bg-[#f7f7f7] px-3 py-1 rounded-btn border border-[#e5e5e5] mt-4 w-fit">Product</p>
        <h4 className="font-medium text-gray-900 text-sm my-2 line-clamp-2">{service.name}</h4>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">{service.price}</span>
          <button className={`px-3 py-1 text-xs rounded ${isVehicle ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600' : 'bg-yellow-500 text-gray-900 hover:bg-yellow-600'
            }`}>
            {isVehicle ?
              <div className='flex gap-1'>
                <img
                  className="font-semibold"
                  src="resources/icons/add2.svg"
                  alt="add2-icon"
                />
                <span>
                  View
                </span>
              </div>
              :
              <div className='flex gap-1'>
                <img
                  className="font-semibold"
                  src="resources/icons/add2.svg"
                  alt="add2-icon"
                />
                <span>
                  View
                </span>
              </div>
            }
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Top Services</h3>
          <button className="text-blue-600 hover:text-blue-800 font-medium">View All →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Explore Services</h3>
          <button className="text-blue-600 hover:text-blue-800 font-medium">View All →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {vehicleServices.map((service, index) => (
            <ServiceCard key={index} service={service} isVehicle={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function Homepage() {


  return (

    <>
      <div className="flex-1">
        <HeroBanner />
        <CategoriesGrid />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <MeetingSchedule />
          <RecentProposals />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ProjectProgress />
          <RecentTransactions />
        </div>
        <VendorCards />
        <ServicesGrid />
      </div>
    </>
  );
}