const mysql = require("mysql");
let connection;
const init = () => {
    return new Promise((resolve, reject) => {
        connection = mysql.createConnection(JSON.parse(process.env.DB_CON));
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
