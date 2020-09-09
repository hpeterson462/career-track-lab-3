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

  it('finds a tree by id', async () => {
    const westernJuniper = await Tree.insert({
      name: 'western juniper',
      family: 'cypress',
      elevation: 7000
    });
    const foundWesternJuniper = await Tree.findById(westernJuniper.id);

    expect(foundWesternJuniper).toEqual({
      id: westernJuniper.id,
      name: 'western juniper',
      family: 'cypress',
      elevation: 7000
    });
  });

  it('returns null if no tree is found', async () => {
    const tree = await Tree.findById(123);

    expect(tree).toEqual(null);
  });

  it('finds all trees', async () => {
    await Promise.all([
      Tree.insert({
        name: 'western juniper',
        family: 'cypress',
        elevation: 7000
      }),
      Tree.insert({
        name: 'giant sequoia',
        family: 'cypress',
        elevation: 4000
      }),
      Tree.insert({
        name: 'bristlecone pine',
        family: 'pine',
        elevation: 11000
      })
    ]);
    const trees = await Tree.find();

    expect(trees).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'western juniper', family: 'cypress', elevation: 7000 },
      { id: expect.any(String), name: 'giant sequoia', family: 'cypress', elevation: 4000 },
      { id: expect.any(String), name: 'bristlecone pine', family: 'pine', elevation: 11000 }
    ]));
  });

  it('updates a row by id', async () => {
    const createdTrees = await Tree.insert({
      name: 'western juniper',
      family: 'cypress',
      elevation: 7000
    });
    const updatedTree = await Tree.update(createdTrees.id, {
      name: 'western juniper',
      family: 'cypress',
      elevation: 7000
    });
    expect(updatedTree).toEqual({
      id: createdTrees.id,
      name: 'western juniper',
      family: 'cypress',
      elevation: 7000
    });
  });


});
