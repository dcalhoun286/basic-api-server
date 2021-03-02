'use strict';

const { server } = require ('../src/server.js');
const supertest = require('supertest');
const { it, expect } = require('@jest/globals');
const mockReq = supertest(server);

describe('====== SERVER ======', () => {
  it('/ works', async () => {
    await mockReq.get('/')
      .then(result => {
        expect(result.status).toBe(200);
      });
  });

  it('returns a status 404 when the requested path doesn\'t exist', async () => {
    await mockReq.get('/doesnt-exist')
      .then(result => {
        expect(result.status).toBe(404);
      });
  });

  it('/clothes works', async () => {
    await mockReq.get('/clothes')
      .then(result => {
        expect(result.status).toBe(200);
      });
  });

  it('/dogs works', async () => {
    await mockReq.get('/dogs')
      .then(result => {
        expect(result.status).toBe(200);
      });
  });

  it('returns a status 500 when an internal server error occurs', async () => {
    await mockReq.get('/bad')
      .then(result => {
        expect(result.status).toBe(500);
      });
  });
});
