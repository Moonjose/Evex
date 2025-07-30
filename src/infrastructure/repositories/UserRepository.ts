import { User } from '@/domain/entities/User';
import { CreateUserDTO, UpdateUserDTO } from "@/domain/dtos/UserDTO";
import { Repository } from '@/infrastructure/repositories/Repository';
import { getLogger } from '@/infrastructure/utils/Logger';
import { DatabaseError } from '@/domain/errors/InfrastructureErrors';

export default class UserRepository {
    private readonly repository = Repository.getInstance();
    private readonly users = this.repository.database().user;
    private readonly LOGGER = getLogger();

    async create(data: CreateUserDTO): Promise<User> {
        try {
            const user = await this.users.create({ data });
            return user;
        } catch (error: any) {
            this.LOGGER.error(`Erro ao criar um novo usuário no banco de dados ${error.message}`);
            throw new DatabaseError(error.message);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const users = await this.users.findMany();
            return users;
        } catch (error: any) {
            this.LOGGER.error(`Erro ao listar todos os usuários do banco de dados ${error.message}`);
            throw new DatabaseError(error.message);
        }
    }

    async findByEmail(email: string): Promise<User| null>  {
        try {
            const user = await this.users.findUnique({ where: { email } });
            if (!user) return null;
            return user;
        } catch (error: any) {
            this.LOGGER.error(`Usuário nao foi encontrado por email ${error.message}`);
            throw new DatabaseError(error.message); 
        }
    }

    async delete(id: string): Promise<User | null> {
        try {
            const deleted = await this.users.delete({
                where: { id },
            })
            return deleted;
        } catch (error: any) {
            if (error.code === 'P2025') return null
            this.LOGGER.error(`Não foi possível deletar o usuário do banco de dados ${error.message}`);
            throw new DatabaseError(error.message); 
        }
    }

    async update(id: string, data: UpdateUserDTO): Promise<User | null> {
        try {
            const updated = await this.users.update({
                where: { id },
                data,
            })
            return updated;
        } catch (error: any) {
            if (error.code === 'P2025') return null
            this.LOGGER.error(`Não foi possível atualizar o usuário do banco de dados ${error.message}`);
            throw new DatabaseError(error.message); 
        }
    }
}