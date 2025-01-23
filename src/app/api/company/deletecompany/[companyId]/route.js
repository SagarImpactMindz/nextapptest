import connectDb from "@/lib/dbConfig";
import Company from "@/models/companymodel";
import { NextResponse } from "next/server";

connectDb();

export async function DELETE(req, { params }) {
  try {
    // Validate API key
    // const apiKey = req.headers.get("x-api-key");
    // const secretKey = process.env.NEXT_PUBLIC_API_SECRET_KEY;

    // if (apiKey !== secretKey) {
    //   return NextResponse.json(
    //     { isSuccess: false, message: "Unauthorized access." },
    //     { status: 401 }
    //   );
    // }
    const { companyId } = params; // Extract companyId from URL params

    // Check if companyId is provided
    if (!companyId) {
      return NextResponse.json(
        { isSuccess: false, message: "Company ID is required." },
        { status: 400 }
      );
    }

    // Find and delete the company by ID
    const company = await Company.findByIdAndDelete(companyId);

    // Check if the company was found and deleted
    if (!company) {
      return NextResponse.json(
        { isSuccess: false, message: "Company not found." },
        { status: 404 }
      );
    }

    // Success message
    return NextResponse.json(
      { isSuccess: true, message: "Company deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting company:", error);

    // Error message
    return NextResponse.json(
      {
        isSuccess: false,
        message: "Unable to delete the company. Please try again.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
