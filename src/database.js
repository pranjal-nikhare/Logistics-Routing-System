const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

function insertData(
  Name,
  Origin,
  Origin_coordinates,
  Destination,
  Destination_coordinates
) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO BasicData (Name, Origin, Origin_coordinates, Destination, Destination_coordinates) VALUES (?, ?, ST_GeomFromText(?), ?, ST_GeomFromText(?))";
    const values = [
      Name,
      Origin,
      `POINT(${Origin_coordinates[0]} ${Origin_coordinates[1]})`,
      Destination,
      `POINT(${Destination_coordinates[0]} ${Destination_coordinates[1]})`,
    ];

    pool.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function getDataById(id) {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM BasicData WHERE id=?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function getLastID() {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM BasicData ORDER BY id DESC LIMIT 1",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getCoordinates() {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT ST_AsText(Origin_coordinates) AS origin_wkt, ST_AsText(Destination_coordinates) AS destination_wkt FROM BasicData;",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

module.exports = { insertData, getDataById, getLastID, getCoordinates };
