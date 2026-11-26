/* 
1.get token from cookies
    if there is no token show error
2.verify token by decoding with the secret key
    if token is not valid, load invalid token
*/

import jwt from "jsonwebtoken";

import {ENV_VARS} from "../config/envVars.js";
import {User} from "../models/user.model.js"



export const protectRoute = async (req, res, next) => {
    const token = req.cookies["jwt-netflix"]
    const JWT_SECRET = ENV_VARS.JWT_SECRET

        try {
            if(!token){
        return res.status(401).json({success: false, message: "Unauthorized - No token provided"})
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if(!decoded){
        return res.status(401).json({success: false, message: "Unauthorized - Invalid token"})
    }

    const user = await User.findById(decoded.userId).select("-password");

    if(!user){
        return res.status(401).json({success: false, message: "User not found"})
    }

    req.user = user;

    next()
        } catch (error) {
            console.log("Error in protectRoute", error.message);
            res.status(500).json({success: false, message: "Internal error found"}) 
        }
    

}