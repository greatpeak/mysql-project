import express from "express";
import { getNotes, getNote, createNote } from "./database.js";

const app = express();

app.use(express.json());

// Route to fetch all notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await getNotes();
    res.status(200).json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching notes");
  }
});

// Route to fetch a single note by its ID
app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const note = await getNote(id);
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).send("Note not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching note");
  }
});

// Route to create a new note
app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).send("Title and contents are required");
  }

  try {
    const note = await createNote(title, contents);
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating note");
  }
});

// Global error handler (catches unhandled errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 💩");
});

// Start the server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
