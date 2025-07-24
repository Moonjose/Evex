import UserRepository from '@/infrastructure/repositories/UserRepository';
import { CreateUserDTO } from "@/domain/dtos/UserDTO";
import { User } from '@/domain/entities/User';
import { ConflictError, ValidationError } from '@/domain/errors/DomainErrors';

export default class UserService {
    constructor(
        private readonly repository: UserRepository
    ) {}

    async create(data: CreateUserDTO): Promise<User> {
        if (!data.name || !data.email || !data.password) {
            throw new ValidationError('Nome, email e senha são obrigatórios');
        }

        const userExists = await this.repository.findByEmail(data.email);
        if(userExists) {
            throw new ConflictError('Usuário com esse email já existe');
        }

        const user = await this.repository.create(data);
        return user;
    }

    async getAll(): Promise<User[]> {
        return this.repository.findAll();
    }
}
