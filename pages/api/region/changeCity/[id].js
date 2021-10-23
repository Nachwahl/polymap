const connection = require('../../../../mysql').getConnection();
const index = require('../../../../algolia').getIndex();
import { getSession } from 'next-auth/client'

export default async (req, res) => {
    const {
        query: { id },
    } = req
    const session = await getSession({ req })

    if (req.method === 'POST') {
        if(JSON.parse(process.env.ALLOW_EVERYTHING).includes(session.user.email)) {
            console.log("helo")
            connection.query("UPDATE `regions` SET `city`=? WHERE `uid`=?", [req.body.city, id], (err) => {
                if (!err) {
                    index.partialUpdateObject({
                        city: req.body.city,
                        objectID: id
                    }).then(() => {
                        res.send("ok");
                    })

                } else {
                    res.send("error: " + err)
                }
            })
        }
    }

}
