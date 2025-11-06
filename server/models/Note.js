const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Please add a title'],
        trim : true,
        maxlength : [100, 'Title cannot be more than 100 characters'],
    },
    content : {
        type : String,
        required : [true, 'Please add content'],
        trim: true 
    },
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true, 
        ref : 'User', // Reference to user model 
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Note', NoteSchema) ; 