// import { jwtVerify } from "jose";
// import { NextResponse } from "next/server";

// // Middleware for API key validation for make our api private
// function validateApiKey(req) {
//   const apiKey = req.headers.get("x-api-key");
//   if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_SECRET_KEY) {
//     return NextResponse.json(
//       { isSuccess: false, message: "Unauthorized - Invalid API key" },
//       { status: 401 }
//     );
//   }
// }

// // Middleware for Authorization header and JWT validation
// // function validateJwt(req) {
// //     // console.log(req.cookies)
// //     console.log(req.cookies.get("s_tkn"))
// //     const s_tkn = req.cookies.get("s_tkn");
// //     let token=s_tkn.value
// //     console.log(token)
 
// //   const authorization = req.headers.get("authorization");

// //   if (!authorization || !authorization.startsWith("Bearer")) {
// //     return NextResponse.json(
// //       { isSuccess: false, message: "Unauthorized - Missing Authorization" },
// //       { status: 401 }
// //     );
// //   }

// // //   const token = authorization.split(" ")[1];
// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
// //     req.user = decoded;
// //   } catch (error) {
// //     return NextResponse.json(
// //       { isSuccess: false, message: "Invalid token" },
// //       { status: 401 }
// //     );
// //   }
// // }

// // Middleware validate with cookies and jwt

// async function validateSuperAdminJwt (req) {
//     console.log("Starting JWT validation...");

//     const cookieStore = req.cookies.get('s_tkn'); 
//     console.log("All Cookies:", cookieStore); 
//     let token=cookieStore?.value
//     // console.log(token,"tokentoken")

//   if (!token) {
//     return NextResponse.json(
//       { isSuccess: false, message: "Unauthorized - Missing Authorization" },
//       { status: 401 }
//     );
//   }
//   try {
//     // console.log(token,"token")
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
//     const { payload } = await jwtVerify(token, secret);
//     // console.log(payload,"payload")
//     return { isValid: true, payload };
//   } catch (error) {
//     return NextResponse.json(
//       { isSuccess: false, message: "Invalid token" },
//       { status: 401 }
//     );
//   }
// }

// async function validateCompanyJwt (req) {
//     console.log("Starting JWT validation...");

//     const cookieStore = req.cookies.get('c_tkn'); 
//     console.log("All Cookies:", cookieStore); 
//     let token=cookieStore?.value


//   if (!token) {
//     return NextResponse.json(
//       { isSuccess: false, message: "Unauthorized - Missing Authorization" },
//       { status: 401 }
//     );
//   }
//   try {
//     console.log(token,"token")
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
//     const { payload } = await jwtVerify(token, secret);
//     console.log(payload,"payload")
//     return { isValid: true, payload };
//   } catch (error) {
//     return NextResponse.json(
//       { isSuccess: false, message: "Invalid token" },
//       { status: 401 }
//     );
//   }
// }

// // export function middleware(req) {
// //     console.log("Middleware is running");
// //     const superAdminRoutes=[
// //         "/api/company/getcompany",
// //         "/api/company/editcompany/[companyId]",
// //         "/api/company/deletecompany/[companyId]",
// //         "/api/company/signup",
// //     ]
// //     const companyRoutes=[
// //         "/api/shop/register",
// //         "/api/shop/editshop/[shopId]",
// //         "/api/shop/deleteshop/[shopId]",
// //         "/api/shop/getshop",
// //     ]
// //     // Check if the request path starts with `/api`
// //     if (req.nextUrl.pathname.startsWith("/api")) {
// //       // Validate API Key
// //       const apiKeyValidation = validateApiKey(req);
// //       if (apiKeyValidation) return apiKeyValidation; // Stop execution if API key is invalid
  
// //       // Additional Middleware for JWT validation
// //       if (req.nextUrl.pathname.startsWith("/api/company/getcompany")) {
// //         const jwtValidation = validateSuperAdminJwt(req);

// //         if (jwtValidation) return jwtValidation; // Stop execution if JWT is invalid
// //       }
// //     }
  
// //     return NextResponse.next(); // Proceed if all checks pass
// //   }
  
// export async function middleware(req) {
//     console.log("Middleware is running");
//     const superAdminRoutes=[
//         "/api/company/getcompany",
//         "/api/company/editcompany/[companyId]",
//         "/api/company/deletecompany/[companyId]",
//         "/api/company/signup",
//     ]
//     const companyRoutes=[
//         "/api/shop/register",
//         "/api/shop/editshop/[shopId]",
//         "/api/shop/deleteshop/[shopId]",
//         "/api/shop/getshop",
//     ]
//     const publicRoutes=[
//         "company/login",
//         "superadmin/login",
//     ]
//     // Check if the request path starts with `/api`
//     if (req.nextUrl.pathname.startsWith("/api")) {
//       // Validate API Key
//       const apiKeyValidation = validateApiKey(req);
//       if (apiKeyValidation) return apiKeyValidation; // Stop execution if API key is invalid
  
//       // Additional Middleware for JWT validation
//       if (companyRoutes.includes(req.nextUrl.pathname)) {
//         const jwtCompValidation = await validateCompanyJwt(req);
//         // console.log(jwtCompValidation,"validjjjjjjjjj")
//         if (jwtCompValidation.isValid) {
//             const response = NextResponse.next();
//             response.headers.set(
//               "x-user-payload",
//               JSON.stringify(jwtCompValidation.payload)
//             ); // Pass the payload in headers
//             return response;
//           }
//           return jwtCompValidation; // Return error if validation fails
//       }
//       if (superAdminRoutes.includes(req.nextUrl.pathname)) {
//         const jwtAdminValidation =await validateSuperAdminJwt(req);
//         // console.log(jwtAdminValidation,"validjjjjjjjjj")
//         // if (jwtAdminValidation) return jwtAdminValidation; 
//         if (jwtAdminValidation.isValid) {
//             const response = NextResponse.next();
//             response.headers.set(
//               "x-user-payload",
//               JSON.stringify(jwtAdminValidation.payload)
//             ); // Pass the payload in headers
//             return response;
//           }
//           return jwtAdminValidation; // Return error if validation fails
//       }
//     }
//     if (publicRoutes.includes(req.nextUrl.pathname)) {
//         if (req.nextUrl.pathname.startsWith("/company")){
//             const cookieStore = req.cookies.get('c_tkn'); 
//             let token=cookieStore?.value
//             if(token){
//                 return NextResponse.redirect(new URL('/',req.nextUrl))
//             }else{
//                 return NextResponse.redirect(new URL('/company/login',req.nextUrl))
//             }
//         }
//         if (req.nextUrl.pathname.startsWith("/superadmin")){
//             const cookieStore = req.cookies.get('s_tkn'); 
//             let token=cookieStore?.value
//             if(token){
//                 return NextResponse.redirect(new URL('/',req.nextUrl))
//             }else{
//                 return NextResponse.redirect(new URL('/superadmin/login',req.nextUrl))
//             }
//         }
//         // return NextResponse.next(); // Proceed if the request is public
//     }

  
//     return NextResponse.next(); // Proceed if all checks pass
//   }
 
  

import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

// Middleware for API key validation for make our api private
function validateApiKey(req) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_SECRET_KEY) {
    return NextResponse.json(
      { isSuccess: false, message: "Unauthorized - Invalid API key" },
      { status: 401 }
    );
  }
}

// Middleware for Authorization header and JWT validation
// function validateJwt(req) {
//     // console.log(req.cookies)
//     console.log(req.cookies.get("s_tkn"))
//     const s_tkn = req.cookies.get("s_tkn");
//     let token=s_tkn.value
//     console.log(token)
 
//   const authorization = req.headers.get("authorization");

//   if (!authorization || !authorization.startsWith("Bearer")) {
//     return NextResponse.json(
//       { isSuccess: false, message: "Unauthorized - Missing Authorization" },
//       { status: 401 }
//     );
//   }

// //   const token = authorization.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = decoded;
//   } catch (error) {
//     return NextResponse.json(
//       { isSuccess: false, message: "Invalid token" },
//       { status: 401 }
//     );
//   }
// }

// Middleware validate with cookies and jwt

async function validateSuperAdminJwt (req) {
    console.log("Starting JWT validation...");

    const cookieStore = req.cookies.get('s_tkn'); 
    console.log("All Cookies:", cookieStore); 
    let token=cookieStore?.value
    // console.log(token,"tokentoken")

  if (!token) {
    return NextResponse.json(
      { isSuccess: false, message: "Unauthorized - Missing Authorization" },
      { status: 401 }
    );
  }
  try {
    // console.log(token,"token")
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY_SUPER_ADMIN)
    const { payload } = await jwtVerify(token, secret);
    // console.log(payload,"payload")
    return { isValid: true, payload };
  } catch (error) {
    return NextResponse.json(
      { isSuccess: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}

async function validateCompanyJwt (req) {
    console.log("Starting JWT validation...");

    const cookieStore = req.cookies.get('c_tkn'); 
    console.log("All Cookies:", cookieStore); 
    let token=cookieStore?.value


  if (!token) {
    return NextResponse.json(
      { isSuccess: false, message: "Unauthorized - Missing Authorization" },
      { status: 401 }
    );
  }
  try {
    console.log(token,"token")
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY_COMPANY)
    const { payload } = await jwtVerify(token, secret);
    console.log(payload,"payload")
    return { isValid: true, payload };
  } catch (error) {
    return NextResponse.json(
      { isSuccess: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}

// export function middleware(req) {
//     console.log("Middleware is running");
//     const superAdminRoutes=[
//         "/api/company/getcompany",
//         "/api/company/editcompany/[companyId]",
//         "/api/company/deletecompany/[companyId]",
//         "/api/company/signup",
//     ]
//     const companyRoutes=[
//         "/api/shop/register",
//         "/api/shop/editshop/[shopId]",
//         "/api/shop/deleteshop/[shopId]",
//         "/api/shop/getshop",
//     ]
//     // Check if the request path starts with `/api`
//     if (req.nextUrl.pathname.startsWith("/api")) {
//       // Validate API Key
//       const apiKeyValidation = validateApiKey(req);
//       if (apiKeyValidation) return apiKeyValidation; // Stop execution if API key is invalid
  
//       // Additional Middleware for JWT validation
//       if (req.nextUrl.pathname.startsWith("/api/company/getcompany")) {
//         const jwtValidation = validateSuperAdminJwt(req);

//         if (jwtValidation) return jwtValidation; // Stop execution if JWT is invalid
//       }
//     }
  
//     return NextResponse.next(); // Proceed if all checks pass
//   }
  
export async function middleware(req) {
    console.log("Middleware is running");
  
    // Define route groups
    const superAdminRoutes = [
      "/api/company/getcompany",
      "/api/company/editcompany/[companyId]",
      "/api/company/deletecompany/[companyId]",
      "/api/company/signup",
    ];
    const companyRoutes = [
      "/api/shop/register",
      "/api/shop/editshop/[shopId]",
      "/api/shop/deleteshop/[shopId]",
      "/api/shop/getshop",
    ];
    const loginRoutes = [
      "/company/login",
      "/superadmin/login",
    ];
  
    // Check for login routes
    if (loginRoutes.includes(req.nextUrl.pathname)) {
      if (req.nextUrl.pathname.startsWith("/company")) {
        const cookieStore = req.cookies.get("c_tkn");
        const token = cookieStore?.value;

        
  
        // Redirect to company dashboard if token exists
        if (token) {
          return NextResponse.redirect(new URL("/company/dashboard", req.nextUrl));
        }
      }
  
      if (req.nextUrl.pathname.startsWith("/superadmin")) {
        const cookieStore = req.cookies.get("s_tkn");
        const token = cookieStore?.value;
  
        // Redirect to superadmin dashboard if token exists
        if (token) {
          return NextResponse.redirect(new URL("/superadmin/dashboard", req.nextUrl));
        }
      }
  
      return NextResponse.next(); // Allow access to login route if no token
    }
  
    // Check for protected routes
    if (req.nextUrl.pathname.startsWith("/api")) {
      // Validate API Key
      const apiKeyValidation = validateApiKey(req);
      if (apiKeyValidation) return apiKeyValidation; // Stop execution if API key is invalid
  
      // Validate Company JWT for company-specific routes
      if (companyRoutes.includes(req.nextUrl.pathname)) {
        const jwtCompValidation = await validateCompanyJwt(req);
        if (jwtCompValidation.isValid) {
          const response = NextResponse.next();
          response.headers.set(
            "x-user-payload",
            JSON.stringify(jwtCompValidation.payload)
          ); // Pass payload in headers
          return response;
        }
        return jwtCompValidation; // Return error if validation fails
      }
  
      // Validate SuperAdmin JWT for superadmin-specific routes
      if (superAdminRoutes.includes(req.nextUrl.pathname)) {
        const jwtAdminValidation = await validateSuperAdminJwt(req);
        if (jwtAdminValidation.isValid) {
          const response = NextResponse.next();
          response.headers.set(
            "x-user-payload",
            JSON.stringify(jwtAdminValidation.payload)
          ); // Pass payload in headers
          return response;
        }
        return jwtAdminValidation; // Return error if validation fails
      }
    }
  
    // Redirect users to login if they are trying to access protected routes without being logged in
    if (
      req.nextUrl.pathname.startsWith("/company") &&
      !req.cookies.get("c_tkn")
    ) {
      return NextResponse.redirect(new URL("/company/login", req.nextUrl));
    }
  
    if (
      req.nextUrl.pathname.startsWith("/superadmin") &&
      !req.cookies.get("s_tkn")
    ) {
      return NextResponse.redirect(new URL("/superadmin/login", req.nextUrl));
    }
  
    return NextResponse.next(); // Allow access to all other routes
  }
  
  