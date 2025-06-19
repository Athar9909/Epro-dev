import { useState, useEffect } from "react";
import { countryCodes } from "../Auth/CountryCodes";

const CountryCodeDrop = ({
  selectedCode,
  onSelect,
  register,
  validation,
  error,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countryCodes);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCountries(countryCodes);
      return;
    }

    const terms = searchTerm.toLowerCase().split(" ").filter(Boolean);
    const matches = countryCodes.filter((country) => {
      const name = country.name.toLowerCase();
      const dial = country.dial_code.toLowerCase();
      const code = (country.code || "").toLowerCase();
      return terms.every(
        (term) =>
          name.includes(term) || dial.includes(term) || code.includes(term)
      );
    });
    setFilteredCountries(matches);
  }, [searchTerm]);

  const handleSelect = (code) => {
    onSelect(code);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none transition text-left flex items-center justify-between ${
            error ? "border-red-500" : "border-gray-300"
          }`}>
          <span>{selectedCode}</span>
          <svg
            className={`w-4 h-4 ml-2 transition-transform ${
              isDropdownOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <input type="hidden" {...register} />
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="p-2 sticky top-0 bg-white">
            <input
              type="text"
              placeholder="Search countries..."
              className="w-full p-2 border rounded-md focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <ul key={searchTerm}>
            {filteredCountries?.length > 0 ? (
              filteredCountries?.map((country) => (
                <li
                  key={country.dial_code}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
                    selectedCode === country.dial_code ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleSelect(country.dial_code)}>
                  <span className="mr-2">{country.flag}</span>
                  <span className="font-medium">{country.dial_code}</span>
                  <span className="ml-2 text-gray-600 truncate">
                    {country.name}
                  </span>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No countries found</li>
            )}
          </ul>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default CountryCodeDrop;
