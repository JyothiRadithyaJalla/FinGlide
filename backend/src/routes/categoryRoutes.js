import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { createCategory,getCategories,updateCategory,deleteCategory,getPieData } from "../controllers/categoryControllers.js";

const categoryRouter = Router()

categoryRouter.post('/createCategory',authenticate,createCategory)

categoryRouter.get('/getCategories',authenticate,getCategories)

categoryRouter.get('/getPieData',authenticate,getPieData)

categoryRouter.put('/update/:id',authenticate,updateCategory)

categoryRouter.delete('/delete/:id',authenticate,deleteCategory)

export default categoryRouter