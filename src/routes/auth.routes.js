import {Router} from "express";
import AuthControllers from "../controllers/auth.controller.js";

const router = Router();
router.post("/", AuthControllers.login);
export default router;

