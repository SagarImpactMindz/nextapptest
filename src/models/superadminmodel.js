import mongoose from "mongoose";

const superAdminSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true,min:3,max:20},
    email: {type:String,required:true,trim:true,lowercase:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:["superadmin"],required:true,default:"superadmin",}
},{timestamps:true})

const SuperAdmin=mongoose.models.SuperAdmin || mongoose.model('SuperAdmin',superAdminSchema)
export default SuperAdmin
//mongoose.models.superadmins  use this if this schema /model is already created then next js not creates new one


