import request from 'supertest';
import { app, server } from '../index';
import { UserService } from '../modules/users/user.service';
import { UserController } from '../modules/users/user.controller';
import { dataSource } from '../config/data-source';

jest.mock('../modules/users/user.service', () => ({
    UserService: jest.fn().mockImplementation(() => ({
        register: jest.fn().mockResolvedValue({
            id: '1234',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'secret',
        }),
    })),
}));

jest.mock('../config/data-source', () => ({
    dataSource: {
        initialize: jest.fn().mockResolvedValue(true),
        getRepository: jest.fn().mockReturnValue({
            save: jest.fn().mockResolvedValue({
                id: '1234',
                name: 'John Doe',
                email: 'john@example.com',
                password: 'secret',
            }),
            findOne: jest.fn(),
        }),
    },
}));

describe('UserController', () => {
    let userService: UserService;
    let userController: UserController;

    beforeAll(async () => {
        userService = new UserService(dataSource);
        userController = new UserController(userService);
    });

    afterAll(async () => {
        server.close();
    });

    it('should create a new user and return it', async () => {
        const mockUser = {
            id: '1234',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'secret',
        };

        const response = await request(app).post('/users/register').send({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'secret',
        });

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(mockUser);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('John Doe');
        expect(response.body.email).toBe('john@example.com');
    });
});
