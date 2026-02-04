const Note = require('../models/Note');

// Get all notes for the logged-in user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
      user: req.user
    });
    const savedNote = await savedNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: 'Error creating note' });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    
    // Check ownership
    if (note.user.toString() !== req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};