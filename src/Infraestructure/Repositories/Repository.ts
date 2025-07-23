import { PrismaClient } from '@prisma/client';

export class Repository {
    private static instance: Repository;
    private readonly client: PrismaClient;

    private constructor() {
        this.client = new PrismaClient();
    }

    static getInstance () {
        if (!Repository.instance) {
            Repository.instance = new Repository();
        }
        return Repository.instance;
    }

    database() { return this.client; }
}