// models/Blog.js
import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  Slug: {
    type: String,
    required: [true, 'Slug is required'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  Category: {
    type: String,
    required: [true, 'Category  is required'],
    
  },
  Subcategory:{
    type: String,
    required: [true, 'Subcategory  is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
