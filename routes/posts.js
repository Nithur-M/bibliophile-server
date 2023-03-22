import express from 'express';

import { getPosts, getPostsBySearch, getPostsByCreator, getPost, createPost, updatePost, likePost, commentPost, deletePost, savePost, getSaves } from '../controllers/posts.js';

const router = express.Router();

router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/getSaves', getSaves);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', createPost);

router.post('/:id', savePost);

router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);
router.post('/:id/commentPost', commentPost);

export default router;