// import mysql from "mysql2";
// import dotenv from "dotenv";

// dotenv.config();

// // // const pool = mysql
// // //    .createPool({
// // //     host: "localhost",
// // //     user: "root",
// // //     password: "pranjal123",
// // //     database: "Delivery_Data",
// // //   })
// // //   .promise();

// const pool = mysql
//   .createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//   })
//   .promise();

// async function getBasicData() {
//   const [rows] = await pool.query("SELECT * FROM BasicData");
//   return rows;
// }

// async function getBasicDataById(id) {
//   const [rows] = await pool.query("SELECT * FROM BasicData WHERE id=?", [id]);
//   return rows[0];
// }

// async function addRequest(Name, Origin, Destination) {
//   const [result] = await pool.query(
//     "INSERT INTO BasicData (Name, Origin, Destination) VALUES (?, ?, ?)",
//     [Name, Origin, Destination]
//   );
//   return {
//     id: result.insertId,
//     Name,
//     Origin,
//     Destination,
//   };
// }

// const result = await addRequest("test", "test", "test");
// console.log(result);

const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getBasicData() {
  const [rows] = await pool.query("SELECT * FROM BasicData");
  return rows;
}

async function getBasicDataById(id) {
  const [rows] = await pool.query("SELECT * FROM BasicData WHERE id=?", [id]);
  return rows[0];
}

async function addRequest(Name, Origin, Destination) {
  const [result] = await pool.query(
    "INSERT INTO BasicData (Name, Origin, Destination) VALUES (?, ?, ?)",
    [Name, Origin, Destination]
  );
  return {
    id: result.insertId,
    Name,
    Origin,
    Destination,
  };
}

const result = addRequest("Mumbai", "Chennai", "12/12/2021");
console.log(result);

async function main() {
  try {
    const result = await addRequest("?", "?", "?");
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    pool.end(); // Close the database connection when done
  }
}
// async function establishConnection() {
//   try {
//     await pool.query("SELECT 1"); // Execute a simple query to test the connection
//     console.log("Database connection established successfully!");
//   } catch (error) {
//     console.error("Error establishing database connection:", error);
//     process.exit(1); // Terminate the application if the connection fails
//   }
// }

// main();
