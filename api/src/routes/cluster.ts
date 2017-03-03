// Imports 
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as redis from 'redis';
import * as mongodb from 'mongodb';

// Imports config
import { config } from './../config';

// Imports core services 
import { ClusterService } from './../services/cluster';

let router = express.Router();

router.get('/details', (req: Request, res: Response, next: Function) => {
    let clusterService = new ClusterService(redis, mongodb.MongoClient, config);

    clusterService.details(req.query.clusterName).then((result: any) => {
        res.json(result);
    }).catch((err: Error) => {
        res.status(500).send(err.message);
    });
});


router.get('/list', (req: Request, res: Response, next: Function) => {
    let clusterService = new ClusterService(redis, mongodb.MongoClient, config);

    clusterService.list().then((result: any[]) => {
        res.json(result);
    }).catch((err: Error) => {
        res.status(500).send(err.message);
    });
});


router.post('/clear', (req: Request, res: Response, next: Function) => {
    let clusterService = new ClusterService(redis, mongodb.MongoClient, config);

    clusterService.clear(req.body.clusterName, req.body.pattern).then((result: any) => {
        res.json(result);
    }).catch((err: Error) => {
        res.status(500).send(err.message);
    });
});



export = router;