import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);

    useEffect(() => {
        setActive(location.pathname);
    }, [location.pathname]);

    const menuItems = [
        { path: "/Dashboard", icon: '/resources/icons/home.svg', label: 'Dashboard' },
        { path: "/Dashboard/Categories", icon: '/resources/icons/category.svg', label: 'Categories' },
        { path: "/Dashboard/Vendor-Details", icon: '/resources/icons/users.svg', label: 'Vendors' },
        { path: "/Dashboard/Documents/SOW", icon: '/resources/icons/document.svg', label: 'Documents' },
        { path: "/Dashboard/Meeting", icon: '/resources/icons/calender.svg', label: 'Meetings' },
        { path: "/Dashboard/Product-Listing/4", icon: '/resources/icons/users.svg', label: 'Sub-Users' },
        { path: "/Dashboard/Product-Listing/5", icon: '/resources/icons/scale.svg', label: 'Project Timeline' },
        { path: "/Dashboard/Product-Listing/6", icon: '/resources/icons/order.svg', label: 'Orders' },
        { path: "/Dashboard/Product-Listing/7", icon: '/resources/icons/calender.svg', label: 'Procurement Calendar' },
        { path: "/Dashboard/Product-Listing/8", icon: '/resources/icons/msg.svg', label: 'Message' }
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed left-0 top-0 z-50 h-screen w-full bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${isOpen ? 'translate-x-0' : '-translate-x-full overflow-y-auto hide-scrollbar'
                }`}>
                <div className="flex items-center space-x-2 px-4 py-[21.5px]">
                    <img src="/resources/logo/logo.svg" alt="logo" />
                </div>

                <nav className="p-2 space-y-2">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            onClick={() => {setActive(item.path); setIsOpen(false)}}
                            className={`block rounded-md transition-colors duration-200 ${active === item.path
                                ? 'bg-[#009EB4] text-white'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <div className="w-full px-3 py-3 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <img src={item.icon} alt={`${item.label} icon`} />
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                <img
                                    src={active === item.path
                                        ? "/resources/icons/downChevronWhite.svg"
                                        : "/resources/icons/downChevron.svg"}
                                    alt="chevron"
                                />
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}
