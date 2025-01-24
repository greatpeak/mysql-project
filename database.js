import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "127.0.01",
    user: "root",
    password: "",
    database: "notes_app",
  })
  .promise();

export async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM notes");
  return rows;
}

export async function getNote(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM notes
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}

export async function createNote(title, contents) {
  const [result] = await pool.query(
    `
  INSERT INTO notes (title, contents)
  VALUES (?, ?)
  `,
    [title, contents]
  );
  const id = result.insertId;
  return getNote(id);
}