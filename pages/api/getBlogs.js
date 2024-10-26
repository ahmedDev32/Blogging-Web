import mongoose from "mongoose";
import connectdb from "@/middleware/db";
import blogSchema from "@/models/blogSchema";

let handler = async (req, res) => {
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
        // Get the page and limit from query parameters, with default values.
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 9; // Default to 10 items per page if not provided

        // Calculate the starting index for the documents to fetch.
        const skip = (page - 1) * limit;

        // Get the total count of documents in the collection.
        const totalBlogs = await blogSchema.countDocuments();

        // Fetch the paginated data, sorted by createdAt in descending order.
        let blogdata = await blogSchema.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        if (blogdata) {
            return res.status(200).json({
                success: true,
                blogdata,
                pagination: {
                    totalBlogs,
                    currentPage: page,
                    totalPages: Math.ceil(totalBlogs / limit),
                    pageSize: blogdata.length
                }
            });
        } else {
            return res.status(404).json({ success: false, msg: "No blog data found" });
        }
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ msg: "Error In Getting Blogs Data From Db", success: false });
    }
}

export default connectdb(handler);
