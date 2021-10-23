import {getSession} from "next-auth/client";

const connection = require('../../../../../mysql').getConnection();



export default async (req, res) => {
    const {
        query: { id },
    } = req
    const session = await getSession({ req })

    if(req.body && req.body.email) {
        if(JSON.parse(process.env.ALLOW_EVERYTHING).includes(session.user.email)) {
            res.send(true);
            return;
        } else {res.send(false); return;}
    }



}
