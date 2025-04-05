import mongoose from "mongoose";

const videoContentSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    date: { type: Date, default: Date.now },
    yourPassion:{
        type: String,
        required: true,
        enum: ['climate Action', 'gender equality', 'education', 'poverty','other'],
        default: 'other'
    }

},{timestamps:true});

const videoContentModel = mongoose.models.VideoModel || mongoose.model("VideoModel", videoContentSchema);

export default videoContentModel

