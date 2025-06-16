import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    User,
    Calendar,
    Heart,
    FileText,
    Search,
    ChevronRight,
    Share,
    Star,
    ChevronDown,
    Plus,
    ArrowLeft,
    Home,
    Clock,
    MessageSquareText,
    Bell,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';

const AppDashboard = () => {
    const [type, setType] = useState("product")
    const [currentView, setCurrentView] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const sidebarItems = [
        { icon: <img src="/resourcesApp/iconsApp/business.svg" alt='business-icon' />, label: 'Business Profile', section: 'ACCOUNT' },
        { icon: <img src="/resourcesApp/iconsApp/subs.svg" alt='subscription-icon' />, label: 'My Subscription', section: 'ACCOUNT' },
        { icon: <img src="/resourcesApp/iconsApp/userlogo.svg" alt='user-icon' />, label: 'My Sub-User', section: 'ACCOUNT' },
        { icon: <img src="/resourcesApp/iconsApp/offerLogo.svg" alt='offer-icon' />, label: 'My Offers', section: 'ACCOUNT' },
        { icon: <img src="/resourcesApp/iconsApp/bagLogo.svg" alt='bag-icon' />, label: 'My Order', section: 'ACCOUNT' },
        { icon: <img src="/resourcesApp/iconsApp/calenderLogo.svg" alt='offer-icon' />, label: 'Procurement Calendar', section: 'GENERAL SETTING' },
        { icon: <img src="/resourcesApp/iconsApp/heartLogo.svg" alt='heart-icon' />, label: 'My Favorites', section: 'GENERAL SETTING' },
        { icon: <img src="/resourcesApp/iconsApp/disputeLogo.svg" alt='dispute-icon' />, label: 'Dispute Case', section: 'GENERAL SETTING' },
        { icon: <img src="/resourcesApp/iconsApp/socialLogo.svg" alt='social-icon' />, label: 'Social Media Link', section: 'GENERAL SETTING' },
        { icon: <img src="/resourcesApp/iconsApp/newsLogo.svg" alt='news-icon' />, label: 'Latest News', section: 'GENERAL SETTING' },
        { icon: <img src="/resourcesApp/iconsApp/currencyLogo.svg" alt='currency-icon' />, label: 'Currency', section: 'OTHERS' },
        { icon: <img src="/resourcesApp/iconsApp/settingLogo.svg" alt='setting-icon' />, label: 'Settings', section: 'OTHERS' },
        { icon: <img src="/resourcesApp/iconsApp/absLogo.svg" alt='abs-icon' />, label: 'About Us', section: 'OTHERS' },
        { icon: <img src="/resourcesApp/iconsApp/docLogo.svg" alt='doc-icon' />, label: 'Terms & Conditions', section: 'OTHERS' },
        { icon: <img src="/resourcesApp/iconsApp/helpLogo.svg" alt='help-icon' />, label: 'Help & Support', section: 'OTHERS' },
        { icon: <img src="/resourcesApp/iconsApp/privcyLogo.svg" alt='privacy-icon' />, label: 'Privacy Policy', section: 'OTHERS' },
        { icon: <img src="/resourcesApp/iconsApp/logout.svg" alt='signout-icon' />, label: 'Sign Out', section: 'MORE ABOUT ACCOUNT' }
    ];

    const categories = [
        { name: 'Medical Equipment Service', count: '7,534 Product available', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=100&fit=crop' },
        { name: 'Spare Parts Automotive', count: '7,534 Product available', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=150&h=100&fit=crop' }
    ];

    const recommendations = [
        { id: 1, name: 'Car Rental Service', price: 150, currency: 'SAR', image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=100&h=80&fit=crop', tag: 'Automobile' },
        { id: 2, name: 'Car Rental Service', price: 150, currency: 'SAR', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=100&h=80&fit=crop', tag: 'Automobile' }
    ];

    const renderSidebar = () => (
        <AnimatePresence>
            {sidebarOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed left-0 top-0 w-full h-full bg-white z-50 overflow-y-auto"
                    >
                        <div className=" bg-[#f4f4f4]">
                            <div className="flex items-center justify-between p-6 bg-white">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center">
                                        <img src="/resourcesApp/iconsApp/userProfile.svg" alt='profile-icon' />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Guest Profile</h3>
                                        <p className="text-sm text-[#272727]">Register Now</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-3 mb-1">
                                {['ACCOUNT', 'GENERAL SETTING', 'OTHERS', 'MORE ABOUT ACCOUNT'].map((section) => (
                                    <div key={section} className='p-6 bg-white'>
                                        <h4 className="text-sm font-medium text-gray-500 mb-3">{section}</h4>
                                        <div className="space-y-1">
                                            {sidebarItems
                                                .filter(item => item.section === section)
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                                                    >
                                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                            {item.icon}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-900">{item.label}</p>
                                                            <p className="text-xs text-gray-500">Set your status and other settings</p>
                                                        </div>
                                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    const renderHomePage = () => (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white sticky top-0 z-30">
                <div className="flex items-center justify-between p-4">

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                            <img src="/resourcesApp/iconsApp/userProfile.svg" alt='profile-icon' />
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-900">Aliya Doherty</h2>
                            <p className="text-sm text-[#272727]">09 April' 25</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MessageSquareText className="w-6 h-6 text-[#272727]" />
                        <div className="relative">
                            {/* <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-xs text-white font-bold">4</span>
                            </div> */}
                        </div>
                        <Bell className="w-6 h-6 text-[#272727]" />
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="p-4 bg-white">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for product, services..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className=" px-4 bg-white border-b border-[#e5e5e5]">
                <div className="flex space-x-8 justify-between w-[90vw] mx-auto">
                    <button className={`py-3 text-gray-500 font-medium ${type === "product" ? 'border-b-4 border-[#009eb4] text-[#009eb4]' : ''}`} onClick={() => setType("product")} >Products</button>
                    <button className={`py-3 text-gray-500 ${type === "service" ? 'border-b-4 border-[#009eb4] text-[#009eb4]' : ''}`} onClick={() => setType("service")}>Services</button>
                    <button className={`py-3 text-gray-500 ${type === "rental" ? 'border-b-4 border-[#009eb4] text-[#009eb4]' : ''}`} onClick={() => setType("rental")}>Rental</button>
                </div>
            </div>

            {/* Product Categories */}
            {
                type == "product" &&
                <div className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Product Categories</h3>
                        <div className="flex items-center gap-1 text-[#272727]">
                            <span className="text-sm font-medium">Show all</span>
                            <ArrowRight className="w-5 h-5 bg-[#F4C63B] text-black rounded-full p-1" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((category, index) => (
                            <Link
                                to="/User-App/Categories" key={index} className="border border-[#e5e5e5] rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">{category.name}</h4>
                                <p className="text-sm text-[#272727] mb-3">{category.count}</p>
                                <div className="w-full h-20 bg-gray-200 rounded-lg overflow-hidden">
                                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            }
            {/* Service Categories */}
            {
                type == "service" &&
                <div className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Service Categories</h3>
                        <div className="flex items-center gap-1 text-[#272727]">
                            <span className="text-sm font-medium">Show all</span>
                            <ArrowRight className="w-5 h-5 bg-[#F4C63B] text-black rounded-full p-1" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((category, index) => (
                            <Link
                                to="/User-App/Categories" key={index} className="border border-[#e5e5e5] rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">{category.name}</h4>
                                <p className="text-sm text-[#272727] mb-3">{category.count}</p>
                                <div className="w-full h-20 bg-gray-200 rounded-lg overflow-hidden">
                                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            }
            {/* Rental Categories */}
            {
                type == "rental" &&
                <div className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Rental Categories</h3>
                        <div className="flex items-center gap-1 text-[#272727]">
                            <span className="text-sm font-medium">Show all</span>
                            <ArrowRight className="w-5 h-5 bg-[#F4C63B] text-black rounded-full p-1" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((category, index) => (
                            <Link
                                to="/User-App/Categories" key={index} className="border border-[#e5e5e5] rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">{category.name}</h4>
                                <p className="text-sm text-[#272727] mb-3">{category.count}</p>
                                <div className="w-full h-20 bg-gray-200 rounded-lg overflow-hidden">
                                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            }

            {/* Create Purchase Banner */}
            <div className="p-4 bg-white my-4">
                <div className="bg-gradient-to-r bg-[url('/resources/images/Banner.svg')] object-contain from-[#009eb4] to-blue-600 rounded-lg p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">Create Purchase</h3>
                        <p className="text-sm opacity-90 mb-4">Streamline your workflow with winning proposals that leave an impression.</p>
                        <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Create Purchase
                        </button>
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 bg-white mb-20">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recommendation for you</h3>
                    <div className="flex items-center gap-1 text-[#272727]">
                        <span className="text-sm font-medium">Show all</span>
                        <ArrowRight className="w-5 h-5 bg-[#F4C63B] text-black rounded-full p-1" />
                    </div>
                </div>
                <div className="space-y-4">
                    {recommendations.map((item) => (
                        <Link
                            state={item}
                            to="/User-App/Products/Product-Details"
                            key={item.id} className="border border-[#e5e5e5] rounded-lg p-4 flex items-center gap-4">
                            <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="inline-block bg-white border border-[#e5e5e5] text-[#009eb4] px-2 py-1 rounded text-xs font-medium mb-1">
                                    {item.tag}
                                </div>
                                <h4 className="font-medium text-gray-900">{item.name}</h4>
                                <p className="text-sm text-[#272727]">Lorem Ipsum is Simply Dummy Text Of The Printing</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">{item.price} {item.currency}</p>
                                <button className="bg-yellow-400 text-gray-900 px-3 py-1 rounded text-sm font-medium mt-1">
                                    + View
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <AppNavbar />
        </div>
    );



    return (
        <div className="max-w-3xl mx-auto bg-[#f4f4f4] shadow-2xl relative overflow-hidden">
            {renderSidebar()}

            {currentView === 'home' && renderHomePage()}
            {/* {currentView === 'product' && renderProductDetail()} */}

            {/* Floating Action Button */}
            {/* <button
                onClick={() => setCurrentView(currentView === 'home' ? 'product' : 'home')}
                className="fixed bottom-24 right-6 w-14 h-14 bg-teal-500 rounded-full shadow-lg flex items-center justify-center text-white z-40"
            >
                {currentView === 'home' ? <Search className="w-6 h-6" /> : <Home className="w-6 h-6" />}
            </button> */}
        </div>
    );
};

export default AppDashboard;