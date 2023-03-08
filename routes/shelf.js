import express from 'express';

import { addBook, getShelf } from '../controllers/shelf.js';

const router = express.Router();

router.get('/', getShelf);
router.patch('/:category', addBook);

export default router;