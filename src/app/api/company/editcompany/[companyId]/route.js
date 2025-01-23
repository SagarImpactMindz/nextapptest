import connectDb from "@/lib/dbConfig";
import Company from "@/models/companymodel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

connectDb();

export async function PUT(req, { params }) {
    try {

        // Validate API key
        // const apiKey = req.headers.get("x-api-key");
        // const secretKey = process.env.NEXT_PUBLIC_API_SECRET_KEY;

        // if (apiKey !== secretKey) {
        //     return NextResponse.json(
        //         { isSuccess: false, message: "Unauthorized access." },
        //         { status: 401 }
        //     );
        // }
        const { companyId } = params; 
        console.log(companyId,"company")
  
        // Parse the request body
        const body = await req.json();
        const {  company_name, email, password, confirm_password } = body;
        // Validate required fields
        if (!companyId || !company_name || !email || !password || !confirm_password) {
            return NextResponse.json(
                { isSuccess: false, message: "All fields are required." },
                { status: 400 }
            );
        }

        // Find the company by ID
        const company = await Company.findById(companyId);
        if (!company) {
            return NextResponse.json(
                { isSuccess: false, message: "Company not found." },
                { status: 404 }
            );
        }

        // Check for unique company name
        const companyNameExist = await Company.findOne({ company_name });
        if (companyNameExist && companyNameExist._id.toString() !== companyId) {
            return NextResponse.json(
                { isSuccess: false, message: "Company name is already in use." },
                { status: 409 }
            );
        }

        // Check for unique email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { isSuccess: false, message: "Invalid email format." },
                { status: 400 }
            );
        }

        const emailExist = await Company.findOne({ email });
        if (emailExist && emailExist._id.toString() !== companyId) {
            return NextResponse.json(
                { isSuccess: false, message: "Email is already in use." },
                { status: 409 }
            );
        }

        // Validate password and confirm password
        if (password !== confirm_password) {
            return NextResponse.json(
                { isSuccess: false, message: "Passwords do not match." },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { isSuccess: false, message: "Password must be at least 8 characters long." },
                { status: 400 }
            );
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return NextResponse.json(
                { isSuccess: false, message: "Password must contain at least one special character." },
                { status: 400 }
            );
        }

        if (!/\d/.test(password)) {
            return NextResponse.json(
                { isSuccess: false, message: "Password must contain at least one number." },
                { status: 400 }
            );
        }

        // Update the fields
        company.company_name = company_name;
        company.email = email;

        // Hash the new password and update
        const salt = await bcrypt.genSalt(10);
        company.password = await bcrypt.hash(password, salt);

        // Save the updated company to the database
        await company.save();

        return NextResponse.json(
            { isSuccess: true, message: "Company updated successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { isSuccess: false, error: error.message, message: "Unable to update the company." },
            { status: 500 }
        );
    }
}
