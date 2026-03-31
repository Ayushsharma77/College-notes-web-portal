const express = require("express");
const router  = express.Router();
const { upload } = require("../middleware/upload");
const { protect, adminOnly } = require("../middleware/auth");
const {
  getNotes,
  getNoteById,
  uploadNote,
  updateNote,
  deleteNote,
  incrementDownload,
  getSubjects,
  downloadNote,
} = require("../controllers/noteController");

// Public routes
router.get("/",            getNotes);          // GET /api/notes?branch=CSE&year=2&semester=3&type=notes
router.get("/subjects",    getSubjects);       // GET /api/notes/subjects?branch=CSE&year=2&semester=3
router.get("/:id",         getNoteById);
router.get("/:id/download",downloadNote);      // GET /api/notes/:id/download - generate signed URL
router.patch("/:id/download", incrementDownload);

// Admin only routes
router.post(  "/",    protect, adminOnly, upload.single("file"), uploadNote);
router.put(   "/:id", protect, adminOnly, updateNote);
router.delete("/:id", protect, adminOnly, deleteNote);

module.exports = router;
