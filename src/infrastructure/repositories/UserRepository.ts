import { User } from '@/domain/entities/User';
import { CreateUserDTO } from "@/domain/dtos/UserDTO";
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
        } catch (error) {
            const err = error as Error;
            this.LOGGER.error(`Erro ao criar um novo usuário no banco de dados ${err.message}`);
            throw new DatabaseError(err.message);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const users = await this.users.findMany();
            return users;
        } catch (error) {
            const err = error as Error;
            this.LOGGER.error(`Erro ao listar todos os usuários do banco de dados ${err.message}`);
            throw new DatabaseError(err.message);
        }
    }

    async findByEmail(email: string): Promise<User| null>  {
        try {
            const user = await this.users.findUnique({ where: { email } });
            if (!user) return null;
            return user;
        } catch (error) {
            const err = error as Error;
            this.LOGGER.error(`Usuário nao foi encontrado por email ${err.message}`);
            throw new DatabaseError(err.message); 
        }
    }
}