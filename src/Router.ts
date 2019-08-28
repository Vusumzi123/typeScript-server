import * as express from 'express';

import * as mainController from './controllers/main.controller'

export class  Routes {
    private router;
    constructor(router: express.Router){
        this.router = router;
        //this.initRoutes();
    }

    // Configure API endpoints.
    public initRoutes(): express.Router {
        
        this.router.get('/', mainController.updateAssignment)
        
        /* 
        * Put your endoints here
        */

        /* route to handle 404 not found endpoints keep this at the end*/
        this.router.get('*', function(req, res){
            res.status(404).json({error: "endpoint not found"});
        });

        return this.router;
    }
}