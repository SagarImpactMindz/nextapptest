import connectDb from "@/lib/dbConfig";
import SuperAdmin from "@/models/superadminmodel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

connectDb();

export async function POST(req) {
  try {
    // Retrieve the API key from headers
    const apiKey = req.headers.get("x-api-key");

    // Retrieve the secret key from environment variables
    const secretKey = process.env.NEXT_PUBLIC_API_SECRET_KEY;

    // Validate the API key
    if (apiKey !== secretKey) {
      return NextResponse.json(
        { isSuccess: false, message: "Unauthorized access." },
        { status: 401 }
      );
    }

    const contentType = req.headers.get("content-type");
    
    // Ensure the request has a JSON body
    if (!contentType || contentType !== "application/json") {
      return NextResponse.json(
        { isSuccess: false, message: "Invalid content type. Expected application/json." },
        { status: 400 }
      );
    }
    const body=await req.json();
    console.log(body)
    const { name, email, password, confirm_password } = body;


    // Check if an admin already exists - only one admin allowed in the database
    const superAdminExists = await SuperAdmin.findOne();

    if (superAdminExists) {
      return NextResponse.json(
        { isSuccess: false, message: "Super Admin already exists." },
        { status: 409 }
      );
    }

    // Check if email already exists
    const checkEmail = await SuperAdmin.findOne({ email });

    if (checkEmail) {
      return NextResponse.json(
        { isSuccess: false, message: "User already exists." },
        { status: 409 }
      );
    }

    // Validate required fields
    if (!email || !password || !confirm_password || !name) {
      return NextResponse.json(
        { isSuccess: false, message: "All fields are required." },
        { status: 400 }
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

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Creating the new user
    const newUser = new SuperAdmin({
      name,
      email,
      password: hashPassword,
      role: "superadmin",
    });

    // Save the user and respond
    await newUser.save();
    return NextResponse.json(
      { isSuccess: true, message: "Signup successful.", newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { isSuccess: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
