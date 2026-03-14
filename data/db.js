const mysql = require("mysql2");

const db_connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_blogs",
    port: "3307"
})

db_connection.connect(error => {
    if (error) throw error;
    console.log("Connessione a MySQL avvenuta con successo")
})

module.exports = db_connection