import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ChatArea from "./components/ChatArea";
import { ThemeProvider } from "./context/ThemeContext";

const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <ThemeProvider>
            <div
                className="flex h-screen dark:bg-[#0e0e0e] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(0,145,255,0.2),transparent_30%),radial-gradient(circle_at_top_right,rgba(0,145,255,0.2),transparent_30%)] bg-no-repeat bg-cover  bg-[linear-gradient(to_right,#f8f9fa,#ced4da,#e9ecef)] 
 transition-colors duration-300"
            >
                {/* Sidebar with slide animation */}
                <div
                    className={`fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 transform bg-background/20   backdrop-blur-2xl border-r border-gray-200/50 dark:border-white/10  shadow-lg
              ${
                  sidebarOpen
                      ? "translate-x-0 bg-gray-100 dark:bg-background/20"
                      : "-translate-x-full"
              }`}
                >
                    <Sidebar onClose={() => setSidebarOpen(false)} />
                </div>
                {/* Overlay for mobile when sidebar is open */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-20 bg-black/30 dark:bg-black/50 md:hidden transition-colors duration-300"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
                <div
                    className={`flex flex-col flex-1 transition-all duration-300 ${
                        sidebarOpen ? "md:ml-64" : ""
                    }`}
                >
                    <Navbar
                        onMenuClick={() => setSidebarOpen(true)}
                        sidebarOpen={sidebarOpen}
                    />
                    <ChatArea />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default App;
