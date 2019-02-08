import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import { Routes } from './routes';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public app: express.Application;

    private swaggerDocument = require('../swagger.json');

    //Run configuration methods on the Express instance.
    constructor() {
        this.app = express();
        this.middleware();
        new Routes(this.app);
    }

    // Configure Express middleware.
    private middleware(): void {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument));
    }

}

export default new App().app;