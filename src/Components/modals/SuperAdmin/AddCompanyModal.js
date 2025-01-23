"use client";

import { registrationValidation } from '@/utils/formvalidation/formvalidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

const AddCompanyModel = ({open,close,editData,onRefresh}) => {
      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(registrationValidation),
      });
      const [passwordVisible, setPasswordVisible] = useState(false);


      useEffect(() => {
        if (editData) {
          // Set values for the form fields if editData exists
          setValue('company_name', editData?.company_name || '');
          setValue('email', editData?.email || '');
          // setValue('password', editData?.password || '');
          // setValue('confirm_password', editData?.password || ''); 
        }else{
          setValue('company_name', '');
          setValue('email', '');
          setValue('password', '');
          setValue('confirm_password', ''); 
        }
      }, [editData, setValue]);

      

      const onSubmit = async (data) => {
        try {
          let response;
          if (editData) {
            // Update company
            response = await axios.put(
              `/api/company/editcompany/${editData._id}`,
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
              toast.success(response?.data?.message || "Company updated successfully!");
              onRefresh();
              close();
            } else {
              toast.error(response?.data?.message || "Failed to update the company.");
            }
          } else {
            // Add a new company
            response = await axios.post(`/api/company/signup/`, data, {
              headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
              },
            });
            // console.log("Add response", response);
      
            if (response?.data?.isSuccess) {
              toast.success(response?.data?.message || "Company added successfully!");
              onRefresh();
              close();
            } else {
              toast.error(response?.data?.message || "Failed to add the company.");
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
 aria-labelledby="add-company-modal" aria-describedby="add-company-modal-description"
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
            <h2 className="text-2xl font-semibold text-center text-gray-800">{editData ? 'Edit Company' : 'Add Company' }</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">

              <div>
                <input
                  {...register('company_name')}
                  type="text"
                  placeholder="Company Name"
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.company_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.company_name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div onClick={()=>setPasswordVisible(!passwordVisible)}>
                <input
                  {...register('password')}
                  // type="password"
                  type={passwordVisible?'text':'password'}
                  placeholder="Password"        
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div onClick={()=>setPasswordVisible(!passwordVisible)}>
                <input
                  {...register('confirm_password')}
                  // type="password"
                  type={passwordVisible?'text':'password'}
                  placeholder="Confirm Password"
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {editData ? 'Update Company' : 'Add Company' }
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AddCompanyModel
