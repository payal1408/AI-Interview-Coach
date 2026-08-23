import userModel from '../models/user.model.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import tokenBlackListModel from '../models/blacklist.model.js'

/**RegisterUserController
 * @name registerUserController
 *@route POST /api/auth/register
 *@description Register a new user
* @access Public */

async function registerUserController(req, res) {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide the username,email,password"
        })
    }
    const isUserAlreadyExixts = await userModel.findOne({
        $or: [{ username }, { email }]
    })
    if (isUserAlreadyExixts) {
        return res.status(400).json({
            message: "Account alredy exists with this email address or username"
        })
    }
    // creating a new user by using a hash
    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        email,
        password: hash
    })
    // creating token of the user
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )
    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**LoginUserController
 * @name loginUserController
 *@description login a user, expect email and password int the request body
* @access Public */

async function loginUserController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: "Invalid email and password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )
    res.cookie("token", token)

    res.status(201).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name logoutUserController
 * @description  clear token from user cookie and add the token in the blacklist
 * @access public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token;

    if (token) {
        await tokenBlackListModel.create({ token });
    }

    res.clearCookie("token");

    return res.status(200).json({
        message: "User logged out successfully"
    });
}

/**
 * @name getMeController
 * @description  clear token from user cookie and add the token in the blacklist
 * @access public
 */
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        message: "user details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

export default {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}