const pool = require("../utils/pool");

class Butterfly {
  id;
  name;
  food;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.food = row.food;
    this.color = row.color;
  }

  static async insert(butterfly) {
    const { rows } = await pool.query(
      'INSERT INTO butterflies (name, food, color) VALUES ($1, $2, $3) RETURNING *',
      [butterfly.name, butterfly.food, butterfly.color]
    );
    return new Butterfly(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM butterflies WHERE id = $1',
      [id]
    );
    if (!rows[0]) return null;
    else return new Butterfly(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM butterflies'
    );
    return rows.map(row => new Butterfly(row));
  }

  static async update(id, updatedButterfly) {
    const { rows } = await pool.query(
      `UPDATE butterflies
    SET name = $1,
        food = $2,
        color = $3
    WHERE id = $4
    RETURNING *
    `,
      [updatedButterfly.name, updatedButterfly.food, updatedButterfly.color, id]
    );
    return new Butterfly(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM butterflies WHERE id = $1 RETURNING *',
      [id]
    );
    return new Butterfly(rows[0]);
  }
}

module.exports = Butterfly;