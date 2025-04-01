

export const verifyRoles = (...allowedRoles) => {
    
    return (req, res, next) => {
        console.log('int authorization function',req.session.user);
        if (!allowedRoles.includes(req.session.user.role)) {
            console.log(req.session.user.role);
            return res.status(403).json({ message: "Access Forbidden: You do not have permission!" });
        }
        next();
    };
};
