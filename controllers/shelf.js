import Shelf from '../models/shelf.js';

export const addBook = async (req, res) => {
    const auth = req.currentUser;
    try {
        const shelf = await Shelf.findOne({ uid: auth.uid});
        const book = {
        title: req.body.title,
        author: req.body.author,
        cover: req.body.cover,
        id: req.body.id,
        addedDate: new Date()
        };
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
        res.send(shelf);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}