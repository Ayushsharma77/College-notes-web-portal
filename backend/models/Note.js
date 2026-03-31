const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    branch: {
      type: String,
      required: true,
      enum: ["CSE", "CSE-AI", "CSE-DS", "CSE-IoT", "ECE", "EE", "MECH", "CIVIL", "IT"],
    },
    year: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
    },
    semester: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["notes", "paper", "assignment", "book"],
      default: "notes",
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
    },
    publicId: {
      // Cloudinary public_id — needed to delete the file
      type: String,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [String],
  },
  { timestamps: true }
);

// Index for fast filtering
noteSchema.index({ branch: 1, year: 1, semester: 1 });
noteSchema.index({ subject: 1 });
noteSchema.index({ type: 1 });

module.exports = mongoose.model("Note", noteSchema);
