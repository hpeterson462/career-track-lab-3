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
});
