import { createTransaction,getTransactions,updateTransaction,deleteTransaction,yearlySummary,expVsincYearly } from "../controllers/transactionControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { Router } from "express";

const trasactionRouter = Router()

trasactionRouter.post('/createTransaction',authenticate,createTransaction)

trasactionRouter.get('/getTransactions',authenticate,getTransactions)

trasactionRouter.get('/yearlySummary',authenticate,yearlySummary)

trasactionRouter.get('/expVsincYearly',authenticate,expVsincYearly)

trasactionRouter.put('/update/:id',authenticate,updateTransaction)

trasactionRouter.delete('/delete/:id',authenticate,deleteTransaction)

export default trasactionRouter