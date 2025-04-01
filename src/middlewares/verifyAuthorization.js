

export const verifyRoles = (...allowedRoles) => {
    
    return (req, res, next) => {
        console.log('int authorization function',req.user);
        if (!allowedRoles.includes(req.user.role)) {
            console.log(req.user.role);
            return res.status(403).json({ message: "Access Forbidden: You do not have permission!" });
        }
        next();
    };
};
