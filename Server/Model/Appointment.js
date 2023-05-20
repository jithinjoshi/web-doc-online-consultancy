import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate'

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

appointmentSchema.plugin(mongoosePaginate);

export const Appointment = mongoose.model('Appointment', appointmentSchema);
