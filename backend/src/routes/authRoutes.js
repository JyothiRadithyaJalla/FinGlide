import { Router } from "express";
import { register } from "../controllers/authControllers.js";
import { login,logout,check,deleteUser } from "../controllers/authControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const authRouter = Router()

authRouter.post("/login/",login)

authRouter.post("/register/",register)

authRouter.post("/logout",authenticate,logout)

authRouter.get('/check',authenticate,check)

authRouter.delete('/deleteuser',authenticate,deleteUser)

export default authRouter