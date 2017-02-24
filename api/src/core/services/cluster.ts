// Imports
import * as redis from 'redis';
import * as mongodb from 'mongodb';

// Imports models
import {
    Node
} from './../models/node';

export class ClusterService {

    private mongoUrl: string;

    constructor(private redisProvider: any, private mongoClient: mongodb.MongoClient, config: any) {
        this.mongoUrl = config.mongoUrl;
    }


    list() {
        return new Promise((resolve: Function, reject: Function) => {
            this.mongoClient.connect(this.mongoUrl, (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                } else {
                    let collection = db.collection('nodes');

                    collection.aggregate([
                        { $match: {} }
                        , {
                            $group:
                            {
                                _id: '$clusterName'
                            }
                        }
                    ]).toArray((err: Error, results: any[]) => {
                        resolve(results.filter(x => x._id != null).map(x => x._id));
                        db.close();
                    });
                }
            });
        });
    }


    details(clusterName: string) {
        return this.listNodes(clusterName).then((nodes: Node[]) => {
            let promisesList = nodes.map(x => this.getNodeDetails(x.ipAddress, x.port));

            return Promise.all(promisesList).then((values: any[]) => {
                values = values.filter(x => x.role == 'master');
                return {
                    used_memory: values.length == 0 ? 0 : Math.round(values.map(x => x.used_memory).reduce((a, b) => {
                        return a + b;
                    }) / 1000000),
                    expired_keys: values.length == 0 ? 0 : values.map(x => x.expired_keys).reduce((a, b) => {
                        return a + b;
                    }),
                    evicted_keys: values.length == 0 ? 0 : values.map(x => x.evicted_keys).reduce((a, b) => {
                        return a + b;
                    }),
                    connected_clients: values.length == 0 ? 0 : values.map(x => x.connected_clients).reduce((a, b) => {
                        return a + b;
                    })
                };
            });
        });
    }


    private listNodes(clusterName: string) {
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


    private getNodeDetails(ipAddress: string, port: number) {
        return new Promise((resolve: Function, reject: Function) => {
            let redisClient: redis.RedisClient = this.redisProvider.createClient({
                host: ipAddress,
                port: port
            });

            redisClient.on('error', function (err) {
                resolve({
                    used_memory: 0,
                    expired_keys: 0,
                    evicted_keys: 0,
                    connected_clients: 0,
                    role: null
                });
            });

            redisClient.info((err: Error, result: any) => {
                let arr = result.split(/\r?\n/).map(x => {
                    return {
                        key: x.split(':')[0],
                        value: x.split(':')[1]
                    };
                });

                resolve({
                    used_memory: parseFloat(arr.filter(z => z.key == 'used_memory')[0].value),
                    expired_keys: parseFloat(arr.filter(z => z.key == 'expired_keys')[0].value),
                    evicted_keys: parseFloat(arr.filter(z => z.key == 'evicted_keys')[0].value),
                    connected_clients: parseFloat(arr.filter(z => z.key == 'connected_clients')[0].value),
                    role: arr.filter(z => z.key == 'role')[0].value
                });
            });
        });
    }

}