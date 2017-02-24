// Imports
import express = require("express");
import bodyParser = require("body-parser");
import * as mongodb from 'mongodb';


// Imports routes
import * as nodeRoute from './routes/node';
import * as clusterRoute from './routes/cluster';

// Imports middleware
// NONE


export class WebApi {

    constructor(private app: express.Express, private port: number) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
        this.init();
    }

    private init() {
       
        
    }

    private configureMiddleware(app: express.Express) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));      
    }

    private configureRoutes(app: express.Express) {
        app.use("/api/node", nodeRoute);
         app.use("/api/cluster", clusterRoute);
    }

    public run() {
        this.app.listen(this.port);
    }

    public getApp() {
        return this.app;
    }
}


let port = 3000;
let api = new WebApi(express(), port);
api.run();
console.info(`Listening on ${port}`);