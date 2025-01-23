// import jwt from 'jsonwebtoken'

// const gernateToken = (user) => {
//     const token_secret=process.env.JWT_SECRET_KEY
//     const token=jwt.sign({id: user._id,role:user.role},token_secret,{expiresIn:'15d'})
//     return token;   
// }

// export default gernateToken

// export const tokenVerification = (token) => {
//     try {
//         console.log("Starting token verification...");
//         const verifyToken=jwt.verify(token,process.env.JWT_SECRET_KEY)
//         console.log(verifyAccessToken, "verifyAccessToken Verification successful");
//         return {verifyAccessToken};
//     } catch (error) {
//         console.error("Verification failed:", error.message);
//         throw new Error("Token verification failed");  // Optional: Throw error if verification fails
//     }
// };


import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export async function generateTokenCompany(payload) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY_COMPANY); // Secret key
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" }) // Set header
    .setIssuedAt() // Set issued at time
    .setExpirationTime("15d") // Set expiration time
    .sign(secret); // Sign with secret key

    // await cookies().set("token", token, {
    //   httpOnly: true, // Cookie is inaccessible to JavaScript
    //   // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    //   secure: true,
    //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // 15 day
    //   path: "/",
    // })
  return token;
}
export async function generateTokenSuperAdmin(payload) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY_SUPER_ADMIN); // Secret key
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" }) // Set header
    .setIssuedAt() // Set issued at time
    .setExpirationTime("15d") // Set expiration time
    .sign(secret); // Sign with secret key

    // await cookies().set("token", token, {
    //   httpOnly: true, // Cookie is inaccessible to JavaScript
    //   // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    //   secure: true,
    //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // 15 day
    //   path: "/",
    // })
  return token;
}

// Verify a JWT
export async function verifyToken(token) {
    try {
        console.log(token,"from verify")
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY); // Secret key
    //   console.log(secret,"secret"); //
    //   const tokenverification = await jwtVerify(token, secret); // Verify the token
    //   console.log(tokenverification.payload,"ddddddddddddd")
      const { payload } = await jwtVerify(token, secret); // Verify the token
      return payload; // Return the decoded payload if verification succeeds
    } catch (error) {
      throw new Error("Invalid or expired token"); // Throw error if verification fails
    }
  }


// import { jwtVerify, SignJWT } from "jose";
// import { serialize } from 'cookie'
// export async function generateToken(payload) {
//   const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY); // Secret key
//   const token = await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256", typ: "JWT" }) // Set header
//     .setIssuedAt() // Set issued at time
//     .setExpirationTime("15d") // Set expiration time
//     .sign(secret); // Sign with secret key

//     const serialized = serialize('token', token, {
//       httpOnly: true, // Cookie will be sent only to the server
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'Strict',
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//       path: '/',
//     })
  
//     res.setHeader('Set-Cookie', serialized)
//   return token;
// }


// // Verify a JWT
// export async function verifyToken(token) {
//     try {
//         console.log(token,"from verify")
//       const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY); // Secret key
//     //   console.log(secret,"secret"); //
//     //   const tokenverification = await jwtVerify(token, secret); // Verify the token
//     //   console.log(tokenverification.payload,"ddddddddddddd")
//       const { payload } = await jwtVerify(token, secret); // Verify the token
//       return payload; // Return the decoded payload if verification succeeds
//     } catch (error) {
//       throw new Error("Invalid or expired token"); // Throw error if verification fails
//     }
//   }

