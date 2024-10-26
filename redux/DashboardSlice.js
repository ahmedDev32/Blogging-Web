import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const DeleteBlog=createAsyncThunk('DeleteBlogs',async(Slug)=>{
   try {
    let res=await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/DeleteBlog?Slug=${Slug}`)
    return res.data
   } catch (error) {
    console.log('Some Thing Went Wrong',error);
    throw new Error("Error Happend",error)    
   }
})

export const EditBlog=createAsyncThunk('EditBlogs/Post',async(data)=>{
    try {
     let res=await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/updateBlog?SlugId=${data._id}`,data)
     return res.data
    } catch (error) {
     console.log('Some Thing Went Wrong',error);
     throw new Error("Error Happend",error)    
    }
 })

export const DashboardSlice=createSlice({
    name:"Dashboard",
    initialState:{
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(DeleteBlog.pending,(state)=>{
            state.status="loading"
        }).addCase(DeleteBlog.fulfilled,(state)=>{
            state.status="succeeded"
        }).addCase(DeleteBlog.rejected,(state,action)=>{
            state.status="rejected",
            state.error=action.error.message
        })
        .addCase(EditBlog.pending,(state)=>{
            state.status="loading"
        }).addCase(EditBlog.fulfilled,(state)=>{
            state.status="succeeded"
        }).addCase(EditBlog.rejected,(state,action)=>{
            state.status="rejected",
            state.error=action.error.message
        })
    }
})

export default DashboardSlice.reducer;