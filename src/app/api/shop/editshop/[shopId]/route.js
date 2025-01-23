import connectDb from "@/lib/dbConfig";
import Shop from "@/models/shopmodel";
import { NextResponse } from "next/server";

connectDb();

export async function PATCH(req, { params }) {
  try {
    const { shopId } = params;
    console.log(shopId,"shopIdshopIdshopIdshopId")
    const { shop_name } = await req.json();

    if (!shopId || !shop_name) {
      return NextResponse.json(
        { isSuccess: false, message: "Shop ID and Shop name are required." },
        { status: 400 }
      );
    }

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return NextResponse.json(
        { isSuccess: false, message: "Shop not found." },
        { status: 404 }
      );
    }

    const shopNameExist = await Shop.findOne({ shop_name });
    if (shopNameExist && shopNameExist._id.toString() !== shopId) {
      return NextResponse.json(
        { isSuccess: false, message: "Shop name is already in use." },
        { status: 409 }
      );
    }

    shop.shop_name = shop_name;
    await shop.save();

    return NextResponse.json(
      { isSuccess: true, message: "Shop updated successfully.", shop },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { isSuccess: false, message: "Unable to update the shop.", error: error.message },
      { status: 500 }
    );
  }
}
