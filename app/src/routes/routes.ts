import { Router } from "express";
import { getTask, listTasks, addTask } from "../controllers/controllers";

const router = Router();

router.get("/", getTask);

router.get("/list", listTasks);

router.post("/add", addTask);

export default router;
