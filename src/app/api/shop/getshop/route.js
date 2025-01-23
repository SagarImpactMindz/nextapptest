import connectDb from "@/lib/dbConfig";
import Shop from "@/models/shopmodel";
import { NextResponse } from "next/server";

connectDb();

export async function GET(req) {
  try {
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

        // get company id from login company
        const getloginUser=req.headers.get("x-user-payload")
        console.log(getloginUser,"getloginUser")
        const parsedLoginUser = JSON.parse(getloginUser)
        const companyId=parsedLoginUser?.id
        console.log(companyId,"companyId")


    if (!companyId) {
      return NextResponse.json(
        { isSuccess: false, message: "Company ID is required in headers." },
        { status: 400 }
      );
    }

    const shops = await Shop.find({ companyId }).populate("companyId");

    return NextResponse.json(
      { isSuccess: true, message: "Shops retrieved successfully.", shops },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { isSuccess: false, message: "Unable to retrieve shops.", error: error.message },
      { status: 500 }
    );
  }
}
