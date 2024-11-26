import {User} from "../models/users.model.js";
import loggerLog from "../logs/logger.log.js";
import { comparar} from "../common/bcrypt.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function login(req, res) {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({where: {username}});
        if (!user) {
            return res.status(401).json({ error: "Invalid username" });
        }
        if(user.status !== "active") {
            return res.status(401).json({ error: "Usuario inactivo" });
        }
        if(!(await comparar(password, user.password)))
            return res.status(401).json({ error: "Usuario no autorizado" });
        const segundos = process.env.JWT_EXPIRES_SECONDS;
        console.log(segundos);
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn:  eval(segundos)});
        return res.json({ token });
    } catch (error) {
        loggerLog.error(error);
        res.status(401).json({ error: "Unauthorized" });
    }
}
export default {login};