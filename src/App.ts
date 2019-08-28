import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as appRoot from 'app-root-path';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import * as cors from 'cors';

import * as winston from './util/logger';
import { LOGGER } from './util/logger';
import { Routes } from './Router';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;
    // swagger configuration
    private swaggerDocument = require(path.join(appRoot.path, '/swagger.json'));
    private router;
    private ENV = require(path.join(appRoot.path, '/environment.json'));
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.router = express.Router();
        this.middleware();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(morgan("combined", {stream: winston.stream}));
        this.express.use(cors());
        this.express.use(bodyParser( {limit: '50mb'} ));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(this.ENV.api.endpointSufix, (new Routes(this.router).initRoutes() ));
        this.express.use(this.ENV.api.swaggerSufix, swaggerUi.serve, swaggerUi.setup(this.swaggerDocument));
    }
}

export default new App().express;