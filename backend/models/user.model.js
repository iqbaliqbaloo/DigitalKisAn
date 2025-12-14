// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  phoneNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[0-9]{11}$/, // Must be 11 digits
  },
  isVerified: { type: Boolean, default: false }, // Phone verified
  verifyCode: { type: String }, // OTP code for phone verification
  password: { type: String, required: true }, // Stored as hash
  roles: { type: [String], enum: ["buyer", "seller"], default: ["buyer"] }, // Default buyer
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
