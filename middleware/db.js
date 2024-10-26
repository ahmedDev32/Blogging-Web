import mongoose from 'mongoose'

let connectdb= handler=> async(req,res)=>{
    try {
        if(mongoose.connections[0].readyState){
            return handler(req,res)
        }else{
            await mongoose.connect(process.env.NEXT_MONGOOSE_URI)
            return handler(req,res)
        }
    } catch (error) {
        return res.status(500).json({msg:"Unable To Built DataBase Connection",success:false})
    }
} 

export default connectdb;