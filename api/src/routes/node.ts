// Imports 
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as redis from 'redis';
import * as mongodb from 'mongodb';

// Imports core services 
import { NodeService } from './../core/services/node';

let router = express.Router();

router.get('/list', (req: Request, res: Response, next: Function) => {
    let nodeService = new NodeService(redis, mongodb.MongoClient, {
        mongoUrl: ''
    });

    nodeService.list(req.query.clusterName).then((result: any[]) => {
        res.json(result);
    }).catch((err: Error) => {
        res.status(500).send('Error');
    });
});


export = router;