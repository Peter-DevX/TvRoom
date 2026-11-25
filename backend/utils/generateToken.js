import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

const JWT_SECRET = ENV_VARS.JWT_SECRET;

export const generateTokenAndSetCookie = (userId, res) => {
const token = jwt.sign({userId}, JWT_SECRET, {expiresIn: "7d"});

res.cookie("jwt-netflix", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //7days in millisecond
    httpOnly: true, //This prevents XSS attacks cross-site scripting attack
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: ENV_VARS.NODE_ENV!=="development",
});

return token;
}