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

    create(clusterName: string, ipAddress: string, port: number): Promise<Boolean> {
        return this.doesNodeExist(clusterName, ipAddress, port).then((result: Boolean) => {
            if (result == true) {
                return false;
            } else {
                return this.insertNode(clusterName, ipAddress, port);
            }
        });
    }


    delete(clusterName: string, ipAddress: string, port: number): Promise<Boolean> {

        return this.doesNodeExist(clusterName, ipAddress, port).then((result: Boolean) => {
            if (result == true) {
                return this.removeNode(clusterName, ipAddress, port);
            } else {
                return false;
            }
        });
    }


    list(clusterName: string): Promise<Node[]> {
        return this.mongoClient.connect(this.mongoUrl).then((db: mongodb.Db) => {
            let collection = db.collection('nodes');

            return collection.find({
                clusterName: clusterName
            }).toArray();
        }).then((result: Node[]) => {
            return result.map(x => new Node(x.clusterName, x.ipAddress, x.port));
        });
    }

    status(ipAddress: string, port: number): Promise<Boolean> {
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


    private removeNode(clusterName: string, ipAddress: string, port: number): Promise<Boolean> {
        return this.mongoClient.connect(this.mongoUrl).then((db: mongodb.Db) => {
            let collection = db.collection('nodes');

            return collection.remove({
                clusterName: clusterName,
                ipAddress: ipAddress,
                port: port
            });
        }).then((result: any) => {
            return true;
        });
    }

    private insertNode(clusterName: string, ipAddress: string, port: number): Promise<Boolean> {
        return this.mongoClient.connect(this.mongoUrl).then((db: mongodb.Db) => {
            let collection = db.collection('nodes');

            return collection.insertOne({
                clusterName: clusterName,
                ipAddress: ipAddress,
                port: port
            });
        }).then((result: any) => {
            return true;
        });
    }

    private doesNodeExist(clusterName: string, ipAddress: string, port: number): Promise<Boolean> {
        return this.mongoClient.connect(this.mongoUrl).then((db: mongodb.Db) => {
            let collection = db.collection('nodes');

            return collection.findOne({
                clusterName: clusterName,
                ipAddress: ipAddress,
                port: port
            });
        }).then((nodeResult: any) => {
            if (nodeResult == null) {
                return false;
            } else {
                return true;
            }
        });
    }
}