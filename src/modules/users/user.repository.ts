import { DataSource } from 'typeorm';
import { User } from './user.entity';

export class UserRepository {
    private userRepository;

    constructor(dataSource: DataSource) {
        this.userRepository = dataSource.getRepository(User);
    }

    async save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findById(id: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }
}
