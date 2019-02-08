import { Router } from "express";
import * as express from 'express';

//import * as swaggerDocument  from "../swagger.json";

/**
 * @class Routes
 * @description
 * class used to define endpoints and its link with controllers
 */
export class Routes{
    private router:Router;
    private app: express.Application;
    constructor(app: express.Application){
        this.app = app;
        this.router = express.Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        
        this.app.get('/api/v1');

        this.router.get('*', function(req, res){
            res.status(404).json({error: "endpoint not found"});
        });

        this.app.use(['/','/api/v1'], this.router);
    }
}