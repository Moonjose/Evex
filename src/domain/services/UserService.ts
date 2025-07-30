import UserRepository from '@/infrastructure/repositories/UserRepository';
import { CreateUserDTO, UpdateUserDTO } from "@/domain/dtos/UserDTO";
import { User } from '@/domain/entities/User';
import { ConflictError, ValidationError, NotFoundError } from '@/domain/errors/DomainErrors';

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

    async delete(id: string): Promise<void> {
        const user = await this.repository.delete(id);
        if(!user) {
            throw new NotFoundError('Usuário não encontrado');
        }
    }

    async update(id: string, data: UpdateUserDTO): Promise<User> {
        if (Object.keys(data).length === 0) {
            throw new ValidationError('É necessário informar pelo menos um campo para atualização');
        }
        const updatedUser = await this.repository.update(id, data);

        if (!updatedUser) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return updatedUser;
    }
}
