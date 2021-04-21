const connection = require('../../mysql').getConnection();


export default (req, res) => {
    connection.query("SELECT username, SUM(area) as NUM FROM `regions` GROUP BY username ORDER BY NUM DESC LIMIT 10", function (error, results, fields) {
        if (!error) {
            if(results.length === 0) {
                res.status(404).send("error: " + error)
                return;
            }
            res.json(results);
        } else {
            res.send("error: " + error)
        }

    })

}
