import { nanoid } from 'nanoid';

const NOTES_KEY = 'notes_storage';

interface Note {
  id: string;
  content: string;
  createdAt: string;
}

function getNotesFromStorage(): Record<string, Note> {
  try {
    const notesJson = localStorage.getItem(NOTES_KEY);
    return notesJson ? JSON.parse(notesJson) : {};
  } catch (error) {
    console.error('Failed to parse notes from localStorage', error);
    return {};
  }
}

function saveNotesToStorage(notes: Record<string, Note>) {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Failed to save notes to localStorage', error);
    throw new Error('Could not save notes.');
  }
}

export function saveNote(content: string): string {
  const notes = getNotesFromStorage();
  const id = nanoid(10);
  const newNote: Note = {
    id,
    content,
    createdAt: new Date().toISOString(),
  };
  notes[id] = newNote;
  saveNotesToStorage(notes);
  return id;
}

export function getNote(id: string): string | null {
  const notes = getNotesFromStorage();
  const note = notes[id];
  return note ? note.content : null;
}
