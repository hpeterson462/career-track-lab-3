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
});