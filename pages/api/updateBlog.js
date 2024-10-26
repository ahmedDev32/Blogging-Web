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
    if(req.method==='POST'){
        let {SlugId}=req.query
        console.log(SlugId);
        
        let updateBlog=await blogSchema.findOneAndUpdate({_id:SlugId},req.body,{
            new:true,
            runValidators: true
        });
        if (updateBlog) {
            
            return res.status(200).json({
                success: true,
                msg: "Blog updated successfully",
                data: updateBlog
            });
        } else {
            return res.status(404).json({ success: false, msg: "Blog not found" });
        }
       }else{
           return res.status(404).json({msg:"Such Method Not Allowed This Is Post Request",success:false})
       }
    } catch (error) {
        console.log(req.body,error);
        
        return res.status(500).json({msg:"Error In Updating Blog",success:false})
    }
}

export default connectdb(handler)