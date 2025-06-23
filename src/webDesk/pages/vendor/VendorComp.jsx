import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../common/Pagination";
import { GetAllVendorData } from "../../../Redux-config/slices/listingsSlice";
import { setDynamicRoutes } from "../../../Redux-config/slices/miscSlice";

const VendorCard = React.memo(({ vendor }) => (
  <div className="mb-3 border border-[#009EB4] bg-[#FFFFFF] px-[8px] py-[6px] rounded-[5px]">
    <div className="mt-2">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="w-[35.97px] flex-[0_0_auto] rounded-[4.67px] overflow-hidden h-[36px]">
            <img
              src={vendor.logo || "/resources/product/dummyImgSmall.svg"}
              className="w-full h-full object-cover"
              alt={vendor.name}
            />
          </div>
          <div>
            <div className="flex gap-2">
              <div className="bg-[#009EB4] text-[#FFFFFF] py-[3.66px] px-[4.39px] rounded-[2.93px] text-[7px] font-normal">
                {vendor.category || "Construction"}
              </div>
              {vendor.additionalCategories > 0 && (
                <div className="bg-[#009EB4] text-[#FFFFFF] py-[3.66px] px-[4.39px] rounded-[2.93px] text-[7px] font-normal">
                  {vendor.additionalCategories}+ more
                </div>
              )}
            </div>
            <h5 className="text-[13px] text-[#000000] font-semibold m-0 leading-[1] mt-1">
              {vendor.name || "Al-Karim Pvt Ltd"}
            </h5>
            <p className="text-[7px] font-normal text-[#4F4F4F] m-0">
              {vendor.contactPerson || "Karim Hussain Jannat"}
            </p>
          </div>
        </div>
        <div className="pl-3">
          <div className="mb-2 px-[4.39px] py-[5.12px] bg-[#F7F7F7] rounded-[2.93px] text-[#414141] text-[10px] font-normal flex gap-1">
            <img src="/resources/icons/star.svg" alt="rating" />
            {vendor.rating || "4.5"}
          </div>
          <div className="px-[4.39px] py-[5.12px] text-center bg-[#F7F7F7] rounded-[2.93px] text-[#414141] text-[10px] font-normal flex gap-1">
            <img
              src="/resources/icons/building-blue.svg"
              className="mx-auto w-[9.83px] h-[8.043875694274902px]"
              alt="company"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="mt-2">
      <div className="flex -mx-2">
        <div className="w-1/2 flex-[0_0_auto] px-2">
          <button className="flex justify-center items-center gap-2 w-full h-[19px] leading-[19px] bg-[#F7F7F7] border border-[#E5E5E5] text-[7px] font-normal rounded">
            <img src="/resources/icons/certified.svg" alt="certified" />
            {vendor.certified ? "Certified" : "Not Certified"}
          </button>
        </div>
        <div className="w-1/2 flex-[0_0_auto] px-2">
          <button className="flex justify-center items-center gap-2 w-full h-[19px] leading-[19px] bg-[#F7F7F7] border border-[#E5E5E5] text-[7px] font-normal rounded">
            <img src="/resources/icons/id.svg" alt="id" />
            ID: {vendor.id || "896129976"}
          </button>
        </div>
      </div>
    </div>
  </div>
));

const VendorComp = () => {
  const dispatch = useDispatch();
  const { vendors, total, loading } = useSelector((state) => state.listings);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const filterTabs = [
    { id: "all", label: "All" },
    { id: "my", label: "My Vendors" },
    { id: "approved", label: "Approved" },
    { id: "other", label: "Other Vendors" },
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch vendors with current filters
  const fetchVendors = useCallback(() => {
    dispatch(
      GetAllVendorData({
        filter,
        search: debouncedSearchTerm,
        page,
      })
    );
  }, [dispatch, filter, debouncedSearchTerm, page]);

  // Set dynamic routes and fetch initial data
  useEffect(() => {
    dispatch(
      setDynamicRoutes([
        {
          name: "Vendors",
          path: "/vendor",
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
    <div className="px-5 bg-white py-3 rounded-[10px]">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[24px] font-semibold text-[#000000] m-0">
            List of Vendors
          </h1>
          <p className="text-[14px] font-normal text-[#414141] m-0 leading-[14px]">
            {`We found ${total} ${
              total === 1 ? "vendor" : "vendors"
            } that match your search.`}
          </p>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="mt-5">
        <div className="flex justify-between items-center">
          {/* Filter Tabs */}
          <div className="bg-[#F7F7F7] rounded-[5px] border border-[#E5E5E5] p-[5px] h-[40px] gap-[20px] flex items-center">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                className={`h-[30px] px-[10px] rounded-[5px] flex gap-[5px] items-center ${
                  filter === tab.id
                    ? "bg-[#FFFFFF] shadow-[0px_1px_1px_0px_#0000001F]"
                    : ""
                }`}
                onClick={() => handleFilterChange(tab.id)}>
                {tab.id === "all" && (
                  <img src="/resources/icons/filter.svg" alt="filter" />
                )}
                <p className="text-[16px] text-[#282E3D]">{tab.label}</p>
              </button>
            ))}
          </div>

          {/* Search and Filter Button */}
          <div className="flex h-[40px] gap-[10px] items-center">
            <div className="h-full flex-[0_0_auto] -mt-[4px]">
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-full xl:w-[281px] md:w-[181px] px-[10px] outline-none border border-[#E5E5E5] p-[10px] bg-[#FFFFFF] rounded-[5px]"
              />
            </div>
            <div className="h-full flex-[0_0_auto]">
              <button className="h-full px-[10px] border border-[#E5E5E5] bg-[#FFFFFF] rounded-[5px]">
                <div className="w-full flex gap-[5px] items-center h-full">
                  <img src="/resources/icons/filter.svg" alt="filter" />
                  <p className="text-[16px] text-[#282E3D] m-0">Filter</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor List Section */}
      <div className="mt-4">
        <div className="border border-[#E5E5E5] bg-[#F7F7F7] p-[10px] rounded-[10px] h-[50dvh] overflow-y-auto">
          <div className="flex -mx-2 flex-wrap">{vendorList}</div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-2 mb-2 flex justify-end">
        <Pagination
          current={page}
          total={total}
          onChange={(p) => setPage(p)}
          pageSize={12} // Assuming 12 items per page based on your mock data
        />
      </div>
    </div>
  );
};

export default React.memo(VendorComp);
