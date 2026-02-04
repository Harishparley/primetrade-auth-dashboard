const express = require('express');
const router = express.Router();
const { getNotes, createNote, deleteNote } = require('../controllers/noteController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getNotes).post(protect, createNote);
router.route('/:id').delete(protect, deleteNote);

module.exports = router;