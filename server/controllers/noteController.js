const Note = require("../models/Note");

// @desc    Get all notes for logged-in user
// @route   GET /api/notes
// @access  Private

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user : req.user._id}).sort( {createdAt : -1} );
        res.json(notes);
    }catch(error){
        res.status(500).json({message : error.message});
    }
};


// @desc    Get single note by ID
// @route   GET /api/notes/:id
// @access  Private

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ messasge: 'Note not found'});
        };

        if ( note.user.toString() !== req.user._id.toString() ){
            return res.status(401).json({ message: 'Note authorized to access this note'});
        };

        res.json(note)
    }catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new note
// @route   POST /api/notes
// @access  Private

const createNote = async (req, res) => {
    try {
        const { title, content} = req.body ; 

        //Validation 
        if ( !title || !content){
            return res.status(400).json({ message: 'Please provide title and content'}); 
        }
        const note = await Note.create({
            title, 
            content, 
            user : req.user._id // Associate note with logged-in user
        });

        res.status(200).json(note); 
    }catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private

const updateNote = async (req,res) => { 
    try {
        const { title, content} = req.body ; 

        const note = await Note.findById(req.params.id) ; 

        if (!note) { 
          return res.status(404).json({ message: 'Note not found' });
        };

        if ( note.user.toString() !== req.user._id.toString()){
          return res.status(401).json({ message: 'Not authorized to update this note' });
        };

        // Update fields: 
        note.title = title || note.title ;
        note.content = content || note.content ; 

        const updatedNote = await note.save() ; 
        res.json(updatedNote)
    }catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private

const deleteNote = async (req, res) => { 
    try {
        const note = await Note.findById(req.params.id); 

        if ( !note ){
            res.status(404).json({message: 'Note not found'}); 
        };

        // Check if the note belongs to the logged-in user
        if ( note.user.toString() !== req.user._id.toString() ){
          return res.status(404).json({ message: 'Note not found' });
        };

        await note.deleteOne() ; 
        res.json({message: 'Note removed'});
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};

