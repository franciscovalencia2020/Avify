import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

interface NavbarProps {
  lastUpdate: string;
}

const Navbar: React.FC<NavbarProps> = ({ lastUpdate }) => {
  return (
    <div className="bg-[#3b5998] text-white py-4 flex items-center justify-center w-full shadow-md">
      <FaCalendarAlt className="text-2xl mr-2" data-testid="calendar-icon" />
      <p className="text-lg font-semibold">Last Updated: {lastUpdate}</p>
    </div>
  );
};

export default Navbar;