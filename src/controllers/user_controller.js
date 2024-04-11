import userModel from "../models/user.js"
import { v4 as uuidv4 }  from 'uuid'
import bcrypt from "bcrypt"
const saltRounds = 10
import {createToken} from '../middlewares/auth.js';


const registerUser = async(req, res)=> {

    const { password, ...otherDataUser } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = {
        id: uuidv4(),
        password: hashedPassword,
        ...otherDataUser
    }
    try {
        const user = await userModel.registerUserModel(userData)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(user)
    }
}

const loginUser = async(req, res)=> {

    const {username, password}=req.body
    try {
        const user = await userModel.loginUserModel(username,password)
        const token = createToken(user)
        delete user.password
        res.status(200).json({user,token})
    } catch (error) {
        res.status(500).json(error)
    }
}

export{
    registerUser,
    loginUser
}
