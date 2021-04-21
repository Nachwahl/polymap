import {getSession} from "next-auth/client";

const connection = require('../../../../mysql').getConnection();



export default async (req, res) => {
    const {
        query: { id },
    } = req
    const session = await getSession({ req })

    if (req.method === 'GET') {
        connection.query("SELECT * FROM `additionalBuilders` WHERE `regionuid`=?",[id], function (error, results, fields) {
            if (!error) {
                res.json(results);
            } else {
                res.send("error: " + error)
            }
        })
    } else if (req.method === 'PUT') {
        if(req.body && req.body.username) {
            if(JSON.parse(process.env.ALLOW_EVERYTHING).includes(session.user.email)) {
                connection.query("INSERT INTO `additionalBuilders` (`regionuid`, `username`) VALUES (?, ?);",[id, req.body.username], function (error, results, fields) {
                    if (!error) {
                        res.json(results);
                    } else {
                        res.send("error: " + error)
                    }
                })
                return;
            }
            connection.query("SELECT * FROM `userLinks` WHERE `discordMail`=?", [session.user.email], (error, user) => {
                if (!error) {
                    connection.query("SELECT * FROM `regions` WHERE `uid`=?",[id], function (error, region, fields) {
                        if (!error) {
                            if(user[0].mcuuid === region[0].useruuid) {

                                connection.query("INSERT INTO `additionalBuilders` (`regionuid`, `username`) VALUES (?, ?);",[id, req.body.username], function (error, results, fields) {
                                    if (!error) {
                                        res.json(results);
                                    } else {
                                        res.send("error: " + error)
                                    }
                                })

                            } else {
                                res.status(401).send("not authorized")
                            }
                        } else {
                            res.send("error: " + error)
                        }
                    })
                } else {
                    res.send("error: " + error)
                }
            })

        } else {
            res.status(400).send("no username in body");
        }

    } else if (req.method === 'DELETE') {
        if(JSON.parse(process.env.ALLOW_EVERYTHING).includes(session.user.email)) {
            connection.query("DELETE FROM `additionalBuilders` WHERE  `regionuid`=? AND `username`=? LIMIT 1;",[id, req.body.username], function (error, results, fields) {
                if (!error) {
                    res.json(results);
                } else {
                    res.send("error: " + error)
                }

            })
            return;
        }
        if(req.body && req.body.username) {
            connection.query("SELECT * FROM `userLinks` WHERE `discordMail`=?", [session.user.email], (error, user) => {
                if (!error) {
                    connection.query("SELECT * FROM `regions` WHERE `uid`=?",[id], function (error, region, fields) {
                        if (!error) {
                            if(user[0].mcuuid === region[0].useruuid) {

                                connection.query("DELETE FROM `additionalBuilders` WHERE  `regionuid`=? AND `username`=? LIMIT 1;",[id, req.body.username], function (error, results, fields) {
                                    if (!error) {
                                        res.json(results);
                                    } else {
                                        res.send("error: " + error)
                                    }
                                })

                            } else {
                                res.status(401).send("not authorized")
                            }
                        } else {
                            res.send("error: " + error)
                        }
                    })
                } else {
                    res.send("error: " + error)
                }
            })
        } else {
            res.status(400).send("no username in body");
        }

    }



}
