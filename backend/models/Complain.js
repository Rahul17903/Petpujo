// models/Complaint.js
import mongoose from 'mongoose'

const complaintSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default  mongoose.model("Complaint", complaintSchema);