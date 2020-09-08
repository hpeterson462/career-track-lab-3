const pool = require("../utils/pool");

class Bird {
  id;
  name;
  type;
  flies;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.flies = row.flies;
  }

  static async insert(bird) {
    const { rows } = await pool.query(
      'INSERT INTO birds (name, type, flies) VALUES ($1, $2, $3) RETURNING *',
      [bird.name, bird.type, bird.flies]
    );
    return new Bird(rows[0]);
  }


}

module.exports = Bird;