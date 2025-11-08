import './NoteCard.css';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="note-card">
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
      </div>
      
      <div className="note-content">
        <p>{note.content}</p>
      </div>
      
      <div className="note-footer">
        <span className="note-date">
          {formatDate(note.updatedAt)}
        </span>
        <div className="note-actions">
          <button 
            onClick={() => onEdit(note)} 
            className="btn-edit"
            title="Edit note"
          >
            ✏️ Edit
          </button>
          <button 
            onClick={() => onDelete(note._id)} 
            className="btn-delete"
            title="Delete note"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;