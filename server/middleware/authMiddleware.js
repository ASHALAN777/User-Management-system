const jwt = require ('jsonwebtoken')


const authMiddleware = (req, res, next) => {

    try {
        const token = req.cookies?.access_token;

        if(!token) {
            return res.status(401).json({message:"Not Authenticated" }) ;


        }

        const decoded =jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id:decoded._id,
            email:decoded.email,
            role:decoded.role
        }

        next();
    }
     catch (error) {
        return res.status(401).json({message:"invalid"});
     }
}

module.exports = authMiddleware