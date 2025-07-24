import express, { Application, Router } from 'express';
import { Server as HttpServer } from 'http';
import cors from 'cors';
import { readdirSync } from 'fs';
import { join, extname } from 'path';
import { getLogger } from '@/infrastructure/utils/Logger';
import { errorHandler } from '@/presentation/middlewares/errorHandler';

const LOGGER = getLogger();

class App {
    express: Application;
    server: HttpServer;     

    constructor () {
        this.express = express();
        this.server = new HttpServer(this.express);
        this.setupMiddlewares();
        this.setupRoutes().then(() => {
            LOGGER.info('Rotas carregadas com sucesso');
            this.express.use(errorHandler); 
        });
    }

    private setupMiddlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(express.urlencoded({ extended: true }));
    }

    private async setupRoutes (): Promise<void> {
        const apiRouter = Router();
        const routesPath = join(__dirname, 'presentation/routes');

        const routeFiles = readdirSync(routesPath).filter(file =>
            ['.ts', '.js'].includes(extname(file)) && !file.endsWith('.map')
        );

        for (const file of routeFiles) {
            const modulePath = join(routesPath, file);
            const routeModule = await import(modulePath);

            if (typeof routeModule.default === 'function') {
                routeModule.default(apiRouter);
                LOGGER.info(`Rota carregada: ${file}`);
            } else {
                LOGGER.warn(`Rota ignorada (sem export default): ${file}`);
            }
        }

        this.express.use('/api', apiRouter);
    }
}

export default new App();