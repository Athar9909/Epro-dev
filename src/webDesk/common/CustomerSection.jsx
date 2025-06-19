import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, User, Check } from "lucide-react";

const CustomerSection = ({
  customerData,
  setCustomerData,
  tradeLicense,
  setTradeLicense,
}) => {
  const [uploadCustomers, setUploadCustomers] = useState("no");

  const handleAddCustomer = () =>
    setCustomerData([
      ...customerData,
      { customerName: "", customerFile: null },
    ]);

  const handleRemoveCustomer = (index) =>
    setCustomerData(customerData.filter((_, i) => i !== index));

  // Immutable update
  const handleCustomerChange = (index, field, value) => {
    setCustomerData(
      customerData.map((cust, i) =>
        i === index ? { ...cust, [field]: value } : cust
      )
    );
  };

  return (
    <>
      <label className="block mb-4 text-gray-700 font-medium">
        Would you like to upload customer details?
      </label>

      <div className="flex gap-6 mb-6">
        {["yes", "no"].map((opt) => (
          <label key={opt} className="flex items-center gap-2">
            <input
              type="radio"
              value={opt}
              checked={uploadCustomers === opt}
              onChange={() => setUploadCustomers(opt)}
              className="text-teal-600 focus:ring-teal-500"
            />
            <span>
              {opt === "yes" ? "Yes, Upload Now" : "No, Upload Later"}
            </span>
          </label>
        ))}
      </div>

      {uploadCustomers === "yes" && (
        <>
          {customerData.map((cust, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
              {/* Name */}
              <div className="md:col-span-2">
                <InputField
                  label="Customer Name"
                  value={cust.customerName}
                  onChange={(e) =>
                    handleCustomerChange(idx, "customerName", e.target.value)
                  }
                  placeholder="Enter customer name"
                  icon={<User className="text-gray-400" size={20} />}
                />
              </div>

              {/* File */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Document
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    handleCustomerChange(
                      idx,
                      "customerFile",
                      e.target.files?.[0] || null
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                {cust.customerFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {cust.customerFile.name}
                  </p>
                )}
              </div>

              {/* Controls */}
              <div className="md:col-span-3 flex justify-between items-center">
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomer(idx)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1">
                    <Trash2 size={16} /> Remove
                  </button>
                )}
                {idx === customerData.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddCustomer}
                    className="text-teal-600 hover:text-teal-800 flex items-center gap-1">
                    <Plus size={16} /> Add Another
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Trade License */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trade License
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setTradeLicense(e.target.files?.[0] || null)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            {tradeLicense && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {tradeLicense.name}
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};

const InputField = ({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
}) => (
  <motion.div layout className="space-y-1">
    {label && (
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
      />
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
    </div>
  </motion.div>
);

export default CustomerSection;
