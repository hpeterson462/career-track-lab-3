const pool = require("../utils/pool");

class Snake {
  id;
  name;
  habitat;
  diurnal;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.habitat = row.habitat;
    this.diurnal = row.diurnal;
  }

  static async insert(snake) {
    const { rows } = await pool.query(
      'INSERT INTO snakes (name, habitat, diurnal) VALUES ($1, $2, $3) RETURNING *',
      [snake.name, snake.habitat, snake.diurnal]
    );
    return new Snake(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM snakes WHERE id = $1',
      [id]
    );
    if (!rows[0]) return null;
    else return new Snake(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM snakes'
    );
    return rows.map(row => new Snake(row));
  }
}
module.exports = Snake;