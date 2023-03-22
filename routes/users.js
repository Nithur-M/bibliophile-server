import express from 'express';

import { getUser, deleteUser, getFriends } from '../controllers/users.js';

const router = express.Router();

router.get('/:id', getUser);
router.get('/friends/:userId', getFriends);
// router.put('/:id/follow'. followUser);
// router.put('/:id/unfollow', unfollowUser)
router.delete('/:id', deleteUser);

export default router;