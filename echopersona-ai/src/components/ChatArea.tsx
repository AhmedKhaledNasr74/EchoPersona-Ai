import React, { useState, useRef, useEffect } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import Thinking from "./Thinking";

interface Message {
    text: string;
    sender: "user" | "assistant";
}

const placeholders = [
    "What do you want to know about me?",
    "Can you tell me something interesting?",
    "What should we talk about?",
    "Do you have any questions for me?",
    "How can I help you today?",
];

const ChatArea: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            text: "Hello! I'm your AI assistant. How can I help you today?",
            sender: "assistant",
        },
    ]);
    const [input, setInput] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        e.target.style.height = "auto"; // Reset height
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        // Add user message to chat
        setMessages([...messages, { text: input, sender: "user" }]);

        // Store input before clearing
        const userInput = input;

        // Reset textarea height
        const textareaElement = e.currentTarget.querySelector(
            "textarea"
        ) as HTMLTextAreaElement;
        if (textareaElement) {
            textareaElement.style.height = "40px";
            setInput(""); // Clear input field
        }

        // Set loading state
        setIsLoading(true);

        try {
            // Send message to API
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch(
                "https://fb65-34-125-150-151.ngrok-free.app/generate",
                {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify({
                        prompt: userInput,
                    }),
                    redirect: "follow",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            const data = await response.text();
            const parsedData = JSON.parse(data);

            // Add AI response to chat
            setMessages((prev) => [
                ...prev,
                {
                    text:
                        parsedData.response ||
                        "Sorry, I couldn't process that request.",
                    sender: "assistant",
                },
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
            // Add error message to chat
            setMessages((prev) => [
                ...prev,
                {
                    text: "Sorry, there was an error processing your request. Please try again.",
                    sender: "assistant",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    return (
        <div className="flex-1 overflow-y-auto pb-32">
            <div className="flex flex-col justify-end p-8">
                <div className="flex-1 flex flex-col gap-2">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`mb-2 flex ${
                                msg.sender === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`p-3 rounded-3xl px-5 w-fit max-w-2xl break-words break-all   ${
                                    msg.sender === "user"
                                        ? "bg-blue-500 text-white   dark:bg-white/5 transition duration-200 "
                                        : "bg-transparent text-gray-900 dark:text-white"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start mt-2">
                            <Thinking />
                        </div>
                    )}
                    {/* Scroll anchor */}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            {/* Fixed input form */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    );
};

export default ChatArea;
