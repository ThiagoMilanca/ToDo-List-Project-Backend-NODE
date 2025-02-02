import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task } from './modules/tasks/task.entity';
import { User } from './modules/users/user.entity';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Task],
    synchronize: true,
    logging: ['error'],
    dropSchema: false,
});
