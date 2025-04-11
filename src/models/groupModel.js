// lib/models/Group.js
import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, },
  description: String,
}, { timestamps: true });

export default mongoose.models.Group || mongoose.model("Group", groupSchema);
