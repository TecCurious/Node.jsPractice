import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    const token  =  req.cookies?.accessToken; // Bearer
    console.log("verify token",req.cookies?.accessToken);
    // console.log(token);
    
    if (!token) {
      return res.status(403).json({ message: 'Access denied. No token provided.' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      // console.log(decoded);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  