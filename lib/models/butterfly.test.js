const fs = require('fs');
const pool = require('../utils/pool');
const Butterfly = require('./butterfly.js');

describe('butterfly model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('inserts a new butterfly into the database', async () => {
    const createdButterfly = await Butterfly.insert({
      name: 'swallowtail',
      food: 'fennel',
      color: 'yellow'
    });
    const { rows } = await pool.query(
      'SELECT * FROM butterflies WHERE id = $1',
      [createdButterfly.id]
    );
    expect(rows[0]).toEqual(createdButterfly);
  });
});