
import mongoose from "mongoose";

const companySchema=new mongoose.Schema({
    company_name:{type:String,required:true,trim:true,min:3,max:20,unique:true},
    email:{type:String,required:true,trim:true,min:3,max:20,unique:true},
    password:{type:String,required:true},
    status:{type:String,enum:["pending","accepted","rejected"],default:"pending",},
    role:{type:String,enum:["company","employee"],required:true,default:"company",}
},{timestamps:true})

const Company=mongoose.models.Company || mongoose.model('Company',companySchema)
export default Company
