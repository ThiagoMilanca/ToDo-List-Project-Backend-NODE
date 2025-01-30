import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskDto, UpdateTaskDto } from './task.dto';
import { UserRepository } from '../users/user.repository';
import { User } from '../users/user.entity';
import { DataSource } from 'typeorm';

export class TaskService {
    private taskRepository: TaskRepository;
    private userRepository: UserRepository;

    constructor(dataSource: DataSource) {
        this.taskRepository = new TaskRepository(dataSource);
        this.userRepository = new UserRepository(dataSource);
    }

    async createTask(taskDto: TaskDto, userId: string): Promise<Task> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        return this.taskRepository.createTask(taskDto, user);
    }

    async getTasks(): Promise<Task[]> {
        return this.taskRepository.getAllTasks();
    }

    async getTaskById(id: string): Promise<Task | undefined> {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new Error(`Task with ID ${id} not found`);
        }
        return task;
    }

    async getTasksByUserId(userId: string): Promise<Task[]> {
        return this.taskRepository.findTasksByUserId(userId);
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<void> {
        await this.taskRepository.updateTask(id, updateTaskDto);
    }
}
