import jwt from "jsonwebtoken"
import "dotenv/config"
import { UserModel } from "../models/userModel.js"

export const authenticate = async (req,res,next) => {
  const token = req.cookies.authToken;

  if (!token){
    return res.status(401).json({
      message: "Token not provided",
    })
  }
  try{
    const secretCode = process.env.SECRET_CODE
    if (!secretCode) {
      return res.status(500).json({
        message: "Server misconfiguration"
      })
    }
    const verified = jwt.verify(token,secretCode)
    const userDetails = await UserModel.findOne({username: verified.username})
    if (!userDetails){
      return res.status(400).json({
        message: "user not found."
      })
    }
    req.user = {userId: userDetails._id.toString(), username: userDetails.username}
    next();
  } catch (err){
    res.status(401).json({
      message: "Invalid Token",
    })
  }
}