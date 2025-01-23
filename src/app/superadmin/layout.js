"use client"
import Header from "@/Components/Header"
import Sidebar from "@/Components/Sidebar"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const layout = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  // console.log(pathname)
  // Effect to listen for screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false); // Close sidebar on small screens
      } else {
        setIsSidebarOpen(true); // Keep sidebar open on large screens
      }
    };
  
    // Initial check
    handleResize();
  
    // Add event listener for window resizing
    window.addEventListener("resize", handleResize);
  
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
   // Conditionally render the layout
   if (pathname === "/superadmin/login") {
    return <div>{children}</div>;
  }

 
  return (
    
    <div className="min-h-screen bg-gray-100">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />
      <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? "lg:pl-64" : ""}`}>
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default layout

