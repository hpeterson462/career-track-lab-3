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

  it('finds a flower by id', async () => {
    const goldenPoppy = await Flower.insert({
      name: 'golden poppy',
      type: 'perennial',
      color: 'orange',
      petals: 4
    });
    const foundGoldenPoppy = await Flower.findById(goldenPoppy.id);

    expect(foundGoldenPoppy).toEqual({
      id: goldenPoppy.id,
      name: 'golden poppy',
      type: 'perennial',
      color: 'orange',
      petals: 4
    });
  });

  it('returns null if no flower is found', async () => {
    const flower = await Flower.findById(123);

    expect(flower).toEqual(null);
  });

  it('finds all flowers', async () => {
    await Promise.all([
      Flower.insert({
        name: 'golden poppy',
        type: 'perennial',
        color: 'orange',
        petals: 4
      }),
      Flower.insert({
        name: 'western blue flax',
        type: 'perennial',
        color: 'purple',
        petals: 5
      }),
      Flower.insert({
        name: 'bitterroot',
        type: 'perennial',
        color: 'pink',
        petals: 12
      })
    ]);
    const flower = await Flower.find();

    expect(flower).toEqual(expect.arrayContaining([
      {
        id: expect.any(String), name: 'golden poppy', type: 'perennial', color: 'orange',
        petals: 4
      },
      {
        id: expect.any(String), name: 'western blue flax', type: 'perennial', color: 'purple',
        petals: 5
      },
      {
        id: expect.any(String), name: 'bitterroot', type: 'perennial', color: 'pink',
        petals: 12
      }
    ]));
  });

  it('updates a row by id', async () => {
    const createdFlower = await Flower.insert({
      name: 'golden poppy',
      type: 'perennial',
      color: 'orange',
      petals: 4
    });
    const updatedFlower = await Flower.update(createdFlower.id, {
      name: 'golden poppy',
      type: 'perennial',
      color: 'orange',
      petals: 4
    });
    expect(updatedFlower).toEqual({
      id: createdFlower.id,
      name: 'golden poppy',
      type: 'perennial',
      color: 'orange',
      petals: 4
    });
  });

  it('deletes a row by id', async () => {
    const createdFlower = await Flower.insert({
      name: 'golden poppy',
      type: 'perennial',
      color: 'orange',
      petals: 4
    });
    const deletedFlower = await Flower.delete(createdFlower.id);

    expect(deletedFlower).toEqual({
      id: createdFlower.id,
      name: 'golden poppy',
      type: 'perennial',
      color: 'orange',
      petals: 4
    });
  });
});