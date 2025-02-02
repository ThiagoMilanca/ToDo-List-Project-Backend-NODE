import express from 'express';
import { AuthGuard } from '../../auth/auth.guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { dataSource } from '../../config/data-source';

const router = express.Router();
const userService = new UserService(dataSource);
const userController = new UserController(userService);

router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.post('/logout', (req, res) => userController.logout(req, res));

router.get('/users', AuthGuard, (req, res) =>
    userController.getAllUsers(req, res)
);
router.get('/users/:id', AuthGuard, (req, res) =>
    userController.getUserById(req, res)
);
router.get('/users/email/:email', AuthGuard, (req, res) =>
    userController.getUserByEmail(req, res)
);

export { router as userRouter };
