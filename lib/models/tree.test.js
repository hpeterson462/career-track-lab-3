const fs = require('fs');
const pool = require('../utils/pool');
const Tree = require('./tree.js');

describe('tree model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('inserts a new tree into the database', async () => {
    const createdTree = await Tree.insert({
      name: 'western juniper',
      family: 'cypress',
      elevation: 7000
    });
    const { rows } = await pool.query(
      'SELECT * FROM trees WHERE id = $1',
      [createdTree.id]
    );
    expect(rows[0]).toEqual(createdTree);
  });
});
