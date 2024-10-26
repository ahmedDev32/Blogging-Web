import mongoose from "mongoose";
import connectdb from "@/middleware/db";
import blogSchema from "@/models/blogSchema";

let handler = async(req,res)=>{
    // Set CORS headers to allow all origins
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE, PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
    try {
         let {Slug}=req.query
         let deletedBlog=await blogSchema.findOneAndDelete({Slug})
         if (deletedBlog) {
            return res.status(200).json({
                success: true,
                msg: "Blog deleted successfully",
                data: deletedBlog
            });
        } else {
            return res.status(404).json({ success: false, msg: "Blog not found" });
        }
    } catch (error) {
          return res.status(500).json({msg:'Error In deleting blog',success:false})
    }
}

export default connectdb(handler)