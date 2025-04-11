import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to your existing user model
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.models.Message || mongoose.model("Message", messageSchema);
