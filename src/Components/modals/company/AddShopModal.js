"use client";

import { registrationShopValidation } from '@/utils/formvalidation/formvalidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

const AddShopModel = ({open,close,editData,onRefresh}) => {
      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(registrationShopValidation),
      });


      useEffect(() => {
        if (editData) {
          // Set values for the form fields if editData exists
          setValue('shop_name', editData?.shop_name || '');

        }else{
          setValue('shop_name', '');
        }
      }, [editData, setValue]);

      

      const onSubmit = async (data) => {
        try {
          let response;
          if (editData) {
            // Update shop
            response = await axios.patch(
              `/api/shop/editshop/${editData._id}`,
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                  "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
                },
              }
            );
            console.log("Edit response", response);
      
            if (response?.data?.isSuccess) {
              toast.success(response?.data?.message || "shop updated successfully!");
              onRefresh();
              close();
            } else {
              toast.error(response?.data?.message || "Failed to update the Shop.");
            }
          } else {
            // Add a new shop
            response = await axios.post(`/api/shop/register/`, data, {
              headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
              },
            });
            // console.log("Add response", response);
      
            if (response?.data?.isSuccess) {
              toast.success(response?.data?.message || "Shop added successfully!");
              onRefresh();
              close();
            } else {
              toast.error(response?.data?.message || "Failed to add the shop.");
            }
          }
        } catch (error) {
          console.error("Error", error);
          toast.error(
            error?.response?.data?.message || "An error occurred. Please try again."
          );
        }
      };
      
  return (

    <Modal
      open={open}
      onClose={close}
 aria-labelledby="add-shop-modal" aria-describedby="add-shop-modal-description"
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 relative">
          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="px-6 py-8 space-y-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800">{editData ? 'Edit Shop' : 'Add Shop' }</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">

              <div>
                <input
                  {...register('shop_name')}
                  type="text"
                  placeholder="Shop Name"
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.shop_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.shop_name.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {editData ? 'Update Shop' : 'Add Shop' }
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AddShopModel
