import express from 'express';

import {signup, getUser, updateProfile, findByName, getCount, updateCount, postGoal, getGoal, getNotification, getProgress, sendRequestResponse, sendRequestRead, createCheckout, isSubscribed, webhook, getMyProfile } from '../controllers/users.js';

const router = express.Router();

//router.post('/signin', signin);
router.post('/signup', signup);
router.get('/me', getMyProfile);
router.get('/getuser', getUser);
router.post('/updateprofile', updateProfile);
router.get('/findbyname', findByName);

export default router;
