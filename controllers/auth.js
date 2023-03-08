import User from "../models/user.js";
import ShelfMessage from "../models/shelf.js";

export const signup = async (req, res) => {
  const { email, name, photoURL, uid } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const result = await User.create({ email, name, photoURL, uid });
    await ShelfMessage.create({ uid, readBooks: [], currentlyReadingBooks: [], toBeReadBooks: []})

    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};