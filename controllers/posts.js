import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/post.js";
import Shelf from "../models/shelf.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  const auth = req.currentUser;
  const { page } = req.query;

  if (!auth) {
    return res.json({ message: "Unauthenticated" });
  }

  try {
    const shelf = await Shelf.findOne({ uid: auth.uid });
    const readBooks = shelf.readBooks.map(({ title: bookTitle }) => ({ bookTitle }));

    const bookRecommendationsRes = await fetch("http://localhost:5000/predict", {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ books: readBooks }),
      redirect: 'follow'
    });
    
    const bookRecommendations = await bookRecommendationsRes.json();

    const bookTitles = Object.values(bookRecommendations);

    // query the database to find posts with matching book titles
    const recommendedPosts = await PostMessage.find({ book_title: { $in: bookTitles } });
    const otherPosts = await PostMessage.find();
    
    const posts = { recommendedPosts: recommendedPosts, otherPosts: otherPosts}
    res.status(200).json({ data: posts });
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });

    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsByCreator = async (req, res) => {
  const auth = req.currentUser;
  const { creator } = req.query;

  if (!auth) {
    return res.json({ message: "Unauthenticated" });
  }

  try {
    const posts = await PostMessage.find({ creator: creator });

    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const auth = req.currentUser;
  const post = req.body;

  if (!auth) {
    return res.json({ message: "Unauthenticated" });
  }

  const newPostMessage = new PostMessage({ ...post, creator: auth.uid, createdAt: new Date().toISOString() });

  try {
    await newPostMessage.save();

    res.status(201).json({ message: "Your post was successful. Thank you for sharing!" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const savePost = async (req, res) => {
  const auth = req.currentUser;
  const { id } = req.params;

  if (!auth) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.saves.findIndex((id) => id === String(auth.uid));

  if (index === -1) {
    post.saves.push(auth.uid);
  } else {
    post.saves = post.saves.filter((id) => id !== String(auth.uid));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.status(201).json({ data: updatedPost });
};

export const getSaves = async (req, res) => {
  const auth = req.currentUser;

  if (!auth) {
    return res.json({ message: "Unauthenticated" });
  }

  try {
    const savedPosts = await PostMessage.find({ saves: auth.uid });
    res.json({ data: savedPosts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const auth = req.currentUser;
  const { id } = req.params;
  const like = req.body;

  if (!auth) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((like) => like.uid === String(auth.uid));

  if (index === -1) {
    post.likes.push({ ...like, uid: auth.uid });
  } else {
    post.likes.splice(index, 1);
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.status(201).json({ data: updatedPost });
};

export const commentPost = async (req, res) => {
  const auth = req.currentUser;
  const { id } = req.params;
  const comment = req.body;

  if (!auth) {
    return res.json({ message: "Unauthenticated" });
  }

  const post = await PostMessage.findById(id);

  post.comments.push({ ...comment, uid: auth.uid });

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.status(201).json({ message: "successful" });
};


export const getComments = async (req, res) => {
  const auth = req.currentUser;
  const { id } = req.params;

  if (!auth) {
    return res.json({ message: "Unauthenticated" });
  }

  const post = await PostMessage.findById(id);

  const comments = post.comments;
  res.status(201).json({ data: comments });
};

export default router;
