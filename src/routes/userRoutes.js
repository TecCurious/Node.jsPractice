import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { verifyAuththentication } from '../middlewares/verifyAuthentication.js';
import { verifyRoles } from '../middlewares/verifyAuthorization.js';


const router = express.Router();


router.get('/',verifyAuththentication,verifyRoles("admin"), getAllUsers);
router.get('/profile',verifyAuththentication,(req, res)=>{
  res.status(200).json({succes:true, message:"you are authenticated you can access"});
})
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;