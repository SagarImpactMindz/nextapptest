import connectDb from "@/lib/dbConfig";
import Shop from "@/models/shopmodel";

import { NextResponse } from "next/server";

connectDb();

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
    // get company id from login company
    const getloginUser=req.headers.get("x-user-payload")
    console.log(getloginUser,"getloginUser")
    const parsedLoginUser = JSON.parse(getloginUser)
    const companyId=parsedLoginUser?.id
    console.log(companyId,"companyId")
    
    const { shop_name} = await req.json();

    // Validate required fields
    if (!shop_name || !companyId) {
      return NextResponse.json(
        { isSuccess: false, message: "Shop name and company ID are required." },
        { status: 400 }
      );
    }

    // Check if the shop name already exists for the company
    const existingShop = await Shop.findOne({ shop_name, companyId });
    if (existingShop) {
      return NextResponse.json(
        { isSuccess: false, message: "Shop name already exists for this company." },
        { status: 409 }
      );
    }

    // Create a new shop
    const newShop = new Shop({ shop_name, companyId });
    await newShop.save();

    return NextResponse.json(
      { isSuccess: true, message: "Shop added successfully.", newShop },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { isSuccess: false, message: "Something went wrong.", error: error.message },
      { status: 500 }
    );
  }
}



// import connectDb from "@/lib/dbConfig";
// import Shop from "@/models/shopmodel";

// import { NextResponse } from "next/server";

// connectDb();

// export async function POST(req) {
//   try {
//     const getloginUser=req.headers.get("x-user-payload")
//     // console.log(getloginUser,"getloginUser")
//     const companyId=getloginUser?.id
//     const contentType = req.headers.get("content-type");
    
//     // Ensure the request has a JSON body
//     if (!contentType || contentType !== "application/json") {
//       return NextResponse.json(
//         { isSuccess: false, message: "Invalid content type. Expected application/json." },
//         { status: 400 }
//       );
//     }
//     // get company id from token 
//     const data=req.user
//     console.log(data,"ddddddddddddddddddddd")


//     const { shop_name } = await req.json();

//     // Validate required fields
//     if (!shop_name ) {
//       return NextResponse.json(
//         { isSuccess: false, message: "Shop name are required." },
//         { status: 400 }
//       );
//     }

//     // Check if the shop name already exists for the company
//     const existingShop = await Shop.findOne({ shop_name });
//     if (existingShop) {
//       return NextResponse.json(
//         { isSuccess: false, message: "Shop name already exists." },
//         { status: 409 }
//       );
//     }

//     // Create a new shop
//     const newShop = new Shop({ shop_name });
//     await newShop.save();

//     return NextResponse.json(
//       { isSuccess: true, message: "Shop added successfully.", newShop },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { isSuccess: false, message: "Something went wrong.", error: error.message },
//       { status: 500 }
//     );
//   }
// }
