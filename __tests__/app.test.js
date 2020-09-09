const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Bird = require('../lib/models/bird');

describe('bird routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  });

  it('create a new bird via POST', async () => {
    const response = await request(app)
      .post('/api/v1/birds')
      .send({
        name: 'red-tailed hawk',
        type: 'hawk',
        flies: true
      });
  });

  it('deletes a bird by id via DELETE', async () => {
    const createdBird = await Bird.insert({
      name: 'red-tailed hawk',
      type: 'hawk',
      flies: true
    });
    const response = await request(app)
      .delete(`/api/v1/birds/${createdBird.id}`);

    expect(response.body).toEqual({
      id: createdBird.id,
      name: 'red-tailed hawk',
      type: 'hawk',
      flies: true
    });
  });

  it('updates a bird by id via PUT', async () => {
    const createdBird = await Bird.insert({
      name: 'red-tailed hawk',
      type: 'hawk',
      flies: true
    });
    const response = await request(app)
      .put(`/api/v1/birds/${createdBird.id}`)
      .send({
        name: 'bald eagle',
        type: 'eagle',
        flies: true
      });

    expect(response.body).toEqual({
      id: createdBird.id,
      name: 'bald eagle',
      type: 'eagle',
      flies: true
    });
  });

  it('get a bird via GET', async () => {
    const createdBird = await Bird.insert({
      name: 'red-tailed hawk',
      type: 'hawk',
      flies: true
    });
    const response = await request(app)
      .get(`/api/v1/birds/${createdBird.id}`);

    expect(response.body).toEqual({
      id: createdBird.id,
      name: 'red-tailed hawk',
      type: 'hawk',
      flies: true
    });
  });

  it('get a bird via GET', async () => {
    const createdBird = await Bird.insert({
      name: 'red-tailed hawk',
      type: 'hawk',
      flies: true
    });
    const response = await request(app)
      .get('/api/v1/birds');

    expect(response.body).toEqual([{
      id: createdBird.id,
      name: 'red-tailed hawk',
      type: 'hawk',
      flies: true
    }]);
  });
});
