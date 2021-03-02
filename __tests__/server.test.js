'use strict';

const { server } = require ('../src/server.js');
const supertest = require('supertest');
const mockReq = supertest(server);

describe('====== SERVER ======', () => {
  it('/ works', async () => {
    await mockReq.get('/')
      .then(result => {
        expect(result.status).toBe(200);
      });
  });

  it('response status should be 404 when the requested path doesn\'t exist', async () => {
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
});
