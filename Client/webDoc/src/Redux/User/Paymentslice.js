import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice  = createSlice({
    name:"paymentDetails",
    initialState:{
        paymentDetails:null
    },
    reducers:{
        paymentData:(state,action) =>{
            state.paymentDetails = action.payload;
        },
        clearPaymentData:(state)=>{
            state.paymentDetails = "";
        }
    }
})

export const {paymentData,clearPaymentData} = paymentSlice.actions;
export const selectPaymentDetails = (state) => state.paymentDetails.paymentDetails;
export default paymentSlice.reducer;