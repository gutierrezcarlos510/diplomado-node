import {Router} from "express";
import {authenticate} from "../middlewares/authenticate.middleware.js";
import tasksController from "../controllers/tasks.controller.js";

const router = Router();
router.route('/').get(authenticate, tasksController.getTasks). post(authenticate, tasksController.createTask);
router.route('/:id').get(authenticate, tasksController.getTask).put(authenticate, tasksController.updateTask)
    .patch(authenticate, tasksController.activateDesactivateTask).delete(authenticate, tasksController.deleteTask);
export default router;