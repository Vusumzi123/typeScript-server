import * as express from 'express';

import * as mainController from './controllers/main.controller'

export class  Routes {
    
    constructor() { }

    // Configure API endpoints.
    public static getRouter(): express.Router {

        let router = express.Router();
        
        router.get('/', mainController.updateAssignment)
        
        /* 
        * Put your endpoints here
        */

        /* route to handle 404 not found endpoints keep this at the end*/
        router.get('*', function(req, res){
            res.status(404).json({error: "endpoint not found"});
        });

        return router;
    }
}