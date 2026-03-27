import mongoose from "mongoose";
import { TransactionModel } from './transactionModel.js'
import { AccountModel } from "./accountModel.js";
import { CategoryModel } from "./categoryModel.js";
import {BudgetModel} from "./budgetModel.js"

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
    },
})

userSchema.pre("findOneAndDelete", async function(next) {
    try{
        const query = this.getQuery();
        const userId = query._id;
        console.log(userId)

        await Promise.all([
            TransactionModel.deleteMany({userId}),
            AccountModel.deleteMany({userId}),
            CategoryModel.deleteMany({userId}),
            BudgetModel.deleteMany({userId})
        ])
        
        console.log(`Deleted all the for user ${userId}`);
        next();
    }catch(err){
        next(err);
    }
})

export const UserModel = mongoose.model("User",userSchema,"users");