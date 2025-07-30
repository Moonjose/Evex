import { Router } from 'express';
import { UserController } from '@/presentation/controllers/UserController'

export default (router: Router) => {
    router.post('/users', UserController.create);
    router.get('/users', UserController.list);
    router.delete('/users/:id', UserController.delete);
    router.patch('/users/:id', UserController.update);
};