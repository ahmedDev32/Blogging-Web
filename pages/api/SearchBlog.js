import connectdb from "@/middleware/db";
import blogSchema from "@/models/blogSchema";
import mongoose from "mongoose";

const handler = async (req, res) => {
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
    let { keyword = '' } = req.query;
    let page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit || 9);
    let skip = (page - 1) * limit;

    // Calculate total number of blogs that match the search criteria
    const totalBlogs = await blogSchema.countDocuments({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { content: { $regex: keyword, $options: 'i' } },
        { Category: { $regex: keyword, $options: 'i' } },
        { Subcategory: { $regex: keyword, $options: 'i' } }
      ],
    });

    // Find blogs with search, pagination, and sorting applied
    const findBlog = await blogSchema.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { content: { $regex: keyword, $options: 'i' } },
        { Category: { $regex: keyword, $options: 'i' } },
        { Subcategory: { $regex: keyword, $options: 'i' } }
      ],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Respond with the results and pagination details
    return res.status(200).json({
      findBlog,
      length: findBlog.length,
      success: true,
      pagination: {
        totalBlogs,
        currentPage: page,
        totalPages: Math.ceil(totalBlogs / limit),
        pageSize: findBlog.length,
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};

export default connectdb(handler);
