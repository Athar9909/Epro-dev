import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useClickAway } from "react-use";
import { LogOut } from "lucide-react";

export default function RouteNav() {
  const dropdownRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const dynamicRoutes = useSelector((state) => state.misc.DynamicRoutes || []);

  useClickAway(dropdownRef, () => setOpenIndex(null));

  console.log(dynamicRoutes);

  return (
    <header className="sticky top-0 bg-white shadow">
      <div className="h-[45px] leading-[45px] md:mt-[14px] lg:mt-0 bg-[radial-gradient(104.91%_496.88%_at_50%_50%,_#009EB4_0%,_#007080_100%)]">
        <div className="h-full flex gap-4 px-[33px] items-center">
          <img src="/resources/icons/toogle-button.svg" alt="" />
          {dynamicRoutes?.map((route, index) => (
            <div
              key={index}
              className="relative"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}>
              <Link
                to={route.path}
                className={`text-[14px] font-medium text-[#FFFFFF] flex items-center ${
                  openIndex === index ? "text-[#F4C63B]" : ""
                }`}>
                {route.name}
                <img
                  src="/resources/icons/downChevronWhite.svg"
                  alt="chevron"
                  className={`ml-1 transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </Link>
              {openIndex === index && (
                <div className="absolute left-0 top-full bg-white shadow-lg rounded mt-2 z-10">
                  {route.subRoutes &&
                    route.subRoutes.map((subRoute, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subRoute.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {subRoute.name}
                      </Link>
                    ))}
                </div>
              )}
            </div>
          ))}

          {/* <p className="text-[14px] font-medium text-[#FFFFFF] flex items-center pr-3 m-0 relative after:content-[''] after:absolute after:w-[1px] after:h-[60%] after:bg-[#FFFFFF] after:top-1/2 after:-translate-y-1/2 after:right-0">
            Documents
            <img src="/resources/icons/downChevronWhite.svg" alt="chevron" />
          </p>
          <p className="text-[14px] font-medium text-[#FFFFFF] flex items-center m-0">
            Purchase Request
            <img
              src="/resources/icons/downChevronWhite.svg"
              className="transform -rotate-90"
              alt="chevron"
            />
          </p>
          <p className="text-[14px] font-medium text-[#FFFFFF]">Products</p> */}
        </div>
      </div>
      {/* <div className="h-[60px] w-full bg-[#FFFFFF] flex justify-between items-center px-4">
        <p className="text-[16px] text-[#383838] font-medium">Create RFPs</p>
        <button
          // onClick={() => {
          //   setOpenModal(true);
          // }}
          className="bg-[#F4C63B] h-[33px] leading-[33px] w-[132px] rounded-[8px] text-[#000000] font-medium text-[14px] text-center">
          Share RFQs(3)
        </button>
      </div> */}
    </header>
  );
}
