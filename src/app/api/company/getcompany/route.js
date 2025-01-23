import connectDb from "@/lib/dbConfig";
import Company from "@/models/companymodel";
import { NextResponse } from "next/server";

connectDb();

export async function GET(req) {
  try {
    // // Retrieve the API key from headers
    // const apiKey = req.headers.get("x-api-key");

    // // Retrieve the secret key from environment variables
    // const secretKey = process.env.NEXT_PUBLIC_API_SECRET_KEY;

    // // Validate the API key
    // if (apiKey !== secretKey) {
    //   return NextResponse.json(
    //     { isSuccess: false, message: "Unauthorized access." },
    //     { status: 401 }
    //   );
    // }
    const companies = await Company.find();

    return NextResponse.json(
      { success: "Company", companies },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// static getCompany=async(req,res)=>{
//     try {
//         // const companies =await Company.find().select("-password")
//         const companies =await Company.find()
//         return res.status(200).json({ isSuccess: true, message: "Get Companies successful", companies });
//     } catch (error) {
//         console.error(error);
//         return res
//           .status(500)
//           .json({ isSuccess: false, message: "Something wents wrong" });
//     }
// }

// static editCompany = async (req, res) => {
// try {
//   const { companyId } = req.params; // Company ID from URL
//   const { company_name, email,password } = req.body; // Fields that can be updated
//     console.log(companyId,"company")
//   // Check if companyId is provided
//   if (!companyId) {
//     return res
//       .status(400)
//       .json({ isSuccess: false, message: "Company ID is required." }); // Bad Request
//   }

//   // Find the company by ID
//   const company = await Company.findById(companyId);
//   if (!company) {
//     return res
//       .status(404)
//       .json({ isSuccess: false, message: "Company not found." }); // Not Found
//   }

//   // Validate the fields to update (optional but recommended)
//   if (company_name) {
//     const companyNameExist = await Company.findOne({ company_name });
//     if (companyNameExist && companyNameExist._id.toString() !== companyId) {
//       return res
//         .status(409)
//         .json({ isSuccess: false, message: "company_name is already in use." }); // Conflict
//     }else{
//         company.company_name = company_name; // Update company_name if provided
//     }

//   }
//   if (email) {
//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res
//         .status(400)
//         .json({ isSuccess: false, message: "Invalid email format." }); // Bad Request
//     }

//     // Check if the email is already in use by another company
//     const emailExist = await Company.findOne({ email });
//     if (emailExist && emailExist._id.toString() !== companyId) {
//       return res
//         .status(409)
//         .json({ isSuccess: false, message: "Email is already in use." }); // Conflict
//     }

//     company.email = email; // Update email if provided
//   }
//   if(password) {
//     // Validate password strength
//    // Validate password strength
//    if (password.length < 8) {
//     return res.status(400).json({
//       isSuccess: false,
//       message: "Password must be at least 8 characters long.",
//     }); // Bad Request
//   }

//   if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//     return res.status(400).json({
//       isSuccess: false,
//       message: "Password must contain at least one special character.",
//     }); // Bad Request
//   }

//   if (!/\d/.test(password)) {
//     return res.status(400).json({
//       isSuccess: false,
//       message: "Password must contain at least one number.",
//     }); // Bad Request
//   }
//     // Hashing the password
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);
//     company.password = hashPassword; // Update password if provided

//   }

//   // Save the updated company to the database
//   await company.save();

//   return res.status(200).json({
//     isSuccess: true,
//     message: "Company updated successfully.",
//     company,
//   }); // OK response
// } catch (error) {
//   console.error(error);
//   return res.status(500).json({
//     isSuccess: false,
//     message: "Unable to update the company. Something went wrong.",
//   }); // Internal Server Error
// }
// };

// static deleteCompany = async (req, res) => {
// try {
//   const { companyId } = req.params; // Company ID from URL
//   // Check if companyId is provided
//   if (!companyId) {
//     return res
//       .status(400)
//       .json({ isSuccess: false, message: "Company ID is required." }); // Bad Request
//   }

//   // Find the company by ID
//   // const company = await Company.findByIdAndUpdate(companyId,{$set:{status:"pending",password:"Hello123"}});
//   const company = await Company.findByIdAndDelete(companyId);
//   return res.status(200).json({
//     isSuccess: true,
//     message: "Company deleted successfully.",
//   }); // OK response
// } catch (error) {
//   console.error(error);
//   return res.status(500).json({
//     isSuccess: false,
//     message: "Unable to delete the company. Something went wrong.",
//   }); // Internal Server Error
// }
// };
