import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';

export class TaskRepository {
    private taskRepository;
    private userRepository;

    constructor(dataSource: DataSource) {
        this.taskRepository = dataSource.getRepository(Task);
        this.userRepository = dataSource.getRepository(User);
    }

    async createTask(
        taskDto: { task: string; isActive?: boolean },
        user: User
    ): Promise<Task> {
        const task = this.taskRepository.create();
        task.task = taskDto.task;
        task.isActive =
            taskDto.isActive !== undefined ? taskDto.isActive : true;
        task.user = user;

        await this.taskRepository.save(task);
        return task;
    }

    async getAllTasks(): Promise<Task[]> {
        return this.taskRepository.find({ where: { isActive: true } });
    }

    async findById(id: string): Promise<Task | undefined> {
        return this.taskRepository.findOne({ where: { id, isActive: true } });
    }

    async findTasksByUserId(userId: string): Promise<Task[]> {
        return this.taskRepository.find({
            where: { user: { id: userId }, isActive: true },
            relations: ['user'],
        });
    }

    async updateTask(
        id: string,
        updateTaskDto: { task?: string; isActive?: boolean }
    ): Promise<void> {
        await this.taskRepository.update(id, updateTaskDto);
    }
}
