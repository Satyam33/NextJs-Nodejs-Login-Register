import nc from 'next-connect';

import { all } from '../../../middlewares/index';
import { findUserBylogin, findUser } from '../../../controllers/index';


const handler = nc();

handler.use(all);


handler.post(async (req, res) => {


    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    const getUser = await findUser(req.db, { email })

    if (getUser) {

        const user = await findUserBylogin(req.db, { email, password })

        if (user) {
            const { _id, email, firstname,lastname } = user
            res.status(201).json({
                status: true,
                user: { _id, email, firstname,lastname },
                token: user.token,
               
            })

        }
        else {
            res.json({
                status: false,
                error: "email or password dont match"
            })
        }
    }
    else {
        res.json({
            status: false,
            error: "User Not Registerd"
        })
    }
});

export default handler;





