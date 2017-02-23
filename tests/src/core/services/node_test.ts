// Imports
import 'mocha';
import { expect } from 'chai';

// Imports mocks
import * as mongodb from 'mongo-mock';
import * as redis from 'redis-mock';

// Imports services
import { NodeService } from './../../../../api/src/core/services/node';

// Imports models
import { Node } from './../../../../api/src/core/models/node';

describe('NodeService', () => {

    let nodeService: NodeService = null;

    let existingClusterName = 'Demo Cluster Name';
    let existingIpAddress = '127.0.0.1';
    let existingPort = 6379;

    let nonExistingClusterName = 'Non Existing Demo Cluster Name';
    let nonExistingIpAddress = '127.0.0.2';
    let nonExistingPort = 7001;

    beforeEach((done: Function) => {

        let config = {
            mongoUrl: 'mongodb://localhost:27017/myproject'
        };

        let mongoClient = mongodb.MongoClient;
        let redisClient = redis.createClient();

        nodeService = new NodeService(redisClient, mongoClient, config);

        mongoClient.connect(config.mongoUrl, (err: Error, db: mongodb.Db) => {
            let nodeCollection = db.collection('nodes');
            nodeCollection.remove({}, (err: Error) => {
                nodeService.createNode(existingClusterName, existingIpAddress, existingPort).then((result: Boolean) => {
                    done();
                });
            });
        });
    });

    describe('createNode', () => {
        it('should return true given ip address, port and cluster name where ip address and port does not exist', () => {
            return nodeService.createNode(existingClusterName, nonExistingIpAddress, nonExistingPort).then((result: Boolean) => {
                expect(result).to.be.true;
            });
        });

        it('should return false given ip address, port and cluster name where ip address and port does exist', () => {
            return nodeService.createNode(existingClusterName, existingIpAddress, existingPort).then((result: Boolean) => {
                expect(result).to.be.false;
            });
        });
    });

    describe('findByClusterName', () => {
        it('should return list of nodes given existing cluster name', () => {
            return nodeService.findByClusterName(existingClusterName).then((result: Node[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(1);
            });
        });

        it('should return list of nodes given non-existing cluster name', () => {
            return nodeService.findByClusterName(nonExistingClusterName).then((result: Node[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(0);
            });
        });
    });

});