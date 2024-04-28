const db = require('../config/db');

class Todo {
  // Create
  static async create(title) {
    const [result] = await db.execute('INSERT INTO todos (title) VALUES (?)', [title]);
    return result.insertId;
  }

  // Get All
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM todos');
    return rows;
  }

  // Get By Id
  static async getById(id) {
    const [rows] = await db.execute('SELECT * FROM todos WHERE id = ?', [id]);
    return rows[0];
  }

  // Update
  static async update(id, data) {
    const [result] = await db.execute('UPDATE todos SET title = ?, completed = ? WHERE id = ?', [data.title, data.completed, id]);
    return result.affectedRows;
  }

  // Delete
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM todos WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Todo;