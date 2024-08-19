const express = require('express');
const Note = require('./note');
const logger = require('./logger');
const router = express.Router();

const generateId = async () => {
    const notes = await Note.find();
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
    return maxId + 1;
};

router.get('/api/notes/page/:pageNum', async (req, res) => {
    const pageNum = parseInt(req.params.pageNum);
    const notesCount = 10;

    try {
        const notes = await Note.find()
            .skip((pageNum - 1) * notesCount)
            .limit(notesCount)
            .exec();

        const allNotes = await Note.countDocuments();

        res.json({
            notes,
            allNotes,
            currentPage: pageNum,
            totalPages: Math.ceil(allNotes / notesCount),
        });
    } catch (error) {
        console.log('Error while trying to get notes:', error);
        res.status(500).json({ message: 'Error fetching all notes' });
    }
});

router.post('/api/notes', async (req, res) => { 
    const body = req.body;

    if (!body.content) {
        return res.status(400).json({ error: 'Content missing' });
    }

    const note = new Note({
        id: await generateId(),
        title: body.title,
        author: {
            name: body.author.name,
            email: body.author.email
        },
        content: body.content,
        important: body.important || false
    });

    try {
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ message: `Error saving note` });
    }
});

router.get('/api/notes/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
      const note = await Note.findOne({ id });
      if (note) {
          res.json(note);
      } else {
          res.status(404).json({ message: 'Note not found' });
      }
  } catch (error) {
      console.log('Error fetching note:', error);
      res.status(500).json({ message: `Error getting note at id: ${id}` });
  }
});

router.put('/api/notes/:id', async (req, res) => {
    const id = Number(req.params.id);
    const updatedNoteData = req.body;
  
    try {
      const updatedNote = await Note.findOneAndUpdate(
        { id },
        updatedNoteData,
        { new: true }
      );
  
      if (updatedNote) {
        res.json(updatedNote);
      } else {
        res.status(404).json({ message: 'Note not found' });
      }
    } catch (error) {
      console.log('Error updating note:', error);
      res.status(500).json({ message: `Error updating note at id: ${id}` });
    }
});
  

router.get('/api/notes', async (req, res) => {
    try {
      const notes = await Note.find().exec();
      const count = await Note.countDocuments(); // Get the total count of notes
      res.json({
        notes,
        allNotes: count // Return the total number of notes
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  

router.delete('/api/notes/:id', async (req, res) => {
    let id = Number(req.params.id);

    try {
        const note = await Note.findOneAndDelete({ id });
        if (note) {
            res.status(204).end();
            console.log(`deleted successfully note with id: ${id}`);
        } else {
            res.status(500).json({ message: 'Note not found' });
        }
    } catch (error) {
        console.log('Error deleting note:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
