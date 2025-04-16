"use client";
import axios from "axios";
import { useState } from "react";

export default function UploadForm() {
  const [formData, setFormData] = useState({
    yourPassion: "education",
    date: new Date().toISOString().slice(0, 10),
    tedTalks: [
      { title: "", description: "", credit: "", speaker: "", file: null },
    ],
    videos: [{ title: "", description: "", credit: "", file: null }],
    books: [{ title: "", description: "", credit: "", author: "", file: null }],
    articles: [{ title: "", description: "", credit: "", file: null }],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (type, index, field, value) => {
    const updated = [...formData[type]];
    updated[index][field] = value;
    setFormData({ ...formData, [type]: updated });
  };

  const handleFileChange = (type, index, file) => {
    const updated = [...formData[type]];
    updated[index].file = file;
    setFormData({ ...formData, [type]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const body = new FormData();
    body.append("yourPassion", formData.yourPassion);
    body.append("date", formData.date);

    const types = ["tedTalks", "videos", "books", "articles"];

    types.forEach((type) => {
      formData[type].forEach((item, index) => {
        body.append(`${type}[${index}][title]`, item.title);
        body.append(`${type}[${index}][description]`, item.description);
        body.append(`${type}[${index}][credit]`, item.credit || "");
        if (type === "videos")
          body.append(`${type}[${index}][videoUrl]`, item.videoUrl || "");
        if (type === "articles")
          body.append(`${type}[${index}][articleUrl]`, item.articleUrl || "");
        if (type === "books")
          body.append(`${type}[${index}][bookUrl]`, item.bookUrl || "");
        if (type === "tedTalks")
          body.append(`${type}[${index}][tedUrl]`, item.tedUrl || "");
        if (type === "tedTalks")
          body.append(`${type}[${index}][speaker]`, item.speaker || "");
        if (type === "books")
          body.append(`${type}[${index}][author]`, item.author || "");
        if (item.file) body.append(`${type}Files`, item.file);
      });
    });

    try {
      const res = await axios.post("/api/upload", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const result = res.data;
      console.log("Response:", result);

      if (result.success) {
        alert("✅ Content uploaded successfully!");
      } else {
        alert("❌ Upload failed: " + result.error);
      }
    } catch (err) {
      alert("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFields = (label, type) => (
    <div className="border border-gray-200 rounded p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      {formData[type].map((item, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            className="input border-2 p-2 rounded-2xl"
            placeholder="Title"
            value={item.title}
            onChange={(e) => handleChange(type, index, "title", e.target.value)}
          />
          <textarea
            className="input border-2 p-2 rounded-2xl"
            placeholder="Description"
            value={item.description}
            onChange={(e) =>
              handleChange(type, index, "description", e.target.value)
            }
            rows="4" // Adjust rows as needed
          />
          {type === "videos" && (
            <input
              className="input border-2 p-2 rounded-2xl"
              placeholder="VideoUrl"
              value={item.videoUrl}
              onChange={(e) =>
                handleChange(type, index, "videoUrl", e.target.value)
              }
            />
          )}
          {type === "tedTalks" && (
            <input
              className="input border-2 p-2 rounded-2xl"
              placeholder="TedUrl"
              value={item.tedUrl}
              onChange={(e) =>
                handleChange(type, index, "tedUrl", e.target.value)
              }
            />
          )}

          {type === "tedTalks" && (
            <input
              className="input border-2 p-2 rounded-2xl"
              placeholder="Speaker"
              value={item.speaker}
              onChange={(e) =>
                handleChange(type, index, "speaker", e.target.value)
              }
            />
          )}

          {type === "books" && (
            <input
              className="input border-2 p-2 rounded-2xl"
              placeholder="Author"
              value={item.author}
              onChange={(e) =>
                handleChange(type, index, "author", e.target.value)
              }
            />
          )}
          {type === "articles" && (
            <input
              className="input border-2 p-2 rounded-2xl"
              placeholder="ArticleUrl"
              value={item.articleUrl}
              onChange={(e) =>
                handleChange(type, index, "articleUrl", e.target.value)
              }
            />
          )}
          {type === "books" && (
            <input
              className="input border-2 p-2 rounded-2xl"
              placeholder="BookUrl"
              value={item.bookUrl}
              onChange={(e) =>
                handleChange(type, index, "bookUrl", e.target.value)
              }
            />
          )}
          <input
            className="input border-2 p-2 rounded-2xl"
            placeholder="Credit"
            value={item.credit}
            onChange={(e) =>
              handleChange(type, index, "credit", e.target.value)
            }
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-red-400 font-semibold ml-3">
              Upload Image Or Vidoes
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(type, index, e.target.files[0])}
              className="file-input file-input-bordered file-input-sm border-2 p-2 rounded-2xl"
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white rounded shadow space-y-6"
    >
      <h2 className="text-2xl font-bold">Upload Content</h2>

      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium">Your Passion</label>
        <select
          value={formData.yourPassion}
          onChange={(e) =>
            setFormData({ ...formData, yourPassion: e.target.value })
          }
          className="select select-bordered w-full"
        >
          <option value="education">Education</option>
          <option value="climate Action">Climate Action</option>
          <option value="gender equality">Gender Equality</option>
          <option value="poverty">Poverty</option>
          <option value="other">Other</option>
        </select>
      </div>

      {renderFields("TED Talks", "tedTalks")}
      {renderFields("Videos", "videos")}
      {renderFields("Books", "books")}
      {renderFields("Articles", "articles")}

      <button
        type="submit"
        className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Submit"}
      </button>

      {message && (
        <div className="mt-4 text-sm text-center text-red-600">{message}</div>
      )}
    </form>
  );
}
