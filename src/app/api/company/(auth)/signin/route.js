
import connectDb from "@/lib/dbConfig";
import Company from "@/models/companymodel";
import SuperAdmin from "@/models/superadminmodel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import {  generateTokenCompany } from "@/helpers/gernateToken";

connectDb()

export async function POST(req) {
    try {
              // Retrieve the API key from headers
              // const apiKey = req.headers.get("x-api-key");

              // // Retrieve the secret key from environment variables
              // const secretKey = process.env.NEXT_PUBLIC_API_SECRET_KEY;
      
              // // Validate the API key
              // if (apiKey !== secretKey) {
              //     return NextResponse.json(
              //         { isSuccess: false, message: "Unauthorized access." },
              //         { status: 401 }
              //     );
              // }

              const contentType = req.headers.get("content-type");
    
              // Ensure the request has a JSON body
              if (!contentType || contentType !== "application/json") {
                return NextResponse.json(
                  { isSuccess: false, message: "Invalid content type. Expected application/json." },
                  { status: 400 }
                );
              }
        const body=await req.json();
        const{email,password}=body
        console.log(body)

        if (!email || !password) {
              return NextResponse.json(
                { isSuccess: false, message: "All fields are required" },
                { status: 400 }
              );
          }
    
          // Find user based on the query
          const user = await Company.findOne({email:email});
          if(!user) {
            return NextResponse.json(
                { isSuccess: false, message: "User not found" },
                { status: 404 }
              );
          }
    
          if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
              return NextResponse.json(
                { isSuccess: false, message: "Invalid credentials" },
                { status: 401 }
              );
            }
            if (isMatch) {
              const payload={
                id: user._id,
                email: user.email,
                company_name: user.company_name,
                role: user.role,
              }
              const token = await generateTokenCompany(payload);
              console.log(token);
              const { _id,email, company_name,role } = user;
              user.status = "accepted";
              await user.save();
              const response = NextResponse.json(
                { isSuccess: true, message: "Login successful."},
                { status: 200 }
              );
              // return NextResponse.json(
              //   { isSuccess: true, message: "Login successful",token,user :{ _id,email, company_name,role }},{ status: 200 });

                response.cookies.set("c_tkn", token, {
                  httpOnly: true, // Cookie is inaccessible to JavaScript
                  secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                  maxAge: 60 * 60 * 24 * 15, // 15 day
                  path: "/",
                });
                return response;
            } else {
              
            return NextResponse.json(
                { isSuccess: false, message: "Invalid credentials"},{ status: 401 });
          } 
        }
    } catch (error) {
        return NextResponse.json({isSuccess: false,error:error.message,message:"Unable to login"},{status:500});   
}}
