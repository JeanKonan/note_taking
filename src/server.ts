import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { Note } from './models/note';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('dist')); 

let notes: Note[] = [];

app.get('/api/notes', (req: Request, res: Response) => {
  res.json(notes);
});

app.post('/api/notes', (req: Request, res: Response) => {
  const { title, content } = req.body;
  const newNote = new Note(notes.length + 1, title, content);
  notes.push(newNote);
  res.json(newNote);
});

app.put('/api/notes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const noteIndex = notes.findIndex(note => note.id === +id);

  if (noteIndex !== -1) {
    notes[noteIndex] = { ...notes[noteIndex], title, content };
    res.json(notes[noteIndex]);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
