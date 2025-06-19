import { ChevronLeft } from "lucide-react";
import { useState } from "react";

const AppDocumentFilter = ({isFilterOpen, setIsFilterOpen}) => {
    const [activeFilter, setActiveFilter] = useState('status');

    const renderFilterContent = () => {      
        switch (activeFilter) {
            case 'status':
                return (
                    <div className="space-y-2">
                        {['All', 'Approved', 'Rejected', 'Approval Pending'].map((status) => (
                            <label key={status} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="price"
                                    className="rounded-full"
                                />
                                <span className="text-sm text-gray-700">{status}</span>
                            </label>
                        ))}
                    </div>
                );
            case 'category':
                return (
                    <div className="space-y-2">
                        {['Diagnostics', 'Laboratory', 'Treatment', 'Monitoring', 'Surgical'].map((category) => (
                            <label key={category} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="category"
                                    className="rounded-full"
                                />
                                <span className="text-sm text-gray-700">{category}</span>
                            </label>
                        ))}
                    </div>
                );
            case 'rating':
                return (
                    <div className="space-y-2">
                        {['1.0 to 2.0', '2.0 to 3.0', '3.0 to 4.0', '4.0 to 5.0'].map((rating, index) => (
                            <label key={`${rating}-${index}`} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="rating"
                                    className="rounded-full"
                                />
                                <span className="text-sm text-gray-700">{rating}</span>
                            </label>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <>
            {/* Header */}
            <div className="flex gap-1 py-6 pl-3 bg-white">
                <ChevronLeft className="text-lg" onClick={() => setIsFilterOpen(false)} />
                <p className="text-xl">Filter</p>
            </div>

            <div className='flex'>
                {/* Left sidebar */}
                <div className='w-[30vw] bg-[#f4f4f4] h-[calc(100vh-120px)] flex flex-col items-center space-y-6'>
                    <div className=' w-full text-center'>
                        <button
                            className={`w-full ${activeFilter === 'status' ? 'bg-white font-medium py-10' : 'py-10'}`}
                            onClick={() => setActiveFilter('status')}
                        >
                            Status
                        </button>
                    </div>
                    <div className='w-full text-center'>
                        <button
                            className={`w-full py-2 ${activeFilter === 'category' ? 'bg-white font-medium py-10' : 'py-10'}`}
                            onClick={() => setActiveFilter('category')}
                        >
                            Category
                        </button>
                    </div>
                    <div className='w-full text-center'>
                        <button
                            className={`w-full py-2 ${activeFilter === 'rating' ? 'bg-white font-medium py-10' : 'py-10'}`}
                            onClick={() => setActiveFilter('rating')}
                        >
                            Rating
                        </button>
                    </div>
                </div>

                {/* Right content */}
                <div className='w-[70vw] px-4 py-6'>
                    <h3 className="font-semibold text-[#272727] mb-3 capitalize">
                        {activeFilter === 'price' && ''}
                        {activeFilter === 'category' && ''}
                        {activeFilter === 'rating' && ''}
                    </h3>
                    {renderFilterContent()}
                </div>
            </div>

            {/* Bottom Buttons */}
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
        </>
    )
}


export default AppDocumentFilter