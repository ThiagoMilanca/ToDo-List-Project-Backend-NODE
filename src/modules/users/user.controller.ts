import { Request, Response } from 'express';
import { UserService } from './user.service';
import { RegisterDto, LoginDto } from './user.dto';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async register(req: Request, res: Response): Promise<void> {
        const registerDto: RegisterDto = req.body;

        try {
            const user = await this.userService.register(registerDto);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        const loginDto: LoginDto = req.body;

        try {
            const { accessToken, user } = await this.userService.login(
                loginDto
            );
            res.status(200).json({ accessToken, user });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    logout(req: Request, res: Response): void {
        this.userService.logout(res);
    }

    async getUserByEmail(req: Request, res: Response): Promise<void> {
        const { email } = req.params;

        try {
            const user = await this.userService.getUserByEmail(email);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ message: 'User not found' });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const user = await this.userService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ message: 'User not found' });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
