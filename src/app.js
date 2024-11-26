import express from 'express';
import morgan from 'morgan';
import usersRoutes from "./routes/users.routes.js";
import loggerLog from "./logs/logger.log.js";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/task.routes.js";

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users",usersRoutes);
app.use("/api/login",authRoutes);
app.use("/api/tasks",tasksRoutes );
loggerLog.info("cargando.....");
export default app;
