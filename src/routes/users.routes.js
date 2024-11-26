import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import {authenticate} from "../middlewares/authenticate.middleware.js";

const router = Router();
router.route('/').get( usersController.getUsers).post(usersController.createUser);
router.route('/:id').get(authenticate, usersController.getUser).put(authenticate, usersController.updateUser).
patch(authenticate, usersController.activateDesactivateUser).delete(authenticate, usersController.deleteUser);
router.route('/:id/tasks').get(authenticate, usersController.getTaksAndUser);
export default router;
