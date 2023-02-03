import express from 'express';

import { addBook } from '../controllers/shelf.js';

const router = express.Router();

router.put('/:category', addBook);

export default router;