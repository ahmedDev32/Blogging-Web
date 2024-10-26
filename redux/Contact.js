import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk
export const SendContactPage = createAsyncThunk(
    'contact/sendEmail', // action type string
    async (data) => {
        try {
            let res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/contact`, data);
            return res.data; // return the response data
        } catch (error) {
            console.log('Some issue happened', error);
            throw new Error("Failed to send email");
        }
    }
);

// Create the slice
export const ContactPage = createSlice({
    name: "Contact",
    initialState: {
        status: "idle",
        error: null,
        data: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SendContactPage.pending, (state) => {
                state.status = "loading";
            })
            .addCase(SendContactPage.fulfilled, (state, action) => {
                state.status = "succeeded"; // Change status to succeeded
                state.data = action.payload; // Store the returned data
            })
            .addCase(SendContactPage.rejected, (state, action) => {
                state.status = "failed"; // Change status to failed
                state.error = action.error.message; // Capture error message
            });
    }
});


export default ContactPage.reducer;
