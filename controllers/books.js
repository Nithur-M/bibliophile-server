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
