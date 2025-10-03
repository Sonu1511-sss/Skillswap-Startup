// client/src/layouts/DashboardLayout.jsx

import React, { useContext, useEffect ,useState } from 'react'; 
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../Dashboard/DashboardNavbar';
import { Toaster } from 'react-hot-toast'; 
import { AuthContext } from '../context/AuthContext';
import io from "socket.io-client";
import { toast } from 'react-hot-toast';
import Chatbot from '../components/Chatbot'; 
import { MessageCircle } from 'lucide-react';

function DashboardLayout() {
    const { user, fetchUnreadRequestCount , fetchUnreadCount  } = useContext(AuthContext);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    useEffect(() => {
        if (user) {
            const socket = io("http://localhost:5000", { query: { userId: user.id } });
            
            // Listen for the new swap request event from the server
            socket.on("newSwapRequest", (data) => {
                console.log("New swap request notification received!");
                toast.success(data.message || "You have a new swap request!"); // Show a pop-up
                fetchUnreadRequestCount(); // This will update the bell icon badge
            });

            // This listener is for chat notifications
            socket.on("notification", () => {
                fetchUnreadCount();
            });

            // Clean up the connection when the component unmounts
            return () => socket.disconnect();
        }
    }, [user, fetchUnreadRequestCount,fetchUnreadCount]);
    
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Toaster position="top-center" reverseOrder={false} />

            {/* The Dashboard gets its own special Navbar */}
            <DashboardNavbar />
            
            <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8">
                {/* Outlet will render the specific dashboard page (e.g., Welcome, MyMatches) */}
                <Outlet />
            </main>
             
        </div>
    );
}

export default DashboardLayout;