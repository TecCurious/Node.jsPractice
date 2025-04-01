import jwt from "jsonwebtoken";
export const verifyAuthentication = (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    console.log(token);
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("env variable",process.env.JWT_SECRET);
      req.user = decoded;
      console.log(decoded);
      next();
    } catch (error) {
      res.status(403).json({ message: 'Invalid token' });
    }
  };
  