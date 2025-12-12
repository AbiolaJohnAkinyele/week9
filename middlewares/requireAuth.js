const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");


const requireAuth = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || authHeader.startWith('Bearer')){
        return res.status(401).json({error: 'Access denied, no token'});
    }

    const token = authHeader.replace('Bearer', '');

    try {
        const payload = JsonWebTokenError.verify(token, process.env.JWT_SECRET);
        
        const user = await UserModel.findById(payload.userId)
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        
        req.user = user; // now every route knows who is logged in
        next();
    } catch (error) {
        return res.status(401).json({error: 'Invalid or expired token'});
    }
}


module.exports = requireAuth;