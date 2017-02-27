// Imports
import * as redis from 'redis';
import * as mongodb from 'mongodb';

// Imports models
import {
    Node
} from './../models/node';

export class NodeService {

    private mongoUrl: string;

    constructor(private redisProvider: any, private mongoClient: mongodb.MongoClient, config: any) {
        this.mongoUrl = config.mongoUrl;
    }

    create(clusterName: string, ipAddress: string, port: number) {
        return new Promise((resolve: Function, reject: Function) => {
            this.mongoClient.connect(this.mongoUrl, (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                } else {
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
                }
            });
        });
    }


    delete(clusterName: string, ipAddress: string, port: number) {
        return new Promise((resolve: Function, reject: Function) => {
            this.mongoClient.connect(this.mongoUrl, (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                } else {
                    let collection = db.collection('nodes');

                    collection.findOne({
                        clusterName: clusterName,
                        ipAddress: ipAddress,
                        port: port
                    }, (err: Error, nodeResult: any) => {
                        if (nodeResult != null) {
                            collection.remove({
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
                }
            });
        });
    }


    list(clusterName: string) {
        return new Promise((resolve: Function, reject: Function) => {
            this.mongoClient.connect(this.mongoUrl, (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                } else {
                    let collection = db.collection('nodes');

                    collection.find({
                        clusterName: clusterName
                    }).toArray((err: Error, result: Node[]) => {
                        result = result.map(x => new Node(x.clusterName, x.ipAddress, x.port));
                        resolve(result);
                        db.close();
                    });
                }
            });
        });
    }

    status(ipAddress: string, port: number) {
        return new Promise((resolve: Function, reject: Function) => {
            let redisClient: redis.RedisClient = this.redisProvider.createClient({
                host: ipAddress,
                port: port
            });

            redisClient.on('error', (err: Error) => {
                resolve(false);
                redisClient.quit();
            });

            redisClient.ping((err: Error, result: any) => {
                if (err) {
                    resolve(false);
                } else if (result == "PONG") {
                    resolve(true);
                } else {
                    resolve(false);
                }

                redisClient.quit();
            });
        });
    }
}