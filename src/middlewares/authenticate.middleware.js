import jwt from "jsonwebtoken";
import "dotenv/config";


export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(token === "null") return res.status(401).json({error: "Unauthorized"});
        const secret = process.env.JWT_SECRET;
        jwt.verify(token, secret, (err, user) => {
            if(err) return res.status(401).json({error: "Unauthorized"});
            req.user = user;
            next();
        });

    } catch (error) {
        res.status(401).json({error: "Unauthorized"});
    }
}