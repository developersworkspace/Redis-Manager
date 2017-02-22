// Imports
import * as redis from 'redis';
import * as mongodb from 'mongodb';

// Imports models
import { Node } from './../models/node';

export class NodeService {

    private mongoUrl: string;

    constructor(private redisClient: redis.RedisClient, private mongoClient: mongodb.MongoClient, config: any) {
        this.mongoUrl = 'mongodb://localhost:27017/myproject';
    }

    createNode(clusterName: string, ipAddress: string, port: number) {
        return new Promise((resolve: Function, reject: Function) => {
            this.mongoClient.connect(this.mongoUrl, (err: Error, db: mongodb.Db) => {

                let collection = db.collection('nodes');

                collection.findOne({
                    clusterName: clusterName,
                    ipAddress: ipAddress,
                    port: port
                }, (err: Error, nodeResult: any) => {
                    if (nodeResult == null) {
                        collection.insertOne({
                            clusterName: clusterName,
                            ipAddress: ipAddress,
                            port: port
                        }, (err: Error, insertResult: mongodb.InsertOneWriteOpResult) => {
                            db.close();
                            resolve(true);
                        });
                    } else {
                        db.close();
                        resolve(false);
                    }
                });
            });
        });
    }


    findByClusterName(clusterName: string) {
        return new Promise((resolve: Function, reject: Function) => {
            this.mongoClient.connect(this.mongoUrl, (err: Error, db: mongodb.Db) => {

                let collection = db.collection('nodes');

                collection.find({
                    clusterName: clusterName
                }).toArray((err: Error, result: Node[]) => {
                    result = result.map(x => new Node(x.clusterName, x.ipAddress, x.port));
                    resolve(result);
                    db.close();
                });
            });
        });
    }

}