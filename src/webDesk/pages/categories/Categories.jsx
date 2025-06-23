import { Search } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetCategories } from "../../../Redux-config/slices/listingsSlice";
import { setDynamicRoutes } from "../../../Redux-config/slices/miscSlice";

const Categories = () => {
  const [activeTab, setActiveTab] = useState("All Categories");
  const dispatch = useDispatch();
  const { vendors, total, loading } = useSelector((state) => state.listings);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const filterTabs = [
    { id: "all", label: "All Categories" },
    { id: "product", label: "Product" },
    { id: "service", label: "Service" },
    { id: "rentalService", label: "Rental Service" },
  ];

  const [equipmentData, setEquipmentData] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch vendors with current filters
  const fetchVendors = useCallback(() => {
    let payload = {
      type: "",
      page: page,
      pageSize: 10,
      //   recent: true,
      //   allSubcategory: true,
      //   categoryId: "string",
    };
    dispatch(GetCategories(payload));
  }, [dispatch, filter, debouncedSearchTerm, page]);

  // Set dynamic routes and fetch initial data
  useEffect(() => {
    dispatch(
      setDynamicRoutes([
        {
          name: "Categories",
          path: "/Categories",
          icon: "/resources/icons/vendors.svg",
        },
      ])
    );
    fetchVendors();
  }, []);

  // Re-fetch when filters change
  useEffect(() => {
    fetchVendors();
  }, [filter, debouncedSearchTerm, page, fetchVendors]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  // Handle filter tab change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1); // Reset to first page on filter change
  };

  // Memoized vendor list to prevent unnecessary re-renders
  const vendorList = useMemo(() => {
    if (loading) {
      return Array.from({ length: 8 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="flex-[0_0_auto] px-2 md:w-[33.33%] xl:w-[25%]">
          <div className="mb-3 border border-[#009EB4] bg-[#FFFFFF] px-[8px] py-[6px] rounded-[5px] animate-pulse h-[120px]"></div>
        </div>
      ));
    }

    return vendors.length > 0 ? (
      vendors.map((vendor) => (
        <div
          key={vendor.id}
          className="flex-[0_0_auto] px-2 md:w-[33.33%] xl:w-[25%]">
          <VendorCard vendor={vendor} />
        </div>
      ))
    ) : (
      <div className="w-full text-center py-10 text-gray-500">
        No vendors found matching your criteria
      </div>
    );
  }, [vendors, loading]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-[#f7f7f7]">
      <div className="bg-white mb-8 p-6 rounded-btn">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Categories Details
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            We found 140 amazing properties that match your search.
          </p>
        </div>

        {/* Navigation and Search */}
        <div className="flex flex-col-reverse  lg:flex-row lg:items-center lg:justify-between gap-2">
          {/* Tabs */}
          <div className="flex bg-[#F5F7F9] border border-[#e5e5e5] rounded-lg p-1 w-full lg:w-1/2">
            <button
              onClick={() => setActiveTab("All Categories")}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "All Categories"
                  ? "bg-white text-[#009EB4] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}>
              {activeTab === "All Categories" ? (
                <img src="/resources/icons/filter.svg" alt="phone.svg" />
              ) : (
                ""
              )}
              <span>Categories</span>
            </button>
            <button
              onClick={() => setActiveTab("Product")}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "Product"
                  ? "bg-white text-[#009EB4] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}>
              <span>Product</span>
            </button>
            <button
              onClick={() => setActiveTab("Service")}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "Service"
                  ? "bg-white text-[#009EB4] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}>
              <span>Service</span>
            </button>
            <button
              onClick={() => setActiveTab("Rental Service")}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "Rental Service"
                  ? "bg-white text-[#009EB4] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}>
              <span>Rental Service</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md w-full sm:w-auto justify-center border border-[#e5e5e5] bg-white">
              {" "}
              <img
                className="font-semibold w-fit"
                src="/resources/icons/filter.svg"
                alt="filter"
              />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {equipmentData.map((item) => (
          <Link
            to="/Dashboard/Categories/Sub-Categories"
            key={item.id}
            className="bg-white rounded-[16px] p-4 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group">
            <div className="">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 mb-2">{item.category}</p>
            </div>
            <div
              className={`bg-white h-32 sm:h-36 flex items-center justify-center`}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-[16px] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {/* <div className="flex justify-center mt-8">
                <button className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium">
                    Load More Results
                </button>
            </div> */}
    </div>
  );
};

export default Categories;
