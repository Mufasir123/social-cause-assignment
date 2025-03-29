import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    yourPassion:{
        type: String,
        required: true,
        enum: ['Climate Action', 'Gender Equality', 'Education', 'Poverty','other'],
        default: 'other'
    }
})

const UserModel =mongoose.models.User || mongoose.model("User", userModel);

export default UserModel;