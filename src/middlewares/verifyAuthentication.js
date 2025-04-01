import { menageSession } from "../controllers/authController.js";

 export const verifyAuththentication = (req, res,next)=>{
    

    const sessionId = req.cookies.sessionId;

    if(sessionId){
        return res.status(401).json({
            success: false,
            message: 'Unauthorized - Please log in'
          });
    }
    
        const id = menageSession.get(sessionId);
        if(sessionId  != id){
            return res.status(401).json({
                success: false,
                message: 'Unauthorized - Please log in'
              });
        }

        next();
}

