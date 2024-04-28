// import modules
const { createPool } = require('mysql');
const dotenv = require('dotenv');

// configure dotenv
dotenv.config();

// create pool
const pool = createPool({
    // create the mysql variables in .env
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT,
    connectionLimit: 100,
    ssl: false
});

// create the connection to the database
pool.getConnection((error, connection) => {
    if (error) {
        console.error(error);

        // check for error code
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection lost...');
        } else if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections...');
        } else if (error.code === 'ERONNREFUSED') {
            console.error('Database connection was refused...');
        }
    } else {
        console.log('Connected to database!');
    }

    // release connection
    if (connection) {
        connection.release();
    }

    return;
});

module.exports = pool;