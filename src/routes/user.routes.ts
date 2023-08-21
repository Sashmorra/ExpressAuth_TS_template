import express from 'express';
import { UserController } from '../controller/user.controller.js';
const userController = new UserController();
const userRouter = express.Router();

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);

export { userRouter };
