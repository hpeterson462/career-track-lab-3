const fs = require('fs');
const pool = require('../utils/pool');
const Flower = require('./flower.js');

describe('flower model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('inserts a new flower into the database', async () => {
    const createdFlower = await Flower.insert({
      name: 'golden poppy',
      type: 'perennial',
      color: 'orange',
      petals: 4
    });
    const { rows } = await pool.query(
      'SELECT * FROM flowers WHERE id = $1',
      [createdFlower.id]
    );
    expect(rows[0]).toEqual(createdFlower);
  });

});