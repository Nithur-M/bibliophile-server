import mongoose from 'mongoose';

const shelfSchema = mongoose.Schema({
    uid: String,
    readBooks: [
        {
            title: String,
            author: [String],
            cover: String,
            id: String,
            addedDate: Date
        }
    ],
    currentlyReadingBooks: [
        {
            title: String,
            author: [String],
            cover: String,
            id: String,
            addedDate: Date
        }
    ],
    toBeReadBooks: [
        {
            title: String,
            author: [String],
            cover: String,
            id: String,
            addedDate: Date
        }
    ],
    addedDate: {
        type: Date,
        default: Date.now
    }    
});

const ShelfMessage = mongoose.model('Shelf', shelfSchema);

export default ShelfMessage;