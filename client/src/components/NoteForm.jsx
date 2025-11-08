import { useState, useEffect } from 'react';
import './NoteForm.css';

const NoteForm = ({ note, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pre-fill form if editing
  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
      });
    }
  }, [note]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please fill in both title and content');
      return;
    }

    try {
      setLoading(true);
      if (note) {
        await onSubmit(note._id, formData);
      } else {
        await onSubmit(formData);
      }
      // Reset form
      setFormData({ title: '', content: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="note-form-overlay">
      <div className="note-form-container">
        <div className="note-form-header">
          <h2>{note ? 'Edit Note' : 'Create New Note'}</h2>
          <button onClick={onCancel} className="close-btn" title="Close">
            ✕
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter note title"
              maxLength="100"
            />
            <small>{formData.title.length}/100 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your note here..."
              rows="10"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : note ? 'Update Note' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;