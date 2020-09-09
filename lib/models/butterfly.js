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

}

module.exports = Butterfly;