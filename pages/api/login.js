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
        if(req.method==='POST'){
             let {username,password}=req.body;
             
             if(username==='blodweb@gmail.com'&& password==='blogwebsite'){
                return res.status(200).json({msg:"Login SuccessFully",success:true})
             }else{
                return res.status(404).json({msg:"Login Not Successfully",success:false})
             }
        }else{
            return res.status(404).json({msg:"Such Method Not Allowed",success:false})
        }
    } catch (error) {
        return res.status(500).json({msg:"Login internal Error",success:false})
    }
} 

export default handler