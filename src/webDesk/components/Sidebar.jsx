import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftFromLine,
  ArrowRightSquare,
  MenuIcon,
  MenuSquare,
  MoveRight,
} from "lucide-react";

export default function Sidebar({
  collapsed,
  setCollapsed,
  isMobile,
  closeMobile,
}) {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState([]);

  const menuItems = [
    {
      path: "/Dashboard",
      icon: "/resources/icons/home.svg",
      label: "Dashboard",
      exact: true,
    },
    {
      path: "/Dashboard/Categories",
      icon: "/resources/icons/category.svg",
      label: "Categories",
    },
    {
      icon: "/resources/icons/users.svg",
      label: "Vendors",
      //   submenu: [
      //     { path: "/Dashboard/Vendor-Details", label: "Vendor Details" },
      //     { path: "/Dashboard/Vendor-Documents", label: "Vendor Documents" },
      //   ],
    },
    {
      icon: "/resources/icons/document.svg",
      label: "My Documents",
      submenu: [
        { path: "/Dashboard/Documents/SOW", label: "SOW" },
        { path: "/Dashboard/Documents/Contracts", label: "Contracts" },
        { path: "/Dashboard/Documents/Reports", label: "Reports" },
      ],
    },
    {
      icon: "/resources/icons/document.svg",
      label: "Vendor Documents",
      submenu: [
        { path: "/Dashboard/Documents/SOW", label: "SOW" },
        { path: "/Dashboard/Documents/Contracts", label: "Contracts" },
        { path: "/Dashboard/Documents/Reports", label: "Reports" },
      ],
    },
    {
      path: "/Dashboard/Meetings",
      icon: "/resources/icons/calender.svg",
      label: "Meetings",
    },
    {
      icon: "/resources/icons/users.svg",
      label: "Users & Roles",
      submenu: [
        { path: "/Dashboard/Users", label: "Users" },
        { path: "/Dashboard/Roles", label: "Roles" },
        { path: "/Dashboard/Permissions", label: "Permissions" },
      ],
    },
    {
      path: "/Dashboard/Timelines",
      icon: "/resources/icons/scale.svg",
      label: "Project Timeline",
    },
    {
      path: "/Dashboard/Orders",
      icon: "/resources/icons/order.svg",
      label: "Order",
    },
    {
      path: "/Dashboard/Proc-calender",
      icon: "/resources/icons/calender.svg",
      label: "Procurement Calendar",
    },
    {
      path: "/Dashboard/Messages",
      icon: "/resources/icons/msg.svg",
      label: "Messages",
    },
  ];

  // useEffect(() => {
  //   const activeParent = menuItems.find(item =>
  //       item.submenu?.some(subItem => location.pathname.startsWith(subItem.path))

  //   if(activeParent && !expandedMenus.includes(activeParent.label)) {
  //     setExpandedMenus([...expandedMenus, activeParent.label]);
  //   })
  // }, [location.pathname]);

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    if (item.path) {
      return location.pathname.startsWith(item.path);
    }
    if (item.submenu) {
      return item.submenu.some((subItem) =>
        location.pathname.startsWith(subItem.path)
      );
    }
    return false;
  };

  const toggleMenu = (label) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="flex flex-col h-full px-2">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <img src="/resources/logo/logo.svg" alt="Logo" className="h-8" />
        )}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-100">
            {!collapsed ? (
              <MenuIcon
                className={`w-6 h-6 transition-transform ${
                  collapsed ? "rotate-180" : ""
                }`}
              />
            ) : (
              <ArrowLeftFromLine
                className={`w-6 h-6 transition-transform ${
                  collapsed ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
        {menuItems.map((item, index) => (
          <div key={index}>
            {!item.submenu ? (
              <Link
                to={item.path}
                onClick={isMobile ? closeMobile : undefined}
                className={`flex items-center rounded-md p-3 ${
                  isActive(item)
                    ? "bg-[#009EB4] text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}>
                <img src={item.icon} alt="" className="w-5 h-5" />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            ) : (
              <div>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`flex items-center justify-between w-full rounded-md p-3 ${
                    isActive(item)
                      ? "bg-[#009EB4] text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}>
                  <div className="flex items-center">
                    <img src={item.icon} alt="" className="w-5 h-5" />
                    {!collapsed && <span className="ml-3">{item.label}</span>}
                  </div>
                  {!collapsed && (
                    <motion.img
                      src={
                        isActive(item)
                          ? "/resources/icons/downChevronWhite.svg"
                          : "/resources/icons/downChevron.svg"
                      }
                      alt="Toggle"
                      className="w-4 h-4"
                      animate={{
                        rotate: expandedMenus.includes(item.label) ? 180 : 0,
                      }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {(!collapsed || isMobile) &&
                    expandedMenus.includes(item.label) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden">
                        <div className="pl-8 py-1 space-y-1">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              onClick={isMobile ? closeMobile : undefined}
                              className={`block px-3 py-2 rounded-md text-sm ${
                                location.pathname.startsWith(subItem.path)
                                  ? "bg-[#009EB4]/10 text-[#009EB4]"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              }`}>
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
