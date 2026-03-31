const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");
const { cloudinary } = require("../middleware/upload");

// ─── GET /api/notes ──────────────────────────────────────────────────────────
// Query params: branch, year, semester, subject, type, search, page, limit
exports.getNotes = asyncHandler(async (req, res) => {
  const { branch, year, semester, subject, type, search, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (branch)   filter.branch   = branch;
  if (year)     filter.year     = Number(year);
  if (semester) filter.semester = Number(semester);
  if (subject)  filter.subject  = new RegExp(subject, "i");
  if (type)     filter.type     = type;
  if (search)   filter.title    = new RegExp(search, "i");

  const skip  = (Number(page) - 1) * Number(limit);
  const total = await Note.countDocuments(filter);
  const notes = await Note.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .select("-publicId");

  res.json({
    success: true,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: notes,
  });
});

// ─── GET /api/notes/subjects ─────────────────────────────────────────────────
exports.getSubjects = asyncHandler(async (req, res) => {
  const { branch, year, semester } = req.query;
  const filter = {};
  if (branch)   filter.branch   = branch;
  if (year)     filter.year     = Number(year);
  if (semester) filter.semester = Number(semester);

  const subjects = await Note.distinct("subject", filter);
  res.json({ success: true, data: subjects.sort() });
});

// ─── GET /api/notes/:id ──────────────────────────────────────────────────────
exports.getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id).select("-publicId");
  if (!note) return res.status(404).json({ success: false, message: "Note not found" });
  res.json({ success: true, data: note });
});

// ─── POST /api/notes ─────────────────────────────────────────────────────────
exports.uploadNote = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const { title, description, branch, year, semester, subject, type, tags } = req.body;

  // Log what we received from Cloudinary
  console.log("📁 File object:", {
    filename: req.file.filename,
    path: req.file.path,
    mimetype: req.file.mimetype,
  });

  const note = await Note.create({
    title,
    description,
    branch,
    year:     Number(year),
    semester: Number(semester),
    subject,
    type:     type || "notes",
    fileUrl:  req.file.path,
    publicId: req.file.filename,
    tags:     tags ? tags.split(",").map((t) => t.trim()) : [],
    uploadedBy: req.user._id,
  });

  console.log("💾 Saved note publicId:", note.publicId);

  res.status(201).json({ success: true, data: note });
});

// ─── PUT /api/notes/:id ──────────────────────────────────────────────────────
exports.updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!note) return res.status(404).json({ success: false, message: "Note not found" });
  res.json({ success: true, data: note });
});

// ─── DELETE /api/notes/:id ───────────────────────────────────────────────────
exports.deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ success: false, message: "Note not found" });

  // Delete from Cloudinary
  if (note.publicId) {
    await cloudinary.uploader.destroy(note.publicId, { resource_type: "raw" });
  }

  await note.deleteOne();
  res.json({ success: true, message: "Note deleted" });
});

// ─── GET /api/notes/:id/download ────────────────────────────────────────────
exports.downloadNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ success: false, message: "Note not found" });

  // Increment download counter
  await Note.findByIdAndUpdate(req.params.id, { $inc: { downloads: 1 } });

  // Generate a signed Cloudinary download URL so files work even when direct
  // raw delivery is restricted by account security settings.
  const fileName = note.fileUrl?.split("/").pop() || "";
  const extMatch = fileName.match(/\.([a-zA-Z0-9]+)$/);
  const format = extMatch ? extMatch[1].toLowerCase() : null;
  const safeBaseName = (note.title || "note")
    .replace(/[^a-zA-Z0-9-_ ]+/g, "")
    .trim()
    .replace(/\s+/g, " ") || "note";
  const downloadFileName = `${safeBaseName}.${format || "pdf"}`;

  const downloadUrl = cloudinary.utils.private_download_url(
    note.publicId,
    format,
    {
      resource_type: "raw",
      type: "upload",
      attachment: downloadFileName,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
    }
  );

  res.json({
    success: true,
    downloadUrl,
    message: "Download link generated",
  });
});

// ─── PATCH /api/notes/:id/download ──────────────────────────────────────────
exports.incrementDownload = asyncHandler(async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, { $inc: { downloads: 1 } });
  res.json({ success: true });
});
