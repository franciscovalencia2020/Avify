import React from "react";
import { FaSolarPanel } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div
      className="bg-[#3b5998] text-white py-4 flex items-center justify-center w-full"
      role="contentinfo"
    >
      <FaSolarPanel className="text-2xl mr-2" data-testid="footer-icon" />
      <p className="text-lg font-semibold">Francisco Valencia</p>
    </div>
  );
};

export default Footer;
