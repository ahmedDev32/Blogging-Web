import connectdb from "@/middleware/db";
import UserEmail from "@/models/UserEmail";

let handler=async(req,res)=>{
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
        if(req.method !== "POST"){
           return res.status(404).jon({msg:"such method not allowed",success:false})
        }else{
        let {email}=req.body
        let useremail=new UserEmail({
            email
        })
        await useremail.save({})
        return res.status(200).json({msg:"user added",success:true})
        }
    } catch (error) {
        return res.status(500).json({msg:"InterNal Error",success:false})
    }
}

export default connectdb(handler)