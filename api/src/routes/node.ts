// Imports 
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as redis from 'redis';
import * as mongodb from 'mongodb';

// Imports config
import { config } from './../config';

// Imports core services 
import { NodeService } from './../core/services/node';

let router = express.Router();

router.get('/list', (req: Request, res: Response, next: Function) => {
    let nodeService = new NodeService(redis, mongodb.MongoClient, config);

    nodeService.list(req.query.clusterName).then((result: any[]) => {
        res.json(result);
    }).catch((err: Error) => {
        res.status(500).send('Error');
    });
});

router.post('/create', (req: Request, res: Response, next: Function) => {
    let nodeService = new NodeService(redis, mongodb.MongoClient, config);
    nodeService.create(req.body.clusterName, req.body.ipAddress, req.body.port).then((result: any) => {
        res.json(result);
    }).catch((err: Error) => {
        res.status(500).send('Error');
    });
});

router.post('/delete', (req: Request, res: Response, next: Function) => {
    let nodeService = new NodeService(redis, mongodb.MongoClient, config);

    nodeService.delete(req.body.clusterName, req.body.ipAddress, req.body.port).then((result: any) => {
        res.json(result);
    }).catch((err: Error) => {
        res.status(500).send('Error');
    });
});


export = router;