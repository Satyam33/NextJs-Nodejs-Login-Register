import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { all } from '../../../middlewares/index';
import { insertUser } from '../../../controllers/index';

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
    const {email,password, firstname, lastname } = req.body;

    if ( !email || !firstname || !lastname || !password) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(mailformat)){
        return res.status(422).json({ error: "Email is not valid" })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const add_user = await insertUser(req.db, {
        firstname,
        lastname,
        email,
        password: hashedPassword,

    })

    if (add_user) {
        res.status(200).json({ message: "Register  Successfully..!" })
    }
    else {
        res.status(404).json({ message: "Something went Wrong..!" })
    }

});

export default handler;