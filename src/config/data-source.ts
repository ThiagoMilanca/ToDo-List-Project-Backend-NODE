import { DataSource } from 'typeorm';
import { Task } from '../modules/tasks/task.entity';
import { User } from '../modules/users/user.entity';

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Task, User],
    synchronize: true,
});

dataSource
    .initialize()
    .then(() => {
        console.log('DataSource has been initialized!');
    })
    .catch((err) => {
        console.error('Error during DataSource initialization:', err);
    });

export { dataSource };
