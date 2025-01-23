import connectDb from "@/lib/dbConfig";
import Shop from "@/models/shopmodel";
import { NextResponse } from "next/server";

connectDb();

export async function DELETE(req, { params }) {
  try {
    const { shopId } = params;

    if (!shopId) {
      return NextResponse.json(
        { isSuccess: false, message: "Shop ID is required." },
        { status: 400 }
      );
    }

    const shop = await Shop.findByIdAndDelete(shopId);
    if (!shop) {
      return NextResponse.json(
        { isSuccess: false, message: "Shop not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { isSuccess: true, message: "Shop deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { isSuccess: false, message: "Unable to delete the shop.", error: error.message },
      { status: 500 }
    );
  }
}
