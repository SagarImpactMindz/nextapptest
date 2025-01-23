// import { generateToken } from "@/helpers/gernateToken";
// import connectDb from "@/lib/dbConfig";
// import SuperAdmin from "@/models/superadminmodel";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// connectDb();

// // Helper function to generate a token

// export async function POST(req) {
//   try {

// // Retrieve the API key from headers
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

//     const contentType = req.headers.get("content-type");
    
//     // Ensure the request has a JSON body
//     if (!contentType || contentType !== "application/json") {
//       return NextResponse.json(
//         { isSuccess: false, message: "Invalid content type. Expected application/json." },
//         { status: 400 }
//       );
//     }
    
//     // Parse the JSON request body
//     const { email, password } = await req.json();

//     // Validate required fields
//     if (!email || !password) {
//       return NextResponse.json(
//         { isSuccess: false, message: "All fields are required." },
//         { status: 400 }
//       );
//     }

//     // Find the user by email
//     const user = await SuperAdmin.findOne({ email });

//     if (!user) {
//       return NextResponse.json(
//         { isSuccess: false, message: "Invalid credentials." },
//         { status: 401 }
//       );
//     }

//     // Compare the password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return NextResponse.json(
//         { isSuccess: false, message: "Invalid credentials." },
//         { status: 401 }
//       );
//     }

//     // Generate a token
//     const token = generateToken(user);

//     // Create session-like data (stored in cookies for simplicity)
//     const userData = {
//       id: user._id,
//       email: user.email,
//       name: user.name,
//       role: user.role,
//       token,
//     };

//     // Set the token in cookies
//     const response = NextResponse.json(
//       { isSuccess: true, message: "Login successful.", user: userData },
//       { status: 200 }
//     );

//     response.cookies.set("s_tkn", token, {
//       httpOnly: true, // Cookie is inaccessible to JavaScript
//       secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//       maxAge: 60 * 60 * 24 * 15, // 15 day
//       path: "/",
//     });

//     return response;
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { isSuccess: false, message: "Unable to login.", error: error.message },
//       { status: 500 }
//     );
//   }
// }


import { generateTokenSuperAdmin } from "@/helpers/gernateToken";
import connectDb from "@/lib/dbConfig";
import SuperAdmin from "@/models/superadminmodel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

connectDb();

// Helper function to generate a token

export async function POST(req) {
  try {

    const contentType = req.headers.get("content-type");
    
    // Ensure the request has a JSON body
    if (!contentType || contentType !== "application/json") {
      return NextResponse.json(
        { isSuccess: false, message: "Invalid content type. Expected application/json." },
        { status: 400 }
      );
    }
    
    // Parse the JSON request body
    const { email, password } = await req.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { isSuccess: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await SuperAdmin.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { isSuccess: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { isSuccess: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    // Generate a token
    const token = await generateTokenSuperAdmin(payload);

    // Create session-like data (stored in cookies for simplicity)
    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      token,
    };

    // Set the token in cookies
    const response = NextResponse.json(
      { isSuccess: true, message: "Login successful.", user: userData },
      { status: 200 }
    );

    response.cookies.set("s_tkn", token, {
      httpOnly: true, // Cookie is inaccessible to JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 15, // 15 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { isSuccess: false, message: "Unable to login.", error: error.message },
      { status: 500 }
    );
  }
}
