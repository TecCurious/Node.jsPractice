import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { verifyAuththentication } from '../middlewares/verifyAuthentication.js';

const router = express.Router();


router.get('/', getAllUsers);
router.get('/profile',verifyAuththentication,(req, res)=>{
  res.send("you are authenticated you can access");
})
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;