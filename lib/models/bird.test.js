const fs = require('fs');
const pool = require('../utils/pool');
const Bird = require('./bird.js');

describe('bird model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('inserts a new bird into the database', async () => {
    const createdBird = await Bird.insert({
      name: 'red-tailed hawk',
      type: 'hawk',
      flies: true
    });
    const selectedBird = await pool.query(
      'SELECT * FROM birds WHERE id = $1',
      [createdBird.id]
    );
  });
});