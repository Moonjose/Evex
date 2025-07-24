import { Router } from 'express';
import { UserController } from '@/presentation/controllers/UserController'

export default (router: Router) => {
    router.post('/users', UserController.create);
    router.get('/users', UserController.list);
};