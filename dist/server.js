"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const note_1 = require("./models/note");
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('dist'));
let notes = [];
app.get('/api/notes', (req, res) => {
    res.json(notes);
});
app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;
    const newNote = new note_1.Note(notes.length + 1, title, content);
    notes.push(newNote);
    res.json(newNote);
});
app.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const noteIndex = notes.findIndex(note => note.id === +id);
    if (noteIndex !== -1) {
        notes[noteIndex] = Object.assign(Object.assign({}, notes[noteIndex]), { title, content });
        res.json(notes[noteIndex]);
    }
    else {
        res.status(404).json({ error: 'Note not found' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
