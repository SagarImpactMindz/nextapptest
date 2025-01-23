import mongoose from "mongoose";

const connectDb=()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log('MongoDB connection established')
        })
        connection.on('error',(err)=>{
            console.log('MongoDB connection error: ' + err)
            process.exit()
        })
    } catch (error) {
        console.log("connection failed something wents wrong")
        console.log(error)
    }
}
export default connectDb