// redux/slices/counterSlice.js
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

// Define the async action using createAsyncThunk
export const fetchPosts = createAsyncThunk('get/fetchBlogs', async (blogPage) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getBlogs?page=${blogPage}`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json(); // Return the data
});

export const CounterSlice = createSlice({
  name: 'BlogsData',
  initialState: {
    Blogs:[],
    status:"idle",
    error:null,
    status:'pending'
  },
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(fetchPosts.pending,(state)=>{
      state.status='loading'
    }).addCase(fetchPosts.fulfilled,(state,action)=>{
        state.status='Succeed',
        state.Blogs=action.payload
    }).addCase(fetchPosts.rejected,(state,action)=>{
      state.error=action.error.message,
      state.status='failed'
    })
  }
})

export default CounterSlice.reducer;