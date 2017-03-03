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

//   describe('GET /api/cluster/list', () => {
//     it('responds with list of cluster names', () => {
//       return request(webApi.getApp())
//         .get('/api/cluster/list')
//         .expect(200)
//         .then(response => {
//           expect(response.body).to.be.not.null;
//           expect(response.body.length).to.be.eq(1);
//         });
//     });
//   });

//   describe('GET /api/cluster/details', () => {
//     it('responds with cluster details', () => {
//       return request(webApi.getApp())
//         .get('/api/cluster/details?clusterName=Existing-Cluster')
//         .expect(200)
//         .then(response => {
//           expect(response.body).to.be.not.null;
//         });
//     });
//   });
// });
