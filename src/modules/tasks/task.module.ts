import { DataSource } from 'typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { UserRepository } from '../users/user.repository';

export class TaskModule {
    private taskController: TaskController;
    private taskService: TaskService;
    private taskRepository: TaskRepository;
    private userRepository: UserRepository;

    constructor(dataSource: DataSource) {
        this.taskRepository = new TaskRepository(dataSource);
        this.userRepository = new UserRepository(dataSource);

        this.taskService = new TaskService(dataSource);

        this.taskController = new TaskController(this.taskService);
    }

    getController(): TaskController {
        return this.taskController;
    }
}
