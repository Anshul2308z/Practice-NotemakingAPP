import api from './api'; 

const noteService = {
    //Get all notes for the current user 
    getNotes : async () => {
        const response = await api.get('/notes'); 
        return response.data ; 
    },

    //Get note by an id 
    getNoteById : async (id) => {
        const response = await api.get(`/notes/${id}`);
        return response.data ; 
    },

    //Create a new note 
    createNote : async (noteData) => {
        const response = await api.post('/notes', noteData);
        return response.data ; 
    },

    //Update existing note 
    updateNote : async (id, noteData) => {
        const response = await api.put(`/notes/${id}`, noteData);
        return response.data ; 
    },

    //Delete note 
    deleteNote : async ( id ) => {
        const response = await api.delete(`/notes/${id}`) ;
        return response.data ;
    }
}

export default noteService ; 

/* 
What's happening?

Handles all note-related API calls
Uses the configured api instance (automatically includes auth token)
Returns response data directly
Clean interface for components to use
*/