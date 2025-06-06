export default function Sidebar({ isOpen, setIsOpen }) {
    const menuItems = [
        { icon: '/resources/icons/home.svg', label: 'Dashboard', active: true },
        { icon: '/resources/icons/category.svg', label: 'Categories' },
        { icon: '/resources/icons/users.svg', label: 'Vendors' },
        { icon: '/resources/icons/document.svg', label: 'Documents' },
        { icon: '/resources/icons/calender.svg', label: 'Meetings' },
        { icon: '/resources/icons/users.svg', label: 'Sub-Users' },
        { icon: '/resources/icons/scale.svg', label: 'Project Timeline' },
        { icon: '/resources/icons/order.svg', label: 'Orders' },
        { icon: '/resources/icons/calender.svg', label: 'Procurement Calendar' },
        { icon: '/resources/icons/message.svg', label: 'Message' }
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
            <div className={`fixed left-0 top-0 z-50 h-[100vh] w-full bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${isOpen ? 'translate-x-0' : '-translate-x-full overflow-y-auto hide-scrollbar'
                }`}>
                <div className="flex items-center space-x-2 p-4  border-gray-200">
                    <img
                        className="font-semibold"
                        src="resources/logo/logo.svg"
                        alt="people"
                    />
                </div>

                <nav className="p-2 space-y-2">
                    {menuItems.map((item, index) => (
                        <div className={`py-2 rounded-md
                        ${item.active
                                ? 'bg-[#009EB4] text-white'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}>
                            <div
                                key={index}
                                className={`w-full px-3 py-2 text-left transition-colors flex justify-between items-center `}
                            >
                                <div className="flex gap-1 justify-start items-start">
                                    <img
                                        className="font-semibold"
                                        src={item.icon}
                                        alt="people"
                                    />
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                {
                                    !item?.active ?
                                        <img
                                            className="font-semibold"
                                            src="resources/icons/downChevron.svg"
                                            alt="people"
                                        />
                                        :
                                        <img
                                            className="font-semibold"
                                            src="resources/icons/downChevronWhite.svg"
                                            alt="people"
                                        />}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
};