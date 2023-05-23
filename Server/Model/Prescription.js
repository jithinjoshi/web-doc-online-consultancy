import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  username: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  }
}, { timestamps: true });

export const Prescription = mongoose.model('Prescription', prescriptionSchema);
