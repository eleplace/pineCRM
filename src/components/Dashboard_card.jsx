import React from "react";

const VendorCard = ({
  title = "Total Vendors",
  count = 48,
  growth = "+6 this month",
}) => {
  return (
    <div className="w-[250px] h-[100px]  bg-[#ffffff] rounded-2xl border border-gray-200  flex justify-between shadow-sm px-1 py-1">
      {/* Left Content */}
      <div className="flex-row justify-between items-center px-5 py-2 w-[80%]">
        <p className="text-[#9EFD38] text-sm font-sm font-bold">{title}</p>

        <h2 className="text-lg  font-bold text-[#0b1b2b]">{count}</h2>

        <p className="text-gray-500 text-sm font-medium">{growth}</p>
      </div>

      {/* Right Icon Box */}
      <div className="w-5 h-5 rounded-lg bg-[#dfe8e2]" />
    </div>
  );
};

export default VendorCard;
