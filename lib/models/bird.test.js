const fs = require('fs');
const pool = require('../utils/pool');
const Bird = require('./bird.js');
const { isRegExp } = require('util');

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
    const { rows } = await pool.query(
      'SELECT * FROM birds WHERE id = $1',
      [createdBird.id]
    );
    expect(rows[0]).toEqual(createdBird);
  });

  it('finds a bird by id', async () => {
    const redTailedHawk = await Bird.insert({
      name: 'red-tailed hawk',
      type: 'hawk',
      flies: true
    });
    const foundRedTailedHawk = await Bird.findById(redTailedHawk.id);

    expect(foundRedTailedHawk).toEqual({
      id: redTailedHawk.id,
      name: 'red-tailed hawk',
      type: 'hawk',
      flies: true
    });
  });

  it('returns null if no bird is found', async () => {
    const bird = await Bird.findById(123);

    expect(bird).toEqual(null);
  });

  it('finds all birds', async () => {
    await Promise.all([
      Bird.insert({
        name: 'red-tailed hawk',
        type: 'hawk',
        flies: true
      }),
      Bird.insert({
        name: 'golden eagle',
        type: 'eagle',
        flies: true
      }),
      Bird.insert({
        name: 'common raven',
        type: 'corvus',
        flies: true
      })
    ]);
    const birds = await Bird.find();

    expect(birds).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'red-tailed hawk', type: 'hawk', flies: true },
      { id: expect.any(String), name: 'golden eagle', type: 'eagle', flies: true },
      { id: expect.any(String), name: 'common raven', type: 'corvus', flies: true }
    ]));

  });

  it('updates a row by id', async () => {
    const createdBird = await Bird.insert({
      name: 'red-tailed hawk',
      type: 'hawk',
      flies: true
    });
    const updatedBird = await Bird.update(createdBird.id, {
      name: 'red-tailed hawk',
      type: 'hawk',
      flies: true
    });
    expect(updatedBird).toEqual({
      id: createdBird.id,
      name: 'red-tailed hawk',
      type: 'hawk',
      flies: true
    });
  });


});