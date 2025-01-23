"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddShopModel from "../modals/company/AddShopModal";

const Shops = () => {
  const [shops, setShops] = useState([]);
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
        `/api/shop/deleteshop/${id}`,
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
      toast.error("An error occurred while deleting the company.");
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
  const getShopsApi = async () => {
    try {
      const response = await axios.get("/api/shop/getshop", {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
        },
      });
      console.log(response.data);
      setShops(response.data.shops);
    } catch (error) {
      console.error("Error fetching shops:", error.message);
      toast.error("Failed to fetch shops.");
    }
  };

  // Fetch companies when the component mounts or refresh changes
  useEffect(() => {
    getShopsApi();
  }, [refresh]);

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Shops</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Shop
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Company ID</th>
            <th className="border p-2">Company Name</th>
            <th className="border p-2">Shop Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop._id} className="text-center">
              <td className="border p-2">{shop._id}</td>
              <td className="border p-2">{shop.companyId?._id}</td>
              <td className="border p-2">{shop.companyId?.company_name}</td>
              <td className="border p-2">{shop.shop_name}</td>
              <td className="border p-2">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleEdit(shop)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(shop._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddShopModel
        open={isModalOpen}
        close={handleClose}
        editData={editData}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default Shops;
