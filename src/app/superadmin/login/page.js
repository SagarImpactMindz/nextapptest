// export async function generateMetadata({ params }) {
//   return {
//     title: "SuperAdmin Login",
//     description: "This is Super Admin Login", 
//   }
// }
// "use client"

// import { usePathname } from "next/navigation"
// import { useEffect, useState } from "react"

// const LoginPage = () => {
//     const [name, setName] = useState("")
//       const pathname=usePathname()
//       useEffect(()=>{
//         if (pathname.startsWith('/superadmin')) {
//             setName("Super Admin")
//         }
//       },[pathname])
      
//     return (
//         <div className="flex items-center justify-center min-h-screen bg-blue-50">
//         <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//           {/* <div className="flex justify-center">
//             <div className="text-4xl text-blue-500">🔑</div>
//           </div> */}
//           <h2 className="text-2xl font-bold text-center text-gray-900">Welcome {name}</h2>
//           <p className="text-sm text-center text-gray-600">
//             Please sign in to your account
//           </p>
//           <form className="mt-8 space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     placeholder="admin@gmail.com"
//                     className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
//                   />
//                 </div>
//               </div>
  
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="current-password"
//                     required
//                     placeholder="••••••••"
//                     className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
//                   />
//                 </div>
//               </div>
//             </div>
  
//             <div>
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )
//   }
  
//   export default LoginPage
  


// export async function generateMetadata({ params }) {
//   return {
//     title: "SuperAdmin Login",
//     description: "This is Super Admin Login", 
//   }
// }


import AdminLoginPage from "@/Components/SuperAdmin/AdminLoginPage"

export const metadata = {
  title: "SuperAdmin Login",
  description: "This is Super Admin Login", 
}


const LoginPage = () => {
    return <AdminLoginPage/>
}

export default LoginPage