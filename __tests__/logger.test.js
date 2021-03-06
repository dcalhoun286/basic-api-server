'use strict';

// Documentation: https://stackoverflow.com/questions/60722281/testing-an-express-middleware-with-jest
const logger = require('../src/middleware/logger.js');

const mockReq = () => {
  const req = {
    path: '/',
    method: 'GET',
  };
  return req;
};

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const supertest = require('supertest');
const { server } = require('../src/server.js');
const { it } = require('@jest/globals');

// mock console logs will have undefined values without this declaration
const request = supertest(server);

// Documentation: https://jestjs.io/docs/en/jest-object
describe('====== Logger Middlware test ======', () => {
  it('logger works', () => {
  
    const spy = jest.spyOn(console, 'log');
    logger(mockReq, mockRes, jest.fn());

    // spy won't be called until the logger function is called
    expect(spy).toHaveBeenCalled();
  });
});
