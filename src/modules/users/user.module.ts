import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken';
import { DataSource } from 'typeorm';

export class UserModule {
    private userController: UserController;
    private userService: UserService;
    private userRepository: UserRepository;
    private jwtService: any;

    constructor(dataSource: DataSource) {
        this.userRepository = new UserRepository(dataSource);

        this.jwtService = jwt;

        this.userService = new UserService(dataSource);

        this.userController = new UserController(this.userService);
    }

    getController(): UserController {
        return this.userController;
    }
}
