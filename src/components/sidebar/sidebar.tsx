import React from "react";
import { FaChartBar, FaCube, FaSolarPanel, FaDatabase } from "react-icons/fa";

interface SidebarProps {
  activeOption: string;
  onOptionChange: (option: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeOption, onOptionChange }) => {
  const options = [
    { label: "Charts", icon: <FaChartBar /> },
    { label: "Data", icon: <FaDatabase /> },
    { label: "Elements", icon: <FaCube /> },
  ];

  return (
    <div className="w-80 h-full bg-white text-[#3b5998] shadow-md flex flex-col">
      <div className="flex flex-col items-center py-8 border-b border-blue-400">
        <FaSolarPanel className="text-6xl mb-4 text-[#3b5998]" />
        <h3 className="text-3xl font-bold uppercase text-center">Dashboard</h3>
      </div>
      <ul className="mt-8">
        {options.map(({ label, icon }) => (
          <li
            key={label}
            className={`flex items-center gap-8 px-12 py-6 cursor-pointer transition-colors duration-300 rounded-md mx-4 mb-6 text-2xl ${activeOption === label.toLowerCase()
              ? "bg-gray-200 text-[#4b70ad] shadow-inner"
              : "hover:bg-[#e0e0e0] hover:text-[#3b5998]"
              }`}
            onClick={() => onOptionChange(label.toLowerCase())}
          >
            <span className="text-3xl">{icon}</span>
            <span className="font-semibold">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;