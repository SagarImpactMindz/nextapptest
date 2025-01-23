// const Shops = () => {
//     return (
//         <div className="text-black">
//             Shops page
//         </div>
//     );
// }



// export default Shops;


// import React, { useEffect, useState } from 'react';
// import AddCompanyModel from '../components/modal/AddCompanyModel';
// import { deleteCompaniesApi, getCompaniesApi } from '../services/CompanyServices/CompanyServices';
// import toast from 'react-hot-toast';

// const Company = () => {
//   const [companies, setCompanies] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState(null);
//   const [refresh, setRefresh] = useState(false);

//   // Refresh function
//   const handleRefresh = () => {
//     setRefresh((prev) => !prev); // Toggle state to trigger refresh
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await deleteCompaniesApi(id);
//       if (response?.isSuccess) {
//         toast.success(response?.message);
//         handleRefresh();
//       }
//     } catch (error) {
//       console.error('Error while deleting companies:', error);
//     }
//   };

//   const handleEdit = (company) => {
//     setIsModalOpen(true);
//     setEditId(company._id);
//     setEditData(company);
//   };

//   const handleClose = () => {
//     setIsModalOpen(false);
//     setEditId(null);
//     setEditData(null);
//   };

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await getCompaniesApi();
//         setCompanies(response?.companies || []);
//       } catch (error) {
//         console.error('Error fetching companies:', error);
//       }
//     })();
//   }, [refresh]);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Companies</h1>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Add Company
//         </button>
//       </div>

//       <table className="w-full border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Company Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Password</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {companies.map((company) => (
//             <tr key={company._id} className="text-center">
//               <td className="border p-2">{company._id}</td>
//               <td className="border p-2">{company.company_name}</td>
//               <td className="border p-2">{company.email}</td>
//               <td className="border p-2">{company.password}</td>
//               <td className="border p-2">
//                 <button
//                   className="text-blue-500 mr-2"
//                   onClick={() => handleEdit(company)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-red-500"
//                   onClick={() => handleDelete(company._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <AddCompanyModel
//         open={isModalOpen}
//         close={() => handleClose()}
//         editData={editData}
//         onRefresh={handleRefresh}
//       />
//     </div>
//   );
// };

// export default Company;
import SuperAdminCompany from "@/Components/SuperAdmin/SuperAdminCompany"

export const metadata = {
  title: "SuperAdmin Company",
  description: "This is Super Admin Company", 
}
const Company = () => {
  return <SuperAdminCompany/>
}

export default Company
