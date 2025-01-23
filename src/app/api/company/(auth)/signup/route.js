// import { companyRegisterEmail } from "@/app/services/CreateEmailServices";
import connectDb from "@/lib/dbConfig";
import { sendEmail } from "@/lib/emailConfig";
import Company from "@/models/companymodel";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { companyRegisterEmail } from "@/services/CreateEmailServices";

connectDb();
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
    // Parse the request body
    // const body = await req.json();
    const body = await req.json();
    console.log("Body data:", body);
    const { company_name, email, password, confirm_password } = body;
    // Validate required fields
    if (!company_name || !email || !password || !confirm_password) {
      return NextResponse.json(
        { isSuccess: false, message: "All fields are required." },
        { status: 400 }
      );
    }
    // const companyname=company_name.trim().toLowerCase();
    // const checkCompanyName = await Company.findOne({ company_name:companyname });
    const checkCompanyName = await Company.findOne({ company_name });
    if (checkCompanyName) {
      return NextResponse.json(
        { isSuccess: false, message: "Company name must be unique" },
        { status: 409 }
      );
    }
    if(email){
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
          return NextResponse.json(
            { isSuccess: false, message: "Invalid email format." },
            { status: 400 }
          );
        }
    }
    // Check if email already exists
    const checkEmail = await Company.findOne({ email });
    if (checkEmail) {
      return NextResponse.json(
        { isSuccess: false, message: "Email is already registered." },
        { status: 409 }
      );
    }

    // Validate password and confirm password match
    if (password !== confirm_password) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: "Password and Confirm Password do not match.",
        },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: "Password must be at least 8 characters long.",
        },
        { status: 400 }
      );
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: "Password must contain at least one special character.",
        },
        { status: 400 }
      );
    }

    if (!/\d/.test(password)) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: "Password must contain at least one number.",
        },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create the new company
    const newUser = new Company({
      company_name,
      email,
      password: hashPassword,
      role: "company",
      status: "pending",
    });

    // Save the user and send an email
    const companyAdded = await newUser.save();
    if (companyAdded) {
      sendEmail(
        newUser.email,
        "Your Email and Password",
        companyRegisterEmail(company_name, email, password)
      );
      return NextResponse.json(
        {
          isSuccess: true,
          message:
            "Company registered successfully. And email is sent successfully.",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
