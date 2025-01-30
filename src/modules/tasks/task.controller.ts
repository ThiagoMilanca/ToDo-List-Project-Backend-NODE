import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { TaskDto, UpdateTaskDto } from './task.dto';

export class TaskController {
    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    async createTask(req: Request, res: Response): Promise<Response> {
        const { task, isActive } = req.body;
        const userId = req.params.userId;

        const taskDto: TaskDto = { task, isActive };

        try {
            const newTask = await this.taskService.createTask(taskDto, userId);
            return res.status(201).json(newTask);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getTasks(req: Request, res: Response): Promise<Response> {
        try {
            const tasks = await this.taskService.getTasks();
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getTaskById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const task = await this.taskService.getTaskById(id);
            if (task) {
                return res.status(200).json(task);
            } else {
                return res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getTasksByUserId(req: Request, res: Response): Promise<Response> {
        const { userId } = req.params;

        try {
            const tasks = await this.taskService.getTasksByUserId(userId);
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateTask(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const updateData: UpdateTaskDto = req.body;

        try {
            await this.taskService.updateTask(id, updateData);
            return res
                .status(200)
                .json({ message: 'Task updated successfully' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
