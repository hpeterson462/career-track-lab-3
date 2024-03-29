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

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM trees WHERE id = $1',
      [id]
    );
    if (!rows[0]) return null;
    else return new Tree(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM trees'
    );
    return rows.map(row => new Tree(row));
  }

  static async update(id, updatedTree) {
    const { rows } = await pool.query(
      `UPDATE trees
    SET name = $1,
        family = $2,
        elevation = $3
    WHERE id = $4
    RETURNING *
    `,
      [updatedTree.name, updatedTree.family, updatedTree.elevation, id]
    );
    return new Tree(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM trees WHERE id = $1 RETURNING *',
      [id]
    );
    return new Tree(rows[0]);
  }
}

module.exports = Tree;