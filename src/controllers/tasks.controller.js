import { Task } from "../models/tasks.model.js";
import { User } from "../models/users.model.js";
import loggerLog from "../logs/logger.log.js";

async function getTasks(req, res) {
    try {
        const { userId } = req.user;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const tasks = await Task.findAll({
            where: { userId: userId },
            order: [["id", "DESC"]],
        attributes: ["id", "name", "done"] });
        return res.json(tasks);
    } catch (e) {
        loggerLog.error("Error getTasks: " + e);
    }
}
async function createTask(req, res) {
    try {
        const { name } = req.body;
        const { userId } = req.user;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const task = await Task.create({ name, userId });
        return res.json(task);
    } catch (e) {
        loggerLog.error("Error createTask: " + e);
    }
}
async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        const updatedTask = await Task.update({ name }, { where: { id } });
        return res.json(updatedTask);
    } catch (e) {
        loggerLog.error("Error updateTask: " + e);
    }
}
async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        await task.destroy();
        return res.status(204).json();
    } catch (e) {
        loggerLog.error("Error deleteTask: " + e);
    }
}
async function activateDesactivateTask(req, res) {
    try {
        const { id } = req.params;
        const { done } = req.body;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        const updatedTask = await Task.update({done}, { where: { id } });
        return res.json(updatedTask);
    } catch (e) {
        loggerLog.error("Error updateTask: " + e);
    }
}
async function getTask(req, res) {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        return res.json(task);
    } catch (e) {
        loggerLog.error("Error getTask: " + e);
    }
}

export default { getTasks, createTask, updateTask, deleteTask, activateDesactivateTask, getTask };