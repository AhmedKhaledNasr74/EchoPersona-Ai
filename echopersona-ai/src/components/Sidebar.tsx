import { X } from "lucide-react";
import React from "react";

interface SidebarProps {
    onClose: () => void;
}

const chats = [
    {
        id: 1,
        name: "General Assistant",
        lastMsg: "How can I help you today?",
        time: "10:30 AM",
    },
    {
        id: 2,
        name: "Code Helper",
        lastMsg: "Let me help with your code",
        time: "Yesterday",
    },
    // ... more chats
];

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => (
    <aside className="w-64 flex flex-col transition-transform duration-300 z-50 ">
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-white/10  ">
            <span className="font-semibold text-lg">My Chats</span>
            <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full"
            >
                {/* Hamburger icon instead of × */}
                <X />
            </button>
        </div>

        <ul className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
                <li
                    key={chat.id}
                    className="px-4 py-3 hover:bg-gray-300/70 dark:bg-white/5 hover:dark:bg-white/10 cursor-pointer rounded-md m-2 transition-all duration-200"
                >
                    <div className=" text-primary ">{chat.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {chat.lastMsg}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                        {chat.time}
                    </div>
                </li>
            ))}
        </ul>
    </aside>
);

export default Sidebar;
