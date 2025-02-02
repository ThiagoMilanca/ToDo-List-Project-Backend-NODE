import { UserRepository } from './user.repository';
import { RegisterDto, LoginDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { Response } from 'express';
import { AuthService } from '../../auth/auth.service';

type UserWithoutPassword = Omit<User, 'password'>;

export class UserService {
    private userRepository: UserRepository;
    private jwtService: AuthService;

    constructor(dataSource: DataSource) {
        this.userRepository = new UserRepository(dataSource);
        this.jwtService = new AuthService();
    }

    async register(registerDto: RegisterDto): Promise<User> {
        const { name, email, password } = registerDto;

        const userExists = await this.userRepository.findByEmail(email);
        if (userExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = hashedPassword;

        return this.userRepository.save(user);
    }

    async login(
        loginDto: LoginDto
    ): Promise<{ accessToken: string; user: UserWithoutPassword }> {
        const { email, password } = loginDto;

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Wrong or non-existent credentials');
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            throw new Error('Wrong or non-existent credentials');
        }

        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.generateToken(payload);

        const { password: _, ...userWithoutPassword } = user;

        return {
            accessToken,
            user: userWithoutPassword as UserWithoutPassword,
        };
    }

    logout(response: Response): void {
        response.clearCookie('accessToken', { httpOnly: true, secure: false });
        console.log('User has logged out');

        response.status(200).json({ message: 'Logged out successfully' });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }
}
