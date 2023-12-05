import mysql from  'mysql2';

import dotenv from 'dotenv';
dotenv.config();


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();



export async function getNotes(){
    const [rows]  = await pool.query("SELECT * FROM notes");
    return rows;
}

export async function getNote(id){
    const [rows]  = await pool.query(`
        SELECT * 
        FROM notes 
        WHERE id = ?`
        , [id]);

    return rows[0];
} 

export async function createNote(title, contents){
   const [result] =  await pool.query(`
        INSERT INTO notes (title, contents)
        VALUES (?, ?)
    `, [title, contents]);

    const id = result.insertId;

    return getNote(id);
}

export async function deleteNote(id){
    const [result] = await pool.query(`
        DELETE FROM notes 
        WHERE id=?
    `, [id])

    return result;
}





