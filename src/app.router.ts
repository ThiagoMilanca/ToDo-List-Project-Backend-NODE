import { Router } from 'express';
import { userRouter } from './modules/users/user.router';
import { taskRouter } from './modules/tasks/task.router';

const router = Router();

router.use('/users', userRouter);
router.use('/tasks', taskRouter);

export { router as appRouter };
