const pool = require("../utils/pool");

class Tree {
  id;
  name;
  family;
  elevation;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.family = row.family;
    this.elevation = row.elevation;
  }

  static async insert(tree) {
    const { rows } = await pool.query(
      'INSERT INTO trees (name, family, elevation) VALUES ($1, $2, $3) RETURNING *',
      [tree.name, tree.family, tree.elevation]
    );
    return new Tree(rows[0]);
  }
}

module.exports = Tree;