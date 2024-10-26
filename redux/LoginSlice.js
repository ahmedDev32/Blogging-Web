import axios from "axios";
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';


export const LoginApi=createAsyncThunk('Post/Login',async(data)=>
{
    try {
        let res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`,data);
        return res.data;
    } catch (error) {
        console.log('Some issue happened', error);
      throw new Error("SomeThing Went Wrong",error);  
    }
}
)

export const LoginSlice = createSlice({
    name:"Login",
    initialState:{
        error:null,
        status:"pending"
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(LoginApi.pending,(state)=>{
            state.status="loading"
        }).addCase(LoginApi.fulfilled,(state)=>{
            state.status="suceeded"
        }).addCase(LoginApi.rejected,(state,action)=>{
            state.status='rejected',
            state.error=action.error.message
        })
    }

})

export default LoginSlice.reducer;