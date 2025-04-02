import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/veifyToken.js';
import { verifyRoles } from '../middlewares/verifyAuthorization.js';


const router = express.Router();


router.get('/',verifyToken,verifyRoles("user"), getAllUsers);
router.get('/profile',verifyToken,(req, res)=>{
  res.status(200).json({succes:true, message:"you are authenticated you can access"});
})
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;