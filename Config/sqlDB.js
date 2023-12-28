const mysql = require('mysql2');

const connectionString = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


const MysqlConnect = async () => {
    return new Promise((resolve, reject) => {
        connectionString.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to MySQL:', err.message);
                reject(err);
            } else {
                console.log('Connected to MySQL');
                connection.release();
                resolve();
            }
        });
    });
};


module.exports = MysqlConnect;