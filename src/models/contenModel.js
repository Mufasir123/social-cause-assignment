import mongoose from "mongoose"

// 🎤 TED Talk Subschema
const TEDTalkSchema = new mongoose.Schema({
  title: { type: String },
  description: String,
  tedUrl: { type: String},
  url: { type: String},
  credit: String,
  speaker: String,
  publicId: String // Optional: for Cloudinary if used
},{ _id: true })

// 🎥 Video Subschema
const VideoSchema = new mongoose.Schema({
  title: { type: String},
  description: String,
  credit: String,
  url: { type: String},
  videoUrl: { type: String},
  publicId: String,
  type: String
},{ _id: true })

// 📚 Book Subschema
const BookSchema = new mongoose.Schema({
  title: { type: String},
  description: String,
  credit: String,
  author: String,
  bookUrl: { type: String},
  url: { type: String },
  publicId: String // In case you store file previews or covers
},{ _id: true })

// 📰 Article Subschema
const ArticleSchema = new mongoose.Schema({
  title: { type: String },
  description: String,
  credit: String,
  articleUrl: { type: String},
  url: { type: String},
  publicId: String
},{ _id: true })

// 📦 Main Content Schema
const ContentSchema = new mongoose.Schema({
  yourPassion: {
    type: String,
    enum: ['climate Action', 'gender equality', 'education', 'poverty', 'other'],
    default: 'other'
  },
  date: { type: Date, default: Date.now },
  tedTalks: [TEDTalkSchema],
  videos: [VideoSchema],
  books: [BookSchema],
  articles: [ArticleSchema]
}, { timestamps: true })

const ContentModel = mongoose.models.ContentModel || mongoose.model("ContentModel", ContentSchema)
export default ContentModel
