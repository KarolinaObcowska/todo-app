import { Router } from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/task";

const router = Router();

router
    .get('/', getTasks)
    .post('/', createTask);

router
    .get('/:id', getTask)
    .put('/:id', updateTask)
    .delete('/:id', deleteTask);

export default router;