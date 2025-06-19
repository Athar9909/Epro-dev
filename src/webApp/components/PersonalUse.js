/* eslint-disable no-undef */

<>
// ================== {/* Search Bar */}===========================
      {/* Search Bar */}
      <div className="px-4 pb-4 bg-white">
        <div className="relative">
          <img className='absolute left-3 top-1/2 transform -translate-y-1/2' src="/resourcesApp/iconsApp/search.svg" alt="search-icon" />
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-[10px] text-sm"
          />
        </div>
      </div>


// =================== Product Card ======================

    <div
        className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col p-2">
        <Link
            to="/User-App/Product-Details"
            className="flex-grow">
            <div className="h-34 flex items-center justify-center relative mb-4">
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
            <h4 className="font-medium text-[#272727] text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
                {service.name}
            </h4>
        </Link>
        <hr className="text-gray-200 mb-2" />
        <div className="p-2 pt-0">
            <span className='text-sm text-[#009EB4]'>Per Price</span>
            <p className="font-bold text-[#272727] text-xl">{service.price}</p>
            {
                service?.count < 1 ? (
                    <button className=" w-full mt-1 px-3 py-3 text-xs rounded-md flex items-center gap-1 bg-yellow-500 text-[#272727] hover:bg-yellow-600 transition-colors justify-center"
                        onClick={() => handleIncrement(service.id)}>
                        <img
                            className="font-semibold"
                            src="/resources/icons/add2.svg"
                            alt="add-icon"
                        />
                        <span>Add to Cart</span>
                    </button>
                ) : (
                    <div className=" w-full mt-1 px-3 py-3 text-xs rounded-md flex items-center gap-1 border border-[#e5e5e5] text-[#272727] transition-colors justify-between">
                        <Plus onClick={() => handleIncrement(service.id)} />
                        <span className='text-lg'>{service.count}</span>
                        <Minus onClick={() => handleDecrement(service.id)} />
                    </div>

                )
            }
        </div>
    </div>


// =================== Vendor Card ======================

    <div className="bg-white rounded-lg p-4 border-2 border-[#e5e5e5] hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12  flex items-center justify-center">
                <img
                    className="font-semibold"
                    src="/resources/icons/vendorComp.svg"
                    alt="vendorComp"
                />
            </div>
            <div>
                <span className="btn-pri text-xs px-2 py-1 mx-1 rounded">Active</span>
                <span className="btn-pri text-xs px-2 py-1 rounded">Active</span>
                <h4 className="font-medium text-gray-900 mb-1">Al-Karim Pvt Ltd</h4>
                <h4 className="font-medium text-gray-500 mb-1 text-xs">Karim Hussain Jannat </h4>
            </div>
            <div>
                <div className="flex items-center space-x-2 mb-2 border-2 border-[#e5e5e5] bg-[#f7f7f7] p-1 rounded-md ">
                    <img
                        className="font-semibold"
                        src="/resources/icons/star.svg"
                        alt="star"
                    />
                    <span className="text-sm text-gray-600">4</span>
                </div>
                <div className="flex items-center justify-center space-x-2 mb-2 border-2 border-[#e5e5e5] bg-[#f7f7f7] p-1 rounded-md ">
                    <img
                        className="font-semibold w-6 h-6"
                        src="/resources/icons/buildingActive.svg"
                        alt="buildingActive-icon"
                    />
                </div>
            </div>
        </div>



        <div className="flex items-center justify-between text-xs text-gray-500 w-full gap-2">
            <button className='bg-[#009eb5] w-full py-1 text-white rounded-[6px]'>✓ Certified</button>
            <button className='bg-[#009eb5] w-full py-1 text-white rounded-[6px]'>ID: 12345</button>
        </div>
    </div >



// =================== X axis scrollable headings ======================

    <AnimatePresence>
        <div className="relative overflow-x-scroll">
            <motion.div
                className="flex gap-4 py-2 px-4"
                drag="x"
                dragConstraints={{ right: 0, left: -600 }} // Adjust based on your content width
                whileTap={{ cursor: "grabbing" }}
            >
                <div className="flex-shrink-0 text-center p-3 rounded-lg bg-[#009EB41A] w-[50vw]">
                    <div className="text-lg font-bold text-[#009EB4] w-full">$ 104.52</div>
                    <div className="text-sm text-gray-600">1 - 500 Pieces</div>
                </div>
                <div className="flex-shrink-0 text-center p-3 rounded-lg bg-[#009EB41A] w-[50vw]">
                    <div className="text-lg font-bold text-[#009EB4]">$ 104.52</div>
                    <div className="text-sm text-gray-600">500 - 1000 Pieces</div>
                </div>
                <div className="flex-shrink-0 text-center p-3 rounded-lg bg-[#009EB41A] w-[50vw]">
                    <div className="text-lg font-bold text-[#009EB4]">$ 104.52</div>
                    <div className="text-sm text-gray-600">1000 - 5000 Pieces</div>
                </div>
            </motion.div>
        </div>
    </AnimatePresence>

    // =================== Buttons ======================

    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4">
        <div className='flex gap-4'>
            <button className="flex justify-center items-center gap-1 border border-[#009eb4] text-[#009eb4] w-[30vw] p-4 rounded-[10px]">
                Reset
            </button>
            <button className="flex justify-center items-center gap-1 bg-[#009eb4] text-white w-[70vw] p-4 rounded-[10px]">
                Apply Filter
            </button>
        </div>
    </div>

    <div className='w-[95vw] mx-auto fixed bottom-2 right-0 left-0'>
        <button
            onClick={() => setCurrentView('add')}
            className='w-full bg-[#009eb4] text-white py-4 rounded-lg font-medium text-lg flex justify-center items-center gap-2'
        >
            <img src='/resources/icons/addWhite.svg' alt='add-icon' />
            <span>
                Add New Meeting
            </span>
        </button>
    </div>


    {/* Bottom indicator */}
    <div className="flex justify-center pb-4">
        <div className="w-32 h-1 bg-[#272727] rounded-full"></div>
    </div>






</>

