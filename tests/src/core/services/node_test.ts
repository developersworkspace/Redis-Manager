// Imports
import 'mocha';
import { expect } from 'chai';

// Imports mocks
import * as mongodb from 'mongo-mock';
import * as redis from 'redis-mock';

// Imports services
import { NodeService } from './../../../../api/src/core/services/node';


describe('NodeService', () => {

    let nodeService: NodeService = null;

    let clusterName = 'Demo Cluster Name';
    let existingIpAddress = '127.0.0.1';
    let existingPort = '6379';

    let nonExistingIpAddress = '127.0.0.2';
    let nonExistingPort = '7001';

    beforeEach((done: Function) => {
        let mongoClient = mongodb.MongoClient;
        let redisClient = redis.createClient();

        nodeService = new NodeService(redisClient, mongoClient, null);

        nodeService.createNode(clusterName, existingIpAddress, existingPort).then((result: Boolean) => {
            done();
        });
    });

    describe('createNode', () => {
        it('should return true given ip address, port and cluster name where ip address and port does not exist', () => {
            return nodeService.createNode(clusterName, nonExistingIpAddress, nonExistingPort).then((result: Boolean) => {
                expect(result).to.be.true;
            });
        });

        it('should return false given ip address, port and cluster name where ip address and port does exist', () => {
            return nodeService.createNode(clusterName, existingIpAddress, existingPort).then((result: Boolean) => {
                expect(result).to.be.false;
            });
        });
    });

});