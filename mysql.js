const mysql = require("mysql");
let connection;
const init = () => {
    return new Promise((resolve, reject) => {
        connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
        connection.connect((err) => {
            if(err) {
                reject(err);
            }
            resolve(connection)
        })
    })

}

const getConnection = () => {
    if(!connection)
        init().then(() => {
            return connection;
        })
    return connection
}

module.exports = {
    getConnection,
    init
}
