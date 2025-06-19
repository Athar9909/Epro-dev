import React from 'react'

const AppListOfVendors = () => {
  return (
    <div>
          <div className="p-4 bg-white">
        <div className="relative">
          <img className='w-[150px] h-[150px]' src='/resources/icons/search.svg' alt="success-icon" />
            <input
                type="text"
                placeholder="Search for product, services..."
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
        </div>
    </div>
    </div>
  )
}

export default AppListOfVendors
