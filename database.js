import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "MySecurePassword123!",
    database: "notes_app",
  })
  .promise();

export async function getNotes() {
  try {
    const [rows] = await pool.query("SELECT * FROM notes");
    return rows;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error; 
  }
}

export async function getNote(id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT * 
      FROM notes
      WHERE id = ?
      `,
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error(`Error fetching note with ID ${id}:`, error);
    throw error;
  }
}

export async function createNote(title, contents) {
  try {
    const [result] = await pool.query(
      `
      INSERT INTO notes (title, contents)
      VALUES (?, ?)
      `,
      [title, contents]
    );
    const id = result.insertId;
    return getNote(id);
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
}
