import * as http from 'http';
import * as debug from 'debug';

import App from './App';
import { LOGGER, retriveLevelFromArgs } from './util/logger';
import { ENV } from './environment/loadEnv';


class Main {
    private static port: number|string|boolean;
    private static server: http.Server;
    static init() {
        LOGGER.info('ts-express:server');
        this.port = this.normalizePort(this.retrivePortFromArgs() || process.env.PORT || ENV.port);
        App.set('port', this.port);
        this.server = http.createServer(App);
        this.server.listen(this.port);
        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening);
    }

    private static retrivePortFromArgs(){
        let arg = process.argv.find(e => e.includes('--port'));
        if( arg ) {
            let bind = arg.split(':')[1]
            LOGGER.info( 'port changed through terminal arguments:: ' + arg);
            return bind;
        }
    }

    private static normalizePort(val: number|string): number|string|boolean {
        let bind: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(bind)) return val;
        else if (bind >= 0) return bind;
        else return false;
    }

    private static onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') throw error;
        let bind = (typeof Main.port === 'string') ? `Pipe ${Main.port}` : `Port ${Main.port}`;
        switch(error.code) {
            case 'EACCES':
                LOGGER.error(`${bind} requires elevated privileges`)
                debug(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                LOGGER.error(`${bind} is already in use`);
                debug(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private static onListening(): void {
        let addr = Main.server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        LOGGER.info(`Listening on ${bind}`);
        LOGGER.info( (ENV as any).prod ? 'server is running in PROD mode' : 'server is running in DEV mode' );
        LOGGER.info( 'Application is logging at ' + LOGGER.level + ' level' )
        LOGGER.debug( 'app init' )
    }
}

Main.init();