import express, { Request, Response } from 'express';
import { AuthGuard } from '../../auth/auth.guard';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { dataSource } from '../../config/data-source';

const router = express.Router();
const taskService = new TaskService(dataSource);
const taskController = new TaskController(taskService);

router.post('/tasks/:userId', (req: Request, res: Response) =>
    taskController.createTask(req, res)
);
router.get('/tasks', (req: Request, res: Response) =>
    taskController.getTasks(req, res)
);
router.get('/tasks/:id', (req: Request, res: Response) =>
    taskController.getTaskById(req, res)
);
router.put('/tasks/:id', (req: Request, res: Response) =>
    taskController.updateTask(req, res)
);

router.get('/tasks/user/:userId', AuthGuard, (req: Request, res: Response) =>
    taskController.getTasksByUserId(req, res)
);

export { router as taskRouter };
