
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   FolderOpen, 
//   Users, 
//   FileText, 
//   Calendar, 
//   UserCheck, 
// //   Timeline, 
//   ShoppingCart, 
//   CalendarDays,
//   ChevronDown,
//   ChevronRight
// } from 'lucide-react';
// // import { cn } from '@/lib/utils';

// const AppSideBar = ({ isOpen = true, setIsOpen }) => {
//   const location = useLocation();
//   const [expandedItems, setExpandedItems] = useState([]);

//   const menuItems= [
//     { 
//       path: '/', 
//       icon: LayoutDashboard, 
//       label: 'Dashboard' 
//     },
//     { 
//       path: '/categories', 
//       icon: FolderOpen, 
//       label: 'Categories' 
//     },
//     { 
//       path: '/vendors', 
//       icon: Users, 
//       label: 'Vendors' 
//     },
//     { 
//       path: '/documents', 
//       icon: FileText, 
//       label: 'My Documents',
//       subItems: [
//         { path: '/documents/sow', label: 'Scope of work ( SOWs )' },
//         { path: '/documents/proposals', label: 'Proposal request ( PRs )' },
//         { path: '/documents/rfp', label: 'RFPs/ RFPs' },
//         { path: '/documents/rfq', label: 'RFQs' },
//         { path: '/documents/contracts', label: 'Post/Contracts' },
//         { path: '/documents/vendor-docs', label: 'Contracts' }
//       ]
//     },
//     { 
//       path: '/vendor-documents', 
//       icon: FileText, 
//       label: 'Vendor Documents' 
//     },
//     { 
//       path: '/meetings', 
//       icon: Calendar, 
//       label: 'Meetings' 
//     },
//     { 
//       path: '/sub-users', 
//       icon: UserCheck, 
//       label: 'Sub-Users' 
//     },
//     { 
//       path: '/project-timeline', 
//       icon: Timeline, 
//       label: 'Project Timeline' 
//     },
//     { 
//       path: '/orders', 
//       icon: ShoppingCart, 
//       label: 'Orders' 
//     },
//     { 
//       path: '/procurement-calendar', 
//       icon: CalendarDays, 
//       label: 'Procurement Calendar' 
//     }
//   ];

//   const toggleExpanded = (path) => {
//     setExpandedItems(prev => 
//       prev.includes(path) 
//         ? prev.filter(item => item !== path)
//         : [...prev, path]
//     );
//   };

//   const isItemActive = (path) => location.pathname === path;
//   const isItemExpanded = (path) => expandedItems.includes(path);

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setIsOpen && setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={(
//         "fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto overflow-y-auto",
//         isOpen ? 'translate-x-0' : '-translate-x-full'
//       )}>
//         {/* Logo */}
//         <div className="flex items-center px-6 py-6 border-b border-gray-200">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-lg">L</span>
//             </div>
//             <span className="text-xl font-semibold text-gray-900">Logo</span>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="px-4 py-4 space-y-1">
//           {menuItems.map((item) => (
//             <div key={item.path}>
//               {/* Main Menu Item */}
//               <div className="relative">
//                 {item.subItems ? (
//                   <button
//                     onClick={() => toggleExpanded(item.path)}
//                     className={(
//                       "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
//                       isItemActive(item.path)
//                         ? 'bg-teal-500 text-white'
//                         : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
//                     )}
//                   >
//                     <div className="flex items-center space-x-3">
//                       <item.icon className="w-5 h-5" />
//                       <span>{item.label}</span>
//                     </div>
//                     {isItemExpanded(item.path) ? (
//                       <ChevronDown className="w-4 h-4" />
//                     ) : (
//                       <ChevronRight className="w-4 h-4" />
//                     )}
//                   </button>
//                 ) : (
//                   <Link
//                     to={item.path}
//                     onClick={() => setIsOpen && setIsOpen(false)}
//                     className={cn(
//                       "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
//                       isItemActive(item.path)
//                         ? 'bg-teal-500 text-white'
//                         : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
//                     )}
//                   >
//                     <item.icon className="w-5 h-5" />
//                     <span>{item.label}</span>
//                   </Link>
//                 )}
//               </div>

//               {/* Sub Items */}
//               {item.subItems && isItemExpanded(item.path) && (
//                 <div className="mt-1 ml-6 space-y-1">
//                   {item.subItems.map((subItem) => (
//                     <Link
//                       key={subItem.path}
//                       to={subItem.path}
//                       onClick={() => setIsOpen && setIsOpen(false)}
//                     //   className={cn(
//                     //     "block px-3 py-2 rounded-md text-sm transition-colors duration-200",
//                     //     isItemActive(subItem.path)
//                     //       ? 'bg-teal-50 text-teal-700 font-medium'
//                     //       : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                     //   )}
//                     >
//                       {subItem.label}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>
//       </div>
//     </>
//   );
// };

// export default AppSideBar;