const express = require('express');
const router = express.Router();
const { getNotes, createNote, deleteNote } = require('../controllers/noteController');
const { protect } = require('../middleware/auth');

// Saare notes routes ko protect karein
router.use(protect); 

router.route('/')
  .get(getNotes)
  .post(createNote);

router.route('/:id')
  .delete(deleteNote);

module.exports = router;