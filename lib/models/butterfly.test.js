const fs = require('fs');
const pool = require('../utils/pool');
const Butterfly = require('./butterfly.js');

describe('butterfly model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('inserts a new butterfly into the database', async () => {
    const createdButterfly = await Butterfly.insert({
      name: 'anise swallowtail',
      food: 'fennel',
      color: 'yellow'
    });
    const { rows } = await pool.query(
      'SELECT * FROM butterflies WHERE id = $1',
      [createdButterfly.id]
    );
    expect(rows[0]).toEqual(createdButterfly);
  });

  it('finds a butterfly by id', async () => {
    const aniseSwallowtail = await Butterfly.insert({
      name: 'anise swallowtail',
      food: 'fennel',
      color: 'yellow'
    });
    const foundAniseSwallowtail = await Butterfly.findById(aniseSwallowtail.id);

    expect(foundAniseSwallowtail).toEqual({
      id: aniseSwallowtail.id,
      name: 'anise swallowtail',
      food: 'fennel',
      color: 'yellow'
    });
  });

  it('returns null if no butterfly is found', async () => {
    const butterfly = await Butterfly.findById(123);

    expect(butterfly).toEqual(null);
  });

  it('finds all butterflies', async () => {
    await Promise.all([
      Butterfly.insert({
        name: 'anise swallowtail',
        food: 'fennel',
        color: 'yellow'
      }),
      Butterfly.insert({
        name: 'sleepy orange',
        food: 'senna',
        color: 'orange'
      }),
      Butterfly.insert({
        name: 'acmon blue',
        food: 'clover',
        color: 'blue'
      })
    ]);
    const butterflies = await Butterfly.find();

    expect(butterflies).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'anise swallowtail', food: 'fennel', color: 'yellow' },
      { id: expect.any(String), name: 'sleepy orange', food: 'senna', color: 'orange' },
      { id: expect.any(String), name: 'acmon blue', food: 'clover', color: 'blue' }
    ]));
  });

  it('updates a row by id', async () => {
    const createdButterfly = await Butterfly.insert({
      name: 'anise swallowtail',
      food: 'fennel',
      color: 'yellow'
    });
    const updatedButterfly = await Butterfly.update(createdButterfly.id, {
      name: 'anise swallowtail',
      food: 'fennel',
      color: 'yellow'
    });
    expect(updatedButterfly).toEqual({
      id: createdButterfly.id,
      name: 'anise swallowtail',
      food: 'fennel',
      color: 'yellow'
    });
  });
});