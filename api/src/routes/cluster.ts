// Imports 
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as redis from 'redis';
import * as mongodb from 'mongodb';

// Imports core services 
import { ClusterService } from './../core/services/cluster';

let router = express.Router();

router.get('/details', (req: Request, res: Response, next: Function) => {
    let clusterService = new ClusterService(redis, mongodb.MongoClient, {
        mongoUrl: 'mongodb://localhost:27017/redismanager'
    });

    clusterService.details(req.query.clusterName).then((result: any[]) => {
        res.json(result);
    }).catch((err: Error) => {
        res.status(500).send('Error');
    });
});


export = router;