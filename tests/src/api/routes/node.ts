// Imports
import 'mocha';
import { expect } from 'chai';
import request = require('supertest');
import express = require("express");

// Imports app
import { WebApi } from './../../../../api/src/app';


let webApi = new WebApi(express(), 3000);

describe('POST /api/node/create', () => {
  it('responds with true given non-existing ip address and port', () => {
    return request(webApi.getApp())
      .post('/api/node/create', {
          clusterName: 'Demo',
          ipAddress: '127.0.0.1',
          port: 1234
      })
      .expect(200)
      .then(response => {
        expect(response.body).to.be.true
      });
  });
});
