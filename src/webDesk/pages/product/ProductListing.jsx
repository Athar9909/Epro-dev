import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Search, Filter, X, Star, ChevronDown } from 'lucide-react';

const ProductListing = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('All Product');

  const services = [
    { name: 'Fineone FE-0034 Gold Cardio Pro Stethoscope', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
    { name: 'Fineone FE-0034 Gold Cardio Pro Stethoscope', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
    { name: 'MCP PHOENIX ST-PX03 Premium Rose Gold plate...', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
    { name: 'MCP PHOENIX ST-PX03 Premium Rose Gold plate...', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
    { name: 'MCP PHOENIX ST-PX03 Premium Rose Gold plate...', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
    { name: 'MedTech Ultra-Quiet Digital Stethoscope', price: '300 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
    { name: 'MCP PHOENIX ST-PX03 Premium Rose Gold plate...', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
    { name: 'MCP PHOENIX ST-PX03 Premium Rose Gold plate...', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' }
  ];

  const ServiceCard = ({ service }) => (
    <Link
    to="/Dashboard/Categories/Sub-Categories/Product-Details"
     className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col p-2">
      <div className="flex-grow">
        <div className="h-52 flex items-center justify-center relative mb-4">
          <img
            className="w-full h-full object-cover rounded-xl bg-gray-100"
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop"
            alt={service.name}
          />
          <div className="text-xs px-2 py-1 rounded btn-pri text-white flex items-center gap-1 absolute left-2 top-2 border border-white">
            <img
              className="w-3 h-3"
              src="/resources/icons/tickWhite.svg"
              alt="verified"
            />
            <span>{service.tag}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200 w-fit mb-2">
          {service.category}
        </p>
        <h4 className="font-medium text-gray-900 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
          {service.name}
        </h4>
      </div>
      <hr className="text-gray-200 mb-2" />
      <div className="p-2 pt-0">
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900 text-xl">{service.price}</span>
          <button className="px-3 py-2 text-xs rounded-md flex items-center gap-1 bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-colors">
             <img
              className="font-semibold"
              src="/resources/icons/add2.svg"
              alt="add-icon"
            />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </Link>
  );

  const FilterSection = ({ isMobile = false }) => (
    <div className={` ${isMobile ? 'p-4' : ''}`}>
      {/* Price Filter */}
      <div className="mb-6 px-2 pt-2 pb-6 border rounded-xl border-[#e7e7e7] bg-white">
        <h3 className="font-semibold text-gray-900 mb-3">Filter By Price</h3>
        <hr className='text-[#e7e7e7] my-2' />
        <div className="flex gap-2">
          <div className=''>
            <label>Min</label>
            <input
              type="text"
              placeholder="-"
              className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md text-sm outline-none"
            />
          </div>
          <div>
            <label>Max</label>
            <input
              type="text"
              placeholder="-"
              className="w-full px-3 py-2 border border-[#e5e5e5] rounded-md text-sm outline-none"
            />
          </div>
        </div>
      </div>

      {/* Suppliers Types */}
      <div className="mb-6 px-2 pt-2 pb-6 border rounded-xl border-[#e7e7e7] bg-white">
        <h3 className="font-semibold text-gray-900 mb-3">Suppliers Types</h3>
        <hr className='text-[#e7e7e7] my-2' />
        <div className="space-y-2 ">
          <label className="flex items-center gap-2 justify-between">
            <div>
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-gray-700 pl-2">Verified Vendor</span>
            </div>
            <img
              className="font-semibold"
              src="/resources/icons/certified.svg"
              alt="certified"
            />
          </label>
          <label className="flex items-center gap-2 justify-between">
            <div>
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-gray-700 pl-2">Trade Assurance</span>
            </div>
            <img
              className="font-semibold"
              src="/resources/icons/certified.svg"
              alt="certified"
            />
          </label>
        </div>
      </div>

      {/* Filters Types */}
      <div className="mb-6 px-2 pt-2 pb-6 border rounded-xl border-[#e7e7e7] bg-white">
        <h3 className="font-semibold text-gray-900 mb-3">Filters Types</h3>
        {/* Search */}
        <div className="mb-4">
          <div className="relative px-3 py-2 border border-[#e5e5e5] rounded-md text-sm flex gap-1 items-start">
            <img
              className="font-semibold"
              src="/resources/icons/search.svg"
              alt="search"
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-1 mb-4">
          {['Categories 01', 'Categories 02', 'Categories 03', 'Categories 04', 'Categories 05'].map((cat, idx) => (
            <div key={cat} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{cat}</span>
              <span className="text-gray-500">{idx === 0 ? '149' : idx <= 2 ? '882' : idx === 3 ? '20' : '43'}</span>
            </div>
          ))}
        </div>

        {/* Search 2 */}
        <div className="mb-4">
          <div className="relative px-3 py-2 border border-[#e5e5e5] rounded-md text-sm flex gap-1 items-start">
            <img
              className="font-semibold"
              src="/resources/icons/search.svg"
              alt="search"
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Categories 2 */}
        <div className="space-y-1 mb-6">
          {['Categories 01', 'Categories 02', 'Categories 03', 'Categories 04', 'Categories 05'].map((cat, idx) => (
            <div key={`cat2-${cat}`} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{cat}</span>
              <span className="text-gray-500">{idx === 0 ? '149' : idx <= 2 ? '882' : idx === 3 ? '20' : '43'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6 px-2 pt-2 pb-6 border rounded-xl border-[#e7e7e7] bg-white">
        <h3 className="font-semibold text-gray-900 mb-3">Filters Types</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2">
              <input type='checkbox' />
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className="w-4 h-4"
                    src={
                      i < rating
                        ? '/resources/icons/star.svg' // filled star
                        : '/resources/icons/emptyStar.svg' // empty star
                    }
                    alt="star"
                  />
                ))}
              </div>
              <span className="ml-auto text-xs text-gray-500">4.8</span>
            </label>
          ))}
        </div>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto p-4">
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSection />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Available Product</h1>
                  <p className="text-gray-600">We found 149 amazing Product in Medical Cateries</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 bg-[#f7f7f7] p-2 rounded-md border border-[#e5e5e5]">
                      <img
                        className="font-semibold"
                        src="/resources/icons/quote.svg"
                        alt="quote"
                      />
                      Quote (01)
                    </div>
                    <div className="flex items-center gap-1 bg-[#f7f7f7] p-2 rounded-md border border-[#e5e5e5]">
                      <img
                        className="font-semibold"
                        src="/resources/icons/bag.svg"
                        alt="bag"
                      />
                      PR (01)
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Sort Bar */}
              <div className="flex flex-row-reverse lg:flex-row gap-4 items-center">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-md w-full sm:w-auto justify-center border border-[#e5e5e5] bg-white"
                > <img
                    className="font-semibold w-fit"
                    src="/resources/icons/filter.svg"
                    alt="filter"
                  />
                  Filters
                </button>

                {/* Search Bar */}
                <div className="relative px-3 py-[14px] border bg-white border-[#e5e5e5] rounded-md text-sm flex gap-1 items-start w-full">
                  <img
                    className="font-semibold"
                    src="/resources/icons/search.svg"
                    alt="search"
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full outline-none"
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="relative w-full sm:w-54">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option>Sort By: All Product</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                  {/* <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" /> */}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {services.map((service, index) => (
                <ServiceCard key={`service-${index}`} service={service} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/60 bg-opacity-50" onClick={() => setIsMobileFilterOpen(false)} />
            <div className="absolute top-0 left-0 h-full w-92 max-w-[85vw] bg-white transition-all ease-in shadow-xl overflow-y-auto hide-scrollbar">
              <FilterSection isMobile={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;