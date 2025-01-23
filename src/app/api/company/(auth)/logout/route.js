import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const response = NextResponse.json(
      { isSuccess: true, message: "Logout successful." },
      { status: 200 }
    );

    // Clear the cookie
    response.cookies.set("c_tkn", "", {
      httpOnly: true, // Cookie is inaccessible to JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 0, // Expire immediately
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { isSuccess: false, error: error.message, message: "Unable to logout." },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const response = NextResponse.json(
//       { isSuccess: true, message: "Logout successful." },
//       { status: 200 }
//     );

//     // Delete the cookie
//     response.cookies.delete("c_tkn");

//     return response;
//   } catch (error) {
//     return NextResponse.json(
//       { isSuccess: false, error: error.message, message: "Unable to logout." },
//       { status: 500 }
//     );
//   }
// }
