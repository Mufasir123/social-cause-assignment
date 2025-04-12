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
    yourPassion: {
        type: String,
        enum: [ 'poverty', 'education', 'health', 'environment', 'humanRights','articles writing','content creator'],
    },
})

const UserModel =mongoose.models.User || mongoose.model("User", userModel);

export default UserModel;