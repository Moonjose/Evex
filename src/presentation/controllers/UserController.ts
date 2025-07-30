import { Request, Response } from 'express';
import UserService from '@/domain/services/UserService';
import UserRepository from '@/infrastructure/repositories/UserRepository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
    static async create(req: Request, res: Response) {
        const user = await userService.create(req.body);
        return res.status(201).json(user);
    }

    static async list(req: Request, res: Response) {
        const users = await userService.getAll();
        return res.status(200).json(users);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        await userService.delete(id);
        return res.status(204).send();
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;

        const updatedUser = await userService.update(id, data);
        return res.status(200).json(updatedUser);
    }
}
