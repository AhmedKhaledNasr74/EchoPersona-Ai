import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu } from "lucide-react";

interface NavbarProps {
    onMenuClick: () => void;
    sidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, sidebarOpen }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="sticky top-0 flex items-center justify-between px-6 py-3  border-b dark:border-white/10 shadow-sm dark:shadow-none ">
            <div className="flex items-center">
                <button
                    className={`mr-4 transition-opacity duration-300 ${
                        sidebarOpen
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                    }`}
                    onClick={onMenuClick}
                    aria-label="Open sidebar"
                >
                    <Menu className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
                <span className="font-bold text-xl dark:text-white transition-colors duration-300">
                    General Assistant
                </span>
            </div>
            <div className="flex items-center space-x-4">
                <ThemeToggle />
                <div className="relative z-20">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="avatar"
                        className="w-9 h-9 rounded-full cursor-pointer border-2 transition-all duration-300"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 z-50 bg-white dark:bg-black/50 backdrop-blur-3xl border rounded shadow-lg  transition-colors duration-300">
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#303030] dark:text-gray-200 transition-colors duration-300">
                                Profile
                            </button>
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#303030] dark:text-gray-200 transition-colors duration-300">
                                Settings
                            </button>
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#303030] dark:text-gray-200 transition-colors duration-300">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
