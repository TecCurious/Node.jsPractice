import { createUser, getUserByEmail} from "../models/userModel.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

export const menageSession = new Map();

export const register = async(req, res)=>{
    console.log(req.body);
    try{
    const {name, email, password} = req.body;

    //validation 
    if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }

    const userAlreadyExist = await getUserByEmail(email);
    if(userAlreadyExist){
        res.status(400).json({success:fslse, message:"user already registered!"});
    }

   const result = await createUser(name, email,password);

   if(!result){
        res.status(500).json({success:fslse, message:"somthing wrong while registring"});
   }
   delete result.password;
   console.log(result);
   res.status(201).json({success:true, message:"registration succesfull", result});

}catch(error){
    console.error("registration error", error);
    return res.status(500).json({
        success:false,
        message:"Server error during registration"
    });
}
}



export const login = async (req, res)=>{

    try{

    
    console.log(req.body);
    const {email, password} = req.body;
    const user = await getUserByEmail(email);

    if(!user){
       return res.status(401).json({success:false, message:"Invalid credentials"});
    }

    

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
     return res.status(401).json({success:false, message:"invalid credentials"});   
    }

    delete user.password;
    const sessionId = uuidv4();
    menageSession.set(sessionId, "true");
    
    res.cookie("sessionId", sessionId,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:24 * 60 * 60 * 1000
    })

    res.status(200).json({success:true, message:"login successfull",user});


}catch(error){
    console.error("login error", error);
    return res.status(500).json({
        success:false,
        message:"Server error during login"
    })
}

}