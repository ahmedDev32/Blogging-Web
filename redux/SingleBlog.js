import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetSingleBlogs=createAsyncThunk('get/FetchSingleBlog',async(BlogId)=>{
    console.log(`${process.env.NEXT_PUBLIC_HOST}/api/getsingleBlog?${BlogId}`);
    
    let getData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getsingleBlog?${BlogId}`)
    if(!getData.ok){
        throw new error("Fetch Blog Failed")
    }else{
        return getData.json()
    }
})

export const GetBlog = createSlice({
    name: "SingleBlog",
    initialState:
    {
        Blogs: [],
        status: "idle",
        error: null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(GetSingleBlogs.pending,(state)=>{
            state.status="loading"
        }).addCase(GetSingleBlogs.fulfilled,(state,action)=>{
            state.status="fulfilled",
            state.Blogs=action.payload
        }).addCase(GetSingleBlogs.rejected,(state,action)=>{
            state.error=action.error.message,
            state.status='failed'
          })
    }
})

export default GetBlog.reducer;