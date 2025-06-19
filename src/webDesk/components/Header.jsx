import { LogOut } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useClickAway } from "react-use";
import { GetMainUserData } from "../../Redux-config/slices/userSlices";
import { logoutUser } from "../../Redux-config/slices/authSlice";

const accountLinks = [
  { icon: "profile.svg", label: "My Profile" },
  { icon: "bussinessPro.svg", label: "My Business Profile" },
  { icon: "subsPlan.svg", label: "Subscription Plan" },
  { icon: "dispute.svg", label: "Dispute Case" },
  { icon: "news.svg", label: "Latest News" },
  { icon: "currency.svg", label: "Currency" },
  { icon: "settings.svg", label: "Settings" },
  { icon: "about.svg", label: "About Us" },
  { icon: "about.svg", label: "Terms & Conditions" },
  { icon: "privacy.svg", label: "Privacy & Policy" },
  { icon: "help.svg", label: "Help & Support" },
];

export default function Header({ setSidebarOpen }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);

  console.log(userData);

  // Memoized fetch user data function
  const fetchUserData = useCallback(() => {
    dispatch(GetMainUserData());
  }, [dispatch]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useClickAway(menuRef, () => {
    setShowMenu(false);
  });

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/Login");
  };

  const toggleMenu = () => setShowMenu((v) => !v);
  const toggleSidebar = () => setSidebarOpen(true);

  // Extract user details with fallbacks
  const userName = userData?.name || "Guest";
  const userEmail = userData?.email || "guest@example.com";
  const firstName = userName.split(" ")[0];

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
      {/* Left side */}
      <div className="ml-10 lg:ml-0">
        <h1 className="text-xl font-semibold text-gray-900">
          Hello, {firstName}
        </h1>
        <p className="text-sm text-gray-500">Let's check your store today</p>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-3">
        {/* Search */}
        <div className="hidden md:flex items-center space-x-2 bg-gray-100 p-2 rounded-lg border border-gray-200">
          <img
            src="/resources/icons/search.svg"
            alt="search"
            className="w-4 h-4"
            loading="lazy"
          />
          <input
            className="bg-transparent outline-none text-sm text-gray-600 w-32 md:w-40"
            placeholder="Search"
          />
        </div>

        {/* Notifications */}
        <button
          className="p-2 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200"
          aria-label="Notifications">
          <img
            src="/resources/icons/bell.svg"
            alt="notifications"
            className="w-4 h-4"
            loading="lazy"
          />
        </button>

        {/* Messages */}
        <button
          className="p-2 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200"
          aria-label="Messages">
          <img
            src="/resources/icons/message.svg"
            alt="messages"
            className="w-4 h-4"
            loading="lazy"
          />
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg border border-gray-200 hover:bg-gray-200"
            aria-expanded={showMenu}
            aria-label="User menu">
            <img
              src="/resources/icons/user-img.svg"
              alt="user avatar"
              className="w-8 h-8 rounded-full"
              loading="lazy"
            />
            <div className="hidden md:block text-left">
              <p className="text-gray-700 text-sm">{userName}</p>
              <p className="text-gray-500 text-xs">{userEmail}</p>
            </div>
            <img
              src="/resources/icons/downChevron.svg"
              alt="toggle menu"
              className="w-3 h-3 inline-block"
              loading="lazy"
            />
          </button>

          {/* Dropdown panel */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-2 no-scrollbar">
              {/* Switch Account */}
              <div className="p-3 border-b rounded-lg border-gray-100 bg-gray-50 mb-2">
                <h3 className="text-sm font-semibold mb-2">Switch Account</h3>
                <ul>
                  <li className="flex items-center justify-between py-2 rounded-lg border-gray-100 bg-white px-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/resources/icons/user-img.svg"
                        alt=""
                        className="w-6 h-6 rounded-full"
                        loading="lazy"
                      />
                      <div className="text-xs">
                        <p>{userName}</p>
                        <p className="text-gray-400">{userEmail}</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      checked
                      readOnly
                      className="form-radio text-blue-500"
                    />
                  </li>
                  <li className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/resources/icons/user-img.svg"
                        alt=""
                        className="w-6 h-6 rounded-full"
                        loading="lazy"
                      />
                      <div className="text-xs">
                        <p>Halal Pvt Ltd</p>
                        <p className="text-gray-400">admin@halal.com</p>
                      </div>
                    </div>
                    <input type="radio" className="form-radio text-blue-500" />
                  </li>
                </ul>
              </div>

              {/* My Account Links */}
              <div className="max-h-96 overflow-y-auto">
                <div className="p-3 space-y-1 border-gray-100 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold mb-2">My Account</h3>

                  {accountLinks.map(({ icon, label }) => (
                    <Link
                      to="#"
                      key={label}
                      className="flex items-center space-x-3 text-md text-gray-700 bg-white rounded-lg hover:bg-gray-100 px-3 py-2">
                      <img
                        src={`/resources/menuIcons/${icon}`}
                        alt={label}
                        className="w-6 h-6 flex-shrink-0"
                        loading="lazy"
                      />
                      <span>{label}</span>
                    </Link>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 text-md text-gray-700 bg-white rounded-lg hover:bg-gray-100 px-3 py-2 w-full">
                    <LogOut className="w-5 h-5 ml-1 flex-shrink-0" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 bg-gray-100 rounded-lg border border-gray-200"
        aria-label="Open sidebar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </header>
  );
}
