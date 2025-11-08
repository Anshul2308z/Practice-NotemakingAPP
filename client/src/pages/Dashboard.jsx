import { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import noteService from '../services/noteService';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [syncing, setSyncing] = useState(false);

  // Fetch notes from server
  const fetchNotes = async () => {
    try {
      setSyncing(true);
      setError('');
      const data = await noteService.getNotes();
      setNotes(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  // Load notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle create note
  const handleCreateNote = async (noteData) => {
    try {
      const newNote = await noteService.createNote(noteData);
      setNotes([newNote, ...notes]); // Add to beginning of array
      setShowForm(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create note');
    }
  };

  // Handle update note
  const handleUpdateNote = async (id, noteData) => {
    try {
      const updatedNote = await noteService.updateNote(id, noteData);
      setNotes(notes.map((note) => (note._id === id ? updatedNote : note)));
      setEditingNote(null);
      setShowForm(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note');
    }
  };

  // Handle delete note
  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await noteService.deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note');
    }
  };

  // Handle edit button click
  const handleEditClick = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  // Handle new note button click
  const handleNewNoteClick = () => {
    setEditingNote(null);
    setShowForm(true);
  };

  // Handle cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  // Handle sync to cloud
  const handleSyncToCloud = () => {
    fetchNotes();
  };

  if (loading) {
    return <div className="loading">Loading your notes...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>My Notes</h1>
          <p>Welcome back, {user ? user : ''}! 👋</p>
        </div>
        <div className="dashboard-actions">
          <button
            onClick={handleSyncToCloud}
            className="btn-secondary"
            disabled={syncing}
          >
            {syncing ? '☁️ Syncing...' : '☁️ Sync to Cloud'}
          </button>
          <button onClick={handleNewNoteClick} className="btn-primary">
            ➕ New Note
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <NoteForm
          note={editingNote}
          onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
          onCancel={handleCancelForm}
        />
      )}

      <div className="notes-container">
        {notes.length === 0 ? (
          <div className="empty-state">
            <h2>📝 No notes yet</h2>
            <p>Click "New Note" to create your first note!</p>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEditClick}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;