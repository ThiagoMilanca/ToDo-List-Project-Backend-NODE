import { DataSource } from 'typeorm';
import { Task } from '../modules/tasks/task.entity';
import { User } from '../modules/users/user.entity';

const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'your-username',
    password: 'your-password',
    database: 'your-database',
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
