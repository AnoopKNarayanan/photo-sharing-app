import express from 'express';
const router = express.Router();

import { register, authenticate, userProfile, fetchSharedPhotos, follow, upload, fetchUsersToFollow, fetchUserPhotos, deletePhoto } from '../controllers/user.controller';
import { verifyToken } from '../config/helper'

router.post('/register', register);
router.post('/authenticate', authenticate);
router.get('/userProfile', verifyToken, userProfile);
router.get('/fetchUserPhotos', verifyToken, fetchUserPhotos);
router.get('/fetchUsersToFollow', verifyToken, fetchUsersToFollow);
router.get('/fetchSharedPhotos', verifyToken, fetchSharedPhotos);
router.post('/follow', verifyToken, follow);
router.post('/upload', verifyToken, upload);
router.post('/deletePhoto', verifyToken, deletePhoto);

export default router;