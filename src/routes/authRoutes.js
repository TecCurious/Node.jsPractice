import express from 'express';
import { register, login, refreshAccessToken, logoutUser } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/veifyToken.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',verifyToken, logoutUser);
router.post('/refresh-token',verifyToken,refreshAccessToken)

export default router;