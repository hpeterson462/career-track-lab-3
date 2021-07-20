const fs = require('fs');
const pool = require('../utils/pool');
const Snake = require('./snake.js');

describe('snake model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('inserts a new snake into the database', async () => {
    const createdSnake = await Snake.insert({
      name: 'western rattlesnake',
      habitat: 'rocky areas',
      diurnal: true
    });
    const { rows } = await pool.query(
      'SELECT * FROM snakes WHERE id = $1',
      [createdSnake.id]
    );
    expect(rows[0]).toEqual(createdSnake);
  });

  it('finds a snake by id', async () => {
    const westernRattlesnake = await Snake.insert({
      name: 'western rattlesnake',
      habitat: 'rocky areas',
      diurnal: true
    });
    const foundWesternRattlesnake = await Snake.findById(westernRattlesnake.id);

    expect(foundWesternRattlesnake).toEqual({
      id: westernRattlesnake.id,
      name: 'western rattlesnake',
      habitat: 'rocky areas',
      diurnal: true
    });
  });

  it('returns null if no snake is found', async () => {
    const snake = await Snake.findById(123);

    expect(snake).toEqual(null);
  });

  it('finds all snakes', async () => {
    await Promise.all([
      Snake.insert({
        name: 'western rattlesnake',
        habitat: 'rocky areas',
        diurnal: true
      }),
      Snake.insert({
        name: 'common kingsnake',
        habitat: 'grasslands',
        diurnal: true
      }),
      Snake.insert({
        name: 'ringneck snake',
        habitat: 'forests',
        diurnal: false
      })
    ]);
    const snakes = await Snake.find();

    expect(snakes).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'western rattlesnake', habitat: 'rocky areas', diurnal: true },
      { id: expect.any(String), name: 'common kingsnake', habitat: 'grasslands', diurnal: true },
      { id: expect.any(String), name: 'ringneck snake', habitat: 'forests', diurnal: false }
    ]));
  });

  it('updates a row by id', async () => {
    const createdSnake = await Snake.insert({
      name: 'western rattlesnake',
      habitat: 'rocky areas',
      diurnal: true
    });
    const updatedSnake = await Snake.update(createdSnake.id, {
      name: 'western rattlesnake',
      habitat: 'rocky areas',
      diurnal: true
    });
    expect(updatedSnake).toEqual({
      id: createdSnake.id,
      name: 'western rattlesnake',
      habitat: 'rocky areas',
      diurnal: true
    });
  });

  it('deletes a row by id', async () => {
    const createdSnake = await Snake.insert({
      name: 'western rattlesnake',
      habitat: 'rocky areas',
      diurnal: true
    });
    const deletedSnake = await Snake.delete(createdSnake.id);

    expect(deletedSnake).toEqual({
      id: createdSnake.id,
      name: 'western rattlesnake',
      habitat: 'rocky areas',
      diurnal: true
    });
  });
});