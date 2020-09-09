const pool = require("../utils/pool");

class Flower {
  id;
  name;
  type;
  color;
  petals;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.color = row.color;
    this.petals = row.petals;
  }

  static async insert(flower) {
    const { rows } = await pool.query(
      'INSERT INTO flowers (name, type, color, petals) VALUES ($1, $2, $3, $4) RETURNING *',
      [flower.name, flower.type, flower.color, flower.petals]
    );
    return new Flower(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM flowers WHERE id = $1',
      [id]
    );
    if (!rows[0]) return null;
    else return new Flower(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM flowers'
    );
    return rows.map(row => new Flower(row));
  }

  static async update(id, updatedFlower) {
    const { rows } = await pool.query(
      `UPDATE flowers
    SET name = $1,
        type = $2,
        color = $3,
        petals = $4
    WHERE id = $5
    RETURNING *
    `,
      [updatedFlower.name, updatedFlower.type, updatedFlower.color, updatedFlower.petals, id]
    );
    return new Flower(rows[0]);
  }
}

module.exports = Flower;