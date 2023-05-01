import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    doctorId: {
        type: mongoose.Types.ObjectId
    },
    doctorName: {
        type: String
    },
    doctorImage: {
        type: String
    },
    department:{
        type:String
    },
    date: {
        type: Date
    },
    time: {
        type: String
    },
    price:{
        type:Number
    },
    payment_status:{
        type:String
    },
    paymentOwner:{
        type:String
    },
    paymentOwnerEmail:{
        type:String
    }
},
    { timestamps: true }
);

export const Appointment = mongoose.model('Appointment', appointmentSchema);