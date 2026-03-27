import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { createAccount,getAccounts,updateAccount,deleteAccount } from "../controllers/accountControllers.js";

const accountRouter = Router()

accountRouter.post('/createAccount',authenticate,createAccount)

accountRouter.get('/getAccounts',authenticate,getAccounts)

// accountRouter.get('/monthlySummary',authenticate,monthlySummary)

accountRouter.put('/update/:id',authenticate,updateAccount)

accountRouter.delete('/delete/:id',authenticate,deleteAccount)

export default accountRouter