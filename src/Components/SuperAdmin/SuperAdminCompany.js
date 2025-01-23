"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddCompanyModel from "../modals/SuperAdmin/AddCompanyModal";

const SuperAdminCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Refresh function
  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle state to trigger refresh
  };

  // Delete company
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `/api/company/deletecompany/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
          },
        }
      );
      if (response?.data?.isSuccess) {
        toast.success(response?.data?.message || "Company deleted successfully!");
        handleRefresh();
      } else {
        toast.error(response?.data?.message || "Failed to delete company.");
      }
    } catch (error) {
      console.error("Error while deleting company:", error);
      // toast.error("An error occurred while deleting the company.");
      toast.error(error?.response?.data?.message)
    }
  };

  // Edit company
  const handleEdit = (company) => {
    setIsModalOpen(true);
    setEditId(company._id);
    setEditData(company);
  };

  // Close modal
  const handleClose = () => {
    setIsModalOpen(false);
    setEditId(null);
    setEditData(null);
  };

  // Fetch companies
  const getCompaniesApi = async () => {
    try {
      const response = await axios.get("/api/company/getcompany", {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
        },
      });
      console.log(response.data);
      setCompanies(response.data.companies);
    } catch (error) {
      console.error("Error fetching companies:", error.message);
      // toast.error("Failed to fetch companies.");
      toast.error(error?.response?.data?.message)
    }
  };

  // Fetch companies when the component mounts or refresh changes
  useEffect(() => {
    getCompaniesApi();
  }, [refresh]);

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Companies</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Company
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Company Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Password</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id} className="text-center">
              <td className="border p-2">{company._id}</td>
              <td className="border p-2">{company.company_name}</td>
              <td className="border p-2">{company.email}</td>
              <td className="border p-2">{company.password}</td>
              <td className="border p-2">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleEdit(company)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(company._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddCompanyModel
        open={isModalOpen}
        close={handleClose}
        editData={editData}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default SuperAdminCompany;
