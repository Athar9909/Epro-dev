import { ArrowUpDown, ChevronLeft, Minus, Plus, SlidersHorizontal } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { Search, Filter, X, Star, ChevronDown } from 'lucide-react';

const AppProductList = () => {
    // const [count, setCount] = useState(0)
    const navigate = useNavigate()
    const [type, setType] = useState("product")
    // const [count, setCount] = useState(0)
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    // const [selectedSort, setSelectedSort] = useState('All Product');
    const [activeFilter, setActiveFilter] = useState('price');
    const [services, setServices] = useState([
        { id: 1, count: 0, name: 'Fineone FE-0034 Gold Cardio Pro Stethoscope', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
        { id: 2, count: 0, name: 'Fineone FE-0034 Gold Cardio Pro Stethoscope', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
        { id: 3, count: 0, name: 'MCP PHOENIX ST-PX03 Premium Rose Gold plate...', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
        { id: 4, count: 0, name: 'MCP PHOENIX ST-PX03 Premium Rose Gold plate...', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
        { id: 5, count: 0, name: 'MCP PHOENIX ST-PX03 Premium Rose Gold plate...', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
        { id: 6, count: 0, name: 'MedTech Ultra-Quiet Digital Stethoscope', price: '300 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
        { id: 7, count: 0, name: 'MCP PHOENIX ST-PX03 Premium Rose Gold plate...', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' },
        { id: 8, count: 0, name: 'MCP PHOENIX ST-PX03 Premium Rose Gold plate...', price: '150 SAR', category: 'Medical | Equipment', tag: 'INSTOCK' }
    ])

    const handleIncrement = (id) => {
        setServices(services.map(card =>
            card.id === id ? { ...card, count: card.count + 1 } : card
        ));
    };

    const handleDecrement = (id) => {
        setServices(services.map(card =>
            card.id === id ? { ...card, count: Math.max(0, card.count - 1) } : card
        ));
    };

    const ServiceCard = ({ service }) => (
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
    );


    const renderFilterContent = () => {
        switch (activeFilter) {
            case 'price':
                return (
                    <div className="space-y-2">
                        {['Below 20 SAR', '20 SAR - 30 SAR', '30 SAR - 40 SAR', '40 SAR - 50 SAR', '50 SAR - 60 SAR'].map((priceRange) => (
                            <label key={priceRange} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="price"
                                    className="rounded-full"
                                />
                                <span className="text-sm text-gray-700">{priceRange}</span>
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

    const FilterSection = () => (
        <>
            {/* Header */}
            <div className="flex gap-1 py-6 pl-3 bg-white">
                <ChevronLeft className="text-lg" onClick={() => setIsMobileFilterOpen(false)} />
                <p className="text-xl">Filter</p>
            </div>

            <div className='flex'>
                {/* Left sidebar */}
                <div className='w-[30vw] bg-[#f4f4f4] h-[calc(100vh-120px)] flex flex-col items-center space-y-6'>
                    <div className=' w-full text-center'>
                        <button
                            className={`w-full ${activeFilter === 'price' ? 'bg-white font-medium py-10' : 'py-10'}`}
                            onClick={() => setActiveFilter('price')}
                        >
                            Price
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
                    <button className="flex justify-center items-center gap-1 border border-[#009eb4] text-[#009be4] w-[30vw] p-4 rounded-[10px]">
                        Reset
                    </button>
                    <button className="flex justify-center items-center gap-1 bg-[#009eb4] text-white w-[70vw] p-4 rounded-[10px]">
                        Apply Filter
                    </button>
                </div>
            </div>
        </>

    )
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="flex-1">
                <div className="flex gap-1 py-6 pl-3 bg-white">
                    <ChevronLeft className="text-lg" onClick={() => navigate(-1)} />
                    <p className="text-xl">
                        Product Listing
                    </p>
                </div>

                {/* Hero Banner */}
                <div className="p-4">
                    <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold mb-2">Find What You Need</h2>
                            <p className="text-sm opacity-90">Browse over 1,000 curated categories to find high quality Products tailored for your business.</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className=" px-4">
                    <div className="flex space-x-8 w-full justify-center border-b border-[#e5e5e5]">
                        <button className={`py-3 text-gray-500 w-full font-medium ${type === "product" ? 'border-b-2 border-teal-600 text-teal-600' : ''}`} onClick={() => setType("product")} >List by Products</button>
                        <button className={`py-3 text-gray-500 w-full ${type === "vendor" ? 'border-b-2 border-teal-600 text-teal-600' : ''}`} onClick={() => setType("vendor")}>List by Vendors</button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 px-2 pb-6">
                    {services.map((service, index) => (
                        <ServiceCard key={`service-${index}`} service={service} />
                    ))}
                </div>
            </div>

            {/* Mobile Filter Overlay */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* <div className="absolute inset-0 bg-black/60 bg-opacity-50" onClick={() => setIsMobileFilterOpen(false)} /> */}
                    <div className="absolute top-0 left-0 h-full max-w-[100vw] bg-white transition-all ease-in shadow-xl overflow-y-auto hide-scrollbar">
                        <FilterSection isMobile={true} />
                    </div>
                </div>
            )}

            {/* Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-md">
                <div className="flex items-center justify-around">
                    <button className="flex flex-col items-center gap-1 text-[#009eb4]">
                        <ArrowUpDown className="w-5 h-5" />
                        <span className="text-xs font-medium">Sort</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-gray-400"
                        onClick={() => setIsMobileFilterOpen(true)}>
                        <SlidersHorizontal className="w-5 h-5" />
                        <span className="text-xs">Filter</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppProductList;