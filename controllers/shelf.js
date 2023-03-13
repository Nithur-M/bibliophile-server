import Shelf from "../models/shelf.js";

export const addBook = async (req, res) => {
  const auth = req.currentUser;
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      cover: req.body.cover,
      year: req.body.year,
      id: req.body.id,
      addedDate: new Date(),
    };
    let shelf = await Shelf.findOne({ uid: auth.uid });
    if (!shelf) {
      // Create a new shelf for the user
      shelf = new Shelf({ uid: auth.uid });
    }

    switch (req.params.category) {
      case "read":
        shelf.readBooks.push(book);
        break;
      case "currentlyReading":
        shelf.currentlyReadingBooks.push(book);
        break;
      case "toBeRead":
        shelf.toBeReadBooks.push(book);
        break;
      default:
        return res.status(400).send({ error: "Invalid category" });
    }
    await shelf.save();
    res.status(201).json({ message: "successfully added to your shelf" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getShelf = async (req, res) => {
  const auth = req.currentUser;
  try {
    const shelf = await Shelf.findOne({ uid: auth.uid });
    res.status(200).json(shelf);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
