const express = require("express") ; 

const {
    getNotes,
    getNoteById,
    updateNote,
    deleteNote, 
    createNote
} = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router() ; 

// All routes are protected (require authentication)

router.route('/')
  .get(protect, getNotes)      // GET /api/notes
  .post(protect, createNote);  // POST /api/notes

router.route('/:id')
  .get(protect, getNoteById)   // GET /api/notes/:id
  .put(protect, updateNote)    // PUT /api/notes/:id
  .delete(protect, deleteNote); // DELETE /api/notes/:id

module.exports = router;