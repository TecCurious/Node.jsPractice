import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { verifyAuthentication} from '../middlewares/verifyAuthentication.js';
import { verifyRoles } from '../middlewares/verifyAuthorization.js';


const router = express.Router();


router.get('/',verifyAuthentication,verifyRoles("user"), getAllUsers);
router.get('/profile',verifyAuthentication,(req, res)=>{
  res.status(200).json({succes:true, message:"you are authenticated you can access"});
})
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;