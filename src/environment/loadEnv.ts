import * as DEV from './environment';
import * as PROD from './environment.prod';

export const ENV = loadEnvironment();

function loadEnvironment() {
    return !!process.env.PROD || hasArgProd() ? PROD.env : DEV.env;
}

function hasArgProd() {
    return process.argv.indexOf('--prod') >= 0
}