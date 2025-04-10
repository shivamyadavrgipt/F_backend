// const mysql = require('mysql2');
// require('dotenv').config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool.promise();


// import mysql from 'mysql2/promise';


// const connectionString = process.env.TIDB_CONNECTION_STRING;

// export default async function connectTiDB() {
//     try {
//         const pool = mysql.createPool({
//             uri: connectionString,
//             waitForConnections: true,
//             connectionLimit: 10,
//             queueLimit: 0
//         });

//         console.log("Connected to TiDB successfully!");
//         // Close the pool (optional, only use in scripts)
//       //   await pool.end();
//     } catch (err) {
//         console.error("Connection error:", err);
//     }
// }

// connectTiDB();

// db.js
require('dotenv').config(); // <-- Make sure this is at the top

const mysql = require('mysql2');

const pool = mysql.createPool({
  uri: process.env.TIDB_CONNECTION_STRING, // ✅ pull from .env
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  ssl: {}
});

const db = pool.promise();

module.exports = db;





