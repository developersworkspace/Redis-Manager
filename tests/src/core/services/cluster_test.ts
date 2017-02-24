// Imports
import 'mocha';
import { expect } from 'chai';

// Imports mocks
import * as mongodb from 'mongo-mock';
import * as redis from 'redis-mock';

//
import * as redisIntegration from 'redis';

// Imports services
import { ClusterService } from './../../../../api/src/core/services/cluster';
import { NodeService } from './../../../../api/src/core/services/node';

// Imports models
import { Node } from './../../../../api/src/core/models/node';

describe('ClusterService', () => {

    let clusterService: ClusterService = null;
    let nodeService: NodeService = null;

    let existingClusterName = 'Demo Cluster Name';
    let existingIpAddress = '127.0.0.1';
    let existingPort = 6379;

    beforeEach((done: Function) => {

        let config = {
            mongoUrl: 'mongodb://localhost:27017/myproject'
        };

        let mongoClient = mongodb.MongoClient;
        let redisClient = redis;

        clusterService = new ClusterService(redisClient, mongoClient, config);
        nodeService = new NodeService(redisClient, mongoClient, config);

        mongoClient.connect(config.mongoUrl, (err: Error, db: mongodb.Db) => {
            let nodeCollection = db.collection('nodes');
            nodeCollection.remove({}, (err: Error) => {
                nodeService.create(existingClusterName, existingIpAddress, existingPort).then((result: Boolean) => {
                    done();
                });
            });
        });
    });

    describe('details', () => {

        beforeEach(function () {
            let config = {
                mongoUrl: 'mongodb://localhost:27017/myproject'
            };

            let mongoClient = mongodb.MongoClient;
            let redisClient = redisIntegration;
            clusterService = new ClusterService(redisClient, mongoClient, config);
        });

        it('should return true given ip address and port of active node', () => {
            return clusterService.details(existingClusterName).then((result: any) => {
                expect(result).to.be.not.null;
            });
        });
    });

});