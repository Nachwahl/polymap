import {getSession} from "next-auth/client";

const connection = require('../../../../mysql').getConnection();



export default async (req, res) => {
    const {
        query: { id },
    } = req
    const session = await getSession({ req })

    if(req.body && req.body.email) {
        if(JSON.parse(process.env.ALLOW_EVERYTHING).includes(session.user.email)) {
            res.send(true);
            return;
        }
        connection.query("SELECT * FROM `userLinks` WHERE `discordMail`=?", [req.body.email], (error, user) => {
            if (!error) {
                if(!user[0] || !user[0].mcuuid) {
                    res.send(false);
                    return;
                }
                connection.query("SELECT * FROM `regions` WHERE `uid`=?",[id], function (error, region, fields) {
                    if (!error) {
                        res.send(user[0].mcuuid === region[0].useruuid)
                    } else {
                        res.send("error: " + error)
                    }
                })
            } else {
                res.send("error: " + error)
            }
        })
    }



}
