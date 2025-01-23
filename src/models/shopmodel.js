
import mongoose from "mongoose";

const shopSchema=new mongoose.Schema({
    shop_name:{type:String,required:true,trim:true,min:3,max:20},
    companyId:{type:mongoose.Schema.Types.ObjectId, ref: 'Company'}
},{timestamps:true})

const Shop=mongoose.models.Shop || mongoose.model('Shop',shopSchema)
export default Shop
