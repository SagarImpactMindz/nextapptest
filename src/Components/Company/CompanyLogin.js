"use client"

import axios from "axios"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const LoginPage = () => {
  const [name, setName] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const router=useRouter()
    const pathname=usePathname()
    useEffect(()=>{
      if (pathname.startsWith('/company')) {
          setName("Company")
      }
    },[pathname])

    const handleSubmit=async(e)=>{
      setLoading(true)
      e.preventDefault()
      console.log(email,password)
      const payload={email,password}
      try {
        const response=await axios.post('/api/company/signin',payload,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
            },
          })
          if (response?.data?.isSuccess) {
            toast.success(response?.data?.message || "Login successful!");
            // Redirect or perform additional actions here
            // localStorage.setItem("authToken", response.data.token);
            setLoading(false)
            router.push("/company/dashboard");
          } else {
            toast.error(response?.data?.message || "Invalid credentials. Please try again.");
            setLoading(false)
          }
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message)
    // toast.error("An error occurred. Please try again.");
      }finally{
        setLoading(false)
      }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          {/* <div className="flex justify-center">
            <div className="text-4xl text-blue-500">🔑</div>
          </div> */}
          <h2 className="text-2xl font-bold text-center text-gray-900">Welcome {name}</h2>
          <p className="text-sm text-center text-gray-600">
            Please sign in to your account
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="admin@gmail.com"
                    onChange={(e)=>setEmail(e.target.value)}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    onChange={(e)=>setPassword(e.target.value)}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                className={`w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading? "bg-blue-400 cursor-not-allowed": "bg-blue-600 hover:bg-blue-700"}`}
                disabled={loading}
              >
                {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <span className="ml-2">please wait...</span>
                </div>
              ) : (
                "Sign in"
              )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  
  export default LoginPage