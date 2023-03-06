import Shelf from '../models/shelf.js';

export const addBook = async (req, res) => {
    const auth = req.currentUser;
    try {
        const shelf = await Shelf.findOne({ uid: auth.uid });
        const book = {
            title: req.body.title,
            author: req.body.author,
            cover: req.body.cover,
            year: req.body.year,
            id: req.body.id,
            addedDate: new Date()
        };

        // Check if the book is already in any category and remove it from that category
        for (let i = 0; i < shelf.readBooks.length; i++) {
            if (shelf.readBooks[i].id === book.id) {
                shelf.readBooks.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < shelf.currentlyReadingBooks.length; i++) {
            if (shelf.currentlyReadingBooks[i].id === book.id) {
                shelf.currentlyReadingBooks.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < shelf.toBeReadBooks.length; i++) {
            if (shelf.toBeReadBooks[i].id === book.id) {
                shelf.toBeReadBooks.splice(i, 1);
                break;
            }
        }
        switch (req.params.category) {
            case 'read':
                shelf.readBooks.push(book);
                break;
            case 'currentlyReading':
                shelf.currentlyReadingBooks.push(book);
                break;
            case 'toBeRead':
                shelf.toBeReadBooks.push(book);
                break;
            default:
                return res.status(400).send({ error: 'Invalid category' });
        }
        await shelf.save();
        res.status(201).json({message: "successfully added to your shelf"});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getShelf = async (req, res) => {
    const auth = req.currentUser;
    try {
        const shelf = await Shelf.findOne({ uid: auth.uid});
        res.status(200).json(shelf);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}