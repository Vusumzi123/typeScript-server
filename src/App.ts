import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as appRoot from 'app-root-path';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import * as cors from 'cors';
import {ENV} from './environment/loadEnv';

import * as winston from './util/logger';
import { LOGGER } from './util/logger';
import { Routes } from './Router';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;
    // swagger configuration
    private swaggerDocument = require(path.join(appRoot.path, '/swagger.json'));
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(morgan("combined", {stream: winston.stream}));
        this.express.use(cors());
        this.express.use(bodyParser.urlencoded( {limit: '50mb', extended: true} ));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(ENV.api.endpointSufix, (Routes.getRouter()));
        this.express.use(ENV.api.swaggerSufix, swaggerUi.serve, swaggerUi.setup(this.swaggerDocument));
    }
}

export default new App().express;