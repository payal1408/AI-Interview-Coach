import jwt from 'jsonwebtoken'
import tokenBlackListModel from '../models/blacklist.model.js';


async function authUser(req, res, next) {
<<<<<<< HEAD
    const token = req.cookies[process.env.COOKIE_NAME || "token"]
=======
    const token = req.cookies.token
>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1

    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    const isTokenBlacklist = await tokenBlackListModel.findOne({ token })

    if (isTokenBlacklist) {
        return res.status(401).json({
            message: "Token is BlakListed/token is invalid"
        })
    }

    // used to verify the token and To extract data from a token we use jwt.verify()
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (err) {
        console.log(err);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
}
<<<<<<< HEAD
export default { authUser }
=======
export default { authUser }
>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1
