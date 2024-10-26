import axios from "axios";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

export const searchapi=createAsyncThunk('Get/Search',async({Keyword,page})=>{
    try {
        let res=await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/SearchBlog?keyword=${Keyword}&page=${page}`)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
});

export const SearchSlice=createSlice({
    name:"SearchBlog",
    initialState:{
        error:null,
        status:"Pending",
        Blogs:[]
    },reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(searchapi.pending,(state)=>
        {
            state.status='Loading'
        }
        ).addCase(searchapi.fulfilled,(state,action)=>{
            state.status="Succeeded"
            state.Blogs=action.payload
        }).addCase(searchapi.rejected,(state,action)=>{
            state.status="rejected",
            state.error=action.error.message
        })
    }
})

export default SearchSlice.reducer;