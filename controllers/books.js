<<<<<<< HEAD
export const search = async (req, res) => {
    const q = req.query.key
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=6`);
        const results = await response.json();
        res.status(201).json(results.items);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
=======
import mongoose from "mongoose";

export const search = async (req, res) => {
  console.log(req.query.query);
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.query.query}&maxResults=6`);
    const results = await response.json();
    res.status(201).json(results.items);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
>>>>>>> 81f18da492568c43dc7ee0462a892a9b41b6e2e9
