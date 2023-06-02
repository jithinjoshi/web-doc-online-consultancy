import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate'

const doctorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        min: [3, "firstname should contain atleast three characters"]
    },
    lastName: {
        type: String,
    },
    fullName:{
        type:String
    },
    mobile: {
        type: Number,
        unique: [true, "mobile number is already exist"],
        min: [10, "mobile number should contain 10 digits"]
    },
    email: {
        type: String,
        unique: [true, "email should be unique"],
    },
    department: {
        type: String,
    },
    dob: {
        type: String,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        min: [6, "password must contain 6 characters"]
    },
    image: {
        type: Object,
    },
    about: {
        type:String
    },
    experience:{
        type:Number,
    },
    startTime:{
        type:String
    },
    endTime:{
        type:String
    },
    timings : {
        type:Array
    },
    fees : {
        type:Number
    },
    deleted:{
        type:Boolean,
        default:false
    },
    certificate:{
        type:Object
    },
    status:{
        type:String,
        default:'pending'
    },
    timeSlots:{
        type:Array
    },
    leaves:{
        type:Array
    },
    doctorTimings:{
        type:Object
    }

});
doctorSchema.plugin(mongoosePaginate);

export default mongoose.model('Doctor', doctorSchema);