import { getLogger } from './Infraestructure/Services/Logger';
import { Repository } from './Infraestructure/Repositories/Repository';
import App from './App';

const PORT = process.env.PORT || 3000;
const DATABASE = Repository.getInstance().database();
const LOGGER = getLogger();

DATABASE.$connect()
    .then(() => {
        LOGGER.info('Conectado ao banco de dados com sucesso!');

        App.server.listen(PORT, () => {  
            LOGGER.info(`Servidor rodando com sucesso na porta ${PORT}!`);
        });
    })
    .catch((error: any) => {
        LOGGER.error(`Erro ao conectar ao banco de dados ${error}`)
    });