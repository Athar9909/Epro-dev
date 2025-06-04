import React from "react";

const CommNote = ({ text }) => {
  return (
    <div className="bg-[#009EB41A] border-l-4 border-[#009EB41A] p-4 mb-8">
      <div className="flex">
        <div className="flex-shrink-0">
          <div className="w-5 h-5 bg-[#009EB4] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">i</span>
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm text-dark">
            <strong>Note:</strong> {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommNote;
