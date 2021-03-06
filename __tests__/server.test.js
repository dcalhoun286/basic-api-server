'use strict';

const { server } = require ('../src/server.js');
const supertest = require('supertest');
const { it, expect } = require('@jest/globals');
const mockReq = supertest(server);

describe('====== SERVER ======', () => {
  it('returns a status 200 when visiting \'/\'', async () => {
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

  it('returns a status 404 when using a bad method', async () => {
    await mockReq.post('/')
      .then(result => {
        expect(result.status).toBe(404);
      });
  });

  it('returns a status 200 when visiting \'/clothes\' route', async () => {
    await mockReq.get('/clothes')
      .then(result => {
        expect(result.status).toBe(200);
        expect(Array.isArray(result.body)).toBeTruthy();
      });
  });

  it('can create a new record on \'/clothes\' route using POST', async () => {
    let response = await mockReq.post('/clothes').send({
      type: 'shirt',
      color: 'rainbow',
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBe(1);
    expect(response.body.record.type).toBe('shirt');
  });

  it('can read a single record on \'/clothes\' route using GET', async () => {
    let response1 = await mockReq.post('/clothes').send({
      type: 'shirt',
      color: 'rainbow',
    });

    let response2 = await mockReq.get(`/clothes/${response1.body.id}`);

    expect(response2.status).toBe(200);
  });

  it('can update a single record on \'/clothes\' route using PUT', async () => {
    let response1 = await mockReq.post('/clothes').send({
      type: 'shirt',
      color: 'rainbow',
    });

    let response2 = await mockReq.put(`/clothes/${response1.body.id}`).send({
      color: 'purple',
    });

    expect(response2.status).toBe(200);
    expect(response2.body.color).toBe('purple');
  });

  it('can destroy a record on \'/clothes\' route', async () => {
    let response1 = await mockReq.post('/clothes').send({
      type: 'shirt',
      color: 'rainbow',
    });

    let response2 = await mockReq.delete(`/clothes/${response1.body.id}`);
    expect(response2.status).toBe(204);
    expect(response2.body.id).toBe(undefined);
  });

  it('returns a status 200 when visiting \'/dogs\' route', async () => {
    await mockReq.get('/dogs')
      .then(result => {
        expect(result.status).toBe(200);
        expect(Array.isArray(result.body)).toBeTruthy();
      });
  });

  it('can create a new record on \'/dogs\' route using POST', async () => {
    let response = await mockReq.post('/dogs').send({
      breed: 'husky',
      color: 'white, black',
    });

    // console.log('huskyresponse', response.body);
    expect(response.status).toBe(201);
    expect(response.body.id).toBe(1);
    expect(response.body.record.breed).toBe('husky');
  });

  it('can read a single record on \'/dogs\' route using GET', async () => {
    let response1 = await mockReq.post('/dogs').send({
      breed: 'husky',
      color: 'white, black',
    });

    let response2 = await mockReq.get(`/dogs/${response1.body.id}`);

    expect(response2.status).toBe(200);
  });

  it('can update a single record on \'/dogs\' route using PUT', async () => {
    let response1 = await mockReq.post('/dogs').send({
      breed: 'husky',
      color: 'white, black',
    });

    let response2 = await mockReq.put(`/dogs/${response1.body.id}`).send({
      breed: 'dalmatian',
    });

    console.log('shouldsaydal', response2.body);
    expect(response2.status).toBe(200);
    expect(response2.body.breed).toBe('dalmatian');
  });

  it('can destroy a record on \'/dogs\' route', async () => {
    let response1 = await mockReq.post('/dogs').send({
      breed: 'husky',
      color: 'white, black',
    });

    let response2 = await mockReq.delete(`/dogs/${response1.body.id}`);
    expect(response2.status).toBe(204);
    expect(response2.body.id).toBe(undefined);
  });

  it('returns a status 500 when an internal server error occurs', async () => {
    await mockReq.get('/bad')
      .then(result => {
        expect(result.status).toBe(500);
      });
  });
});
