import { useState } from "react";

const SelectProfile = () => {
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <div className="desk_head bg-white px-4 py-3  md:px-[5vw] md:py-[1.5vw] w-full shadow-md border-b border-gray-200">
      <div className="flex flex-row md:flex-row justify-between items-center gap-3 md:gap-0">
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <img
            src="/resources/web/logo1.svg"
            alt="Logo"
            className="h-10 md:h-12"
          />
        </div>

        <div className="flex flex-row md:flex-row items-center gap-3 md:gap-6">
          <div className="relative w-full md:w-auto">
            <div
              className="flex items-center justify-center md:justify-start gap-1 cursor-pointer px-3 py-1 rounded-md md:border-none"
              onClick={() => setShowLangMenu(!showLangMenu)}>
              <img
                src="/resources/imgs/flag.svg"
                alt="Flag"
                className="w-2 h-2 "
              />
              <span className="text-[6px] font-medium">English</span>
              <svg
                className="w-1 h-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {showLangMenu && (
              <div className="absolute top-full right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg z-10">
                <div
                  onClick={() => setShowLangMenu(false)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  English
                </div>
                <div
                  onClick={() => setShowLangMenu(false)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  العربية
                </div>
              </div>
            )}
          </div>

          <button className="bg-[#4f73af] hover:bg-[#3d5e94] text-white text-sm w-full md:w-auto px-4 py-2 rounded-md transition">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectProfile;
