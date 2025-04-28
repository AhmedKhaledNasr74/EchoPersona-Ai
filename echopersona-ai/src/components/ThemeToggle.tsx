import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-[#303030]"
            aria-label={`Switch to ${!isDark ? "dark" : "light"} mode`}
        >
            {!isDark ? (
                <Moon
                    size={20}
                    className="text-gray-700 transition-transform duration-300 hover:rotate-12"
                />
            ) : (
                <Sun
                    size={20}
                    className="text-gray-200 transition-transform duration-300 hover:rotate-12"
                />
            )}
        </button>
    );
};

export default ThemeToggle;
