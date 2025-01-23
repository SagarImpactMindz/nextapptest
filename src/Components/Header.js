"use client"

import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
export function Header({ toggleSidebar }) {
    const[showPro,setShowPro]=useState(false)
    const[name,setName]=useState()
    const router = useRouter();
  const pathname = usePathname();

  
  useEffect(()=>{
    if (pathname.startsWith('/superadmin')) {
        setName("SuperAdmin")
    }
    if (pathname.startsWith('/company')) {
        setName("Company")
    }
  },[pathname])


    // const handleLogout=async()=>{
    //   try {
    //     const response=await axios.get('/api/superadmin/logout',
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
    //         },
    //       })
    //     console.log(response)
    //     if(response?.data?.isSuccess){
    //       toast.success(response?.data?.message || "logged out")
    //       router.push('/superadmin/login')
    //     }else{
    //       toast.error(response?.data?.message || "please try again")
    //     }
    //   } catch (error) {
    //     console.log(error)
    //     toast.error(error?.response?.data?.message || "Something wents wrong")
    //   }


    // }
    const handleLogout = async () => {
      try {
        let response;
    
        // Check the current pathname
        if (pathname.startsWith('/superadmin')) {
          response = await axios.get('/api/superadmin/logout', {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
            },
          });
        } else if (pathname.startsWith('/company')) {
          response = await axios.get('/api/company/logout', {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
            },
          });
        } else {
          toast.error("Invalid logout path");
          return;
        }
    
        // Handle the response
        if (response?.data?.isSuccess) {
          toast.success(response?.data?.message || "Logged out successfully");
    
          // Redirect based on the user type
          if (pathname.startsWith('/superadmin')) {
            router.push('/superadmin/login');
          } else if (pathname.startsWith('/company')) {
            router.push('/company/login');
          }
        } else {
          toast.error(response?.data?.message || "Please try again");
        }
      } catch (error) {
        console.error("Logout Error:", error);
        toast.error(error?.response?.data?.message || "An error occurred. Please try again");
      }
    };
    
  return (
    <header className="border-b h-16 px-6 flex items-center justify-between fixed top-0 w-full bg-white shadow z-50 text-black">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden p-2 rounded-md hover:bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold">Welcome {name}</h1>
      </div>

      <div className="relative" >
        <button className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-200" onClick={()=>setShowPro(!showPro)}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />
        </button>
        {showPro &&
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg  group-hover:blockborder-2 border-black">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <hr className="border-gray-200" />
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Log out</li>
          </ul>
        </div>
        }
        
      </div>
    </header>
  );
}

export default Header;
