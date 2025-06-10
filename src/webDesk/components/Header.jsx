export default function Header({ setSidebarOpen }) {
    return (
        <>
            <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between fixed right-0 top-0 w-full lg:w-[80%] z-10">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Hello, Zakir Ali</h1>
                    <p className="text-sm text-gray-500">Let's check your store today</p>
                </div>
                <div className="flex items-center ">
                    <div className="flex items-center space-x-2 bg-[#f6f6f6] p-2 rounded-btn border-[#e5e5e5] border">
                        <img
                            className="font-semibold"
                            src="/resources/icons/search.svg"
                            alt="search"
                        />
                        <input className=" text-gray-600 hover:text-gray-900 outline-none" placeholder="Search" />
                    </div>

                    <button className="relative pl-2 text-gray-600 hover:text-gray-900">
                        <div className="flex items-center bg-[#f3f3f3] p-3 rounded-btn border-[#e5e5e5] border">
                            <img src='/resources/icons/bell.svg' alt='bell.svg' className="w-4 h-4" />
                        </div>
                        {/* <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span> */}
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900">
                        <div className="flex items-center bg-[#f3f3f3] p-3 rounded-btn border-[#e5e5e5] border">
                            <img src='/resources/icons/message.svg' alt='message.svg' className="w-4 h-4" />
                        </div>
                    </button>
                    <div className="flex items-center space-x-2 bg-[#f3f3f3] rounded-btn p-[4px] border-[#e5e5e5] border">
                        <img src='/resources/icons/user-img.svg' alt='user-img.svg' />
                        <div className="flex flex-col">
                            <p className="text-gray-700 text-sm inline-block">Zakir Khan</p>
                            <p className="text-gray-700 text-xs inline-block">Zakirkhna@gmail.com</p>
                        </div>
                        <img
                            className="font-semibold"
                            src="/resources/icons/downChevron.svg"
                            alt="downChevron"
                        />
                    </div>
                </div>
                {/* Small Header */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden top-4 left-4 z-30 p-2 bg-[#f3f3f3] rounded-btn border border-[#e5e5e5]"
                >
                    <span className="text-xl">☰</span>
                </button>
            </header>
        </>
    );
};