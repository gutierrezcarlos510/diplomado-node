import { User } from "../models/users.model.js";
import loggerLog from "../logs/logger.log.js";
import {Status} from "../constants/index.constants.js";
import {Task} from "../models/tasks.model.js";

async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: ["id","username","password","status"],
            order: [["id", "DESC"]],
            where: {
                status: Status.ACTIVE
            }
        });
        return res.json(users);
    } catch (e) {
        loggerLog.error("Error getUser: "+ e);
        return res.status(500).json({ error: e.message });
    }
}
async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.create({username, password});
        return res.json(user);
    } catch (e) {
        loggerLog.error("Error createUser: "+ e);
        return res.status(500).json({ error: e.message });
    }
}
async function getUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: ["username","status"],
        });
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(user);
    } catch (e) {
        loggerLog.error("Error getUser: "+ e);
        return res.status(500).json({ error: e.message });
    }
}
async function updateUser(req, res) {
    try {
        const {id} = req.params;
        const {username, password} = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        user.username = username;
        user.password = password;
        const resp =  await User.update({username, password}, { where: {id}});
        return res.json(resp);
    } catch (e) {
        loggerLog.error("Error updateUser: " + e);
    }
}
async function activateDesactivateUser(req, res) {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        user.status = status;
        await user.save();
        return res.json(user);
    } catch (e) {
        loggerLog.error("Error updateUser: " + e);
    }
}
async function deleteUser(req, res) {
    try {
        const {id} = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        await user.destroy();
        return res.status(204).json();
    } catch (e) {
        loggerLog.error("Error updateUser: " + e);
    }
}
async function getTaksAndUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            attributes: ["username"],
            include: [{
                model: Task,
                attributes: ["name", "done"],
                where: {
                    done: false
                }
            }],
            where: { id }
        });
        if (!user) {
            return res.status(404).json({ error: "Task not found" });
        }
        return res.json(user);
    } catch (e) {
        loggerLog.error("Error getTask: " + e);
    }
}
export default { getUsers, createUser, getUser, updateUser, activateDesactivateUser, deleteUser, getTaksAndUser};