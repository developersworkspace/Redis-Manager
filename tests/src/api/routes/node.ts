// Imports
import 'mocha';
import { expect } from 'chai';
import request = require('supertest');
import express = require("express");

// Imports app
import { WebApi } from './../../../../api/src/app';


//let webApi = new WebApi(express(), 3000);

// describe('ROUTES', () => {
//   beforeEach(() => {
//     let p1 = request(webApi.getApp())
//       .post('/api/node/delete')
//       .type('json')
//       .send(JSON.stringify({
//         clusterName: 'Non-Existing-Cluster',
//         ipAddress: '0.0.0.0',
//         port: 6379
//       }))
//       .then(response => {
//       });

//     let p2 = request(webApi.getApp())
//       .post('/api/node/create')
//       .type('json')
//       .send(JSON.stringify({
//         clusterName: 'Existing-Cluster',
//         ipAddress: '127.0.0.1',
//         port: 6379
//       }))
//       .then(response => {
//       });

//     return Promise.resolve()
//       .then(function () {
//         return p1;
//       })
//       .then(function () {
//         return p2;
//       })
//       .then(function () {
//       });
//   });

//   describe('POST /api/node/create', () => {
//     it('responds with true given non-existing ip address and port', () => {
//       return request(webApi.getApp())
//         .post('/api/node/create')
//         .type('json')
//         .send(JSON.stringify({
//           clusterName: 'Non-Existing-Cluster',
//           ipAddress: '0.0.0.0',
//           port: 6379
//         }))
//         .expect(200)
//         .then(response => {
//           expect(response.body).to.be.true;
//         });
//     });

//     it('responds with false given existing ip address and port', () => {
//       return request(webApi.getApp())
//         .post('/api/node/create')
//         .type('json')
//         .send(JSON.stringify({
//           clusterName: 'Existing-Cluster',
//           ipAddress: '127.0.0.1',
//           port: 6379
//         }))
//         .expect(200)
//         .then(response => {
//           expect(response.body).to.be.false;
//         });
//     });
//   });


//   describe('POST /api/node/list', () => {
//     it('responds with list of node given cluster name', () => {
//       return request(webApi.getApp())
//         .get('/api/node/list?clusterName=Existing-Cluster')
//         .expect(200)
//         .then(response => {
//           expect(response.body).to.be.not.null;
//           expect(response.body.length).to.be.eq(1);
//         });
//     });
//   });
// });
