import { TransactionModel } from "../models/transactionModel.js";
import {AccountModel} from '../models/accountModel.js'

export const createTransaction = async(req,res) => {
  try{
    const {transactionType, description,categoryId,accountId,fromAccountId,toAccountId,amount,notes} = req.body
    const userId = req.user.userId;
    const newTransaction = await TransactionModel.create({
      userId :userId,
      transactionType,description ,categoryId,accountId,fromAccountId,toAccountId,amount,notes
    })


    if(transactionType === "Income"){
      await AccountModel.findOneAndUpdate({_id:accountId,userId:req.user.userId},{$inc:{ balance : amount }})
    } else if(transactionType === "Expense"){
      await AccountModel.findOneAndUpdate({_id:accountId,userId:req.user.userId},{$inc: { balance : -amount}})
    } else if(transactionType === "Transfer"){
      await AccountModel.findOneAndUpdate({_id:fromAccountId,userId:req.user.userId},{$inc: {balance: -amount}})
      await AccountModel.findOneAndUpdate({_id:toAccountId,userId:req.user.userId},{$inc:{balance:amount}})
    }

    const transactions = await TransactionModel.find({ userId }).populate("accountId fromAccountId toAccountId categoryId").sort({date: -1})
    const accounts = await AccountModel.find({ userId })

    res.status(201).json({
      message: "Transaction created successfully",
      transactions, 
      accounts,     
    })
  } catch(err){
    res.status(500).json({
      message: "Error during creating the transaction",
      error: err.message,
    })
  }
}

export const getTransactions = async(req,res) => {
  try{
    const allTransactions = await TransactionModel.find({userId:req.user.userId}).populate("accountId fromAccountId toAccountId categoryId").sort({date: -1})

    res.status(201).json({
      message: "All Transactions fetched",
      transactions: allTransactions,
    })
  }catch(err){
    res.status(500).json({
      message: `Error during fetching the transactions ${err}`
    })
  }
}

export const updateTransaction = async(req,res) => {
  try{
    const {id} = req.params;

    const oldTran = await TransactionModel.findOne({_id:id, userId: req.user.userId})

    if(!oldTran){
      return res.status(404).json({
        message: `Transaction not found.`
      })
    }

    if(oldTran.transactionType === "Income"){
      await AccountModel.findOneAndUpdate({_id: oldTran.accountId , userId:req.user.userId},{$inc : {balance: -oldTran.amount}})
    } else if(oldTran.transactionType === "Expense"){
      await AccountModel.findOneAndUpdate({_id: oldTran.accountId, userId: req.user.userId}, {$inc: {balance: oldTran.amount}})
    } else if(oldTran.transactionType === "Transfer"){
      await AccountModel.findOneAndUpdate({_id: oldTran.fromAccountId, userId: req.user.userId}, {$inc: {balance: oldTran.amount}})
      await AccountModel.findOneAndUpdate({_id: oldTran.toAccountId , userId:req.user.userId},{$inc : {balance: -oldTran.amount}})
    }

    const updateTrans = await TransactionModel.findOneAndUpdate({_id: id, userId: req.user.userId},req.body,{new:true})
    if(updateTrans.transactionType === "Income"){
      await AccountModel.findOneAndUpdate({_id: updateTrans.accountId , userId:req.user.userId},{$inc : {balance: updateTrans.amount}})
    } else if(updateTrans.transactionType === "Expense"){
      await AccountModel.findOneAndUpdate({_id: updateTrans.accountId, userId: req.user.userId}, {$inc: {balance: -updateTrans.amount}})
    } else if(updateTrans.transactionType === "Transfer"){
      await AccountModel.findOneAndUpdate({_id: updateTrans.fromAccountId, userId: req.user.userId}, {$inc: {balance: -updateTrans.amount}})
      await AccountModel.findOneAndUpdate({_id: updateTrans.toAccountId , userId:req.user.userId},{$inc : {balance: updateTrans.amount}})
    } 

    res.status(200).json({
      message: "transaction updated",
      updatedTransaction: updateTrans,
    })
  } catch(err){
    res.status(500).json({
      message: `Error during updating the transaction ${err}.`
    })
  }
}

export const deleteTransaction = async(req,res) => {
  try{
    const {id} = req.params;

    const userId = req.user.userId;

    const oldTran = await TransactionModel.findOneAndDelete({_id:id, userId: userId})

    if(!oldTran){
      return res.status(404).json({
        message: `Transaction not found.`
      })
    }

    if(oldTran.transactionType === "Income"){
      await AccountModel.findOneAndUpdate({_id: oldTran.accountId , userId:req.user.userId},{$inc : {balance: -oldTran.amount}})
    } else if(oldTran.transactionType === "Expense"){
      await AccountModel.findOneAndUpdate({_id: oldTran.accountId, userId: req.user.userId}, {$inc: {balance: oldTran.amount}})
    } else if(oldTran.transactionType === "Transfer"){
      await AccountModel.findOneAndUpdate({_id: oldTran.fromAccountId, userId: req.user.userId}, {$inc: {balance: oldTran.amount}})
      await AccountModel.findOneAndUpdate({_id: oldTran.toAccountId , userId:req.user.userId},{$inc : {balance: -oldTran.amount}})
    }

    const transactions = await TransactionModel.find({ userId }).populate("accountId fromAccountId toAccountId categoryId").sort({date: -1})

    const accounts = await AccountModel.find({ userId });


    res.status(200).json({
      message: `Transaction deleted successfully.`,
      transactions,
      accounts,
    })
  } catch(err){
    res.status(500).json({
      message: "Error during deleting the transaction",
      error: err.message,
    })
  }
}

export const yearlySummary = async(req,res) => {
  try{
    const userId = req.user.userId;
    const fullYear = new Date().getFullYear()

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const summary = months.map(month => ({
      month: month,
      income: 0,
      expense: 0,
      savings: 0
    }))

    const transactions = await TransactionModel.find({userId:userId,
      date:{
        $gte : new Date(`${fullYear}-01-01`),
        $lte : new Date(`${fullYear}-12-31`)
      }
    })

    transactions.forEach((eachTransac) => {
      const monthIndex = eachTransac.date.getMonth();
      if (eachTransac.transactionType  === "Income"){
        summary[monthIndex].income += eachTransac.amount
      } else if (eachTransac.transactionType === "Expense"){
        summary[monthIndex].expense += eachTransac.amount
      }
    })

    summary.forEach((eachMonth) => {
      eachMonth.savings = eachMonth.income - eachMonth.expense;
    })

    res.status(200).json({
      message: `Summary fetched Successfully.`,
      summary : summary
    })

  } catch(err){
    res.status(500).json({
      message: `Error during fetching the summary ${err}`
    })
  }
}

export const expVsincYearly = async(req,res) => {
  try{
    const userId = req.user.userId;
    const fullYear = new Date().getFullYear()

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const summary = months.map(month => ({
      month: month,
      income: 0,
      expense: 0,
    }))

    const transactions = await TransactionModel.find({userId:userId,
      date:{
        $gte : new Date(`${fullYear}-01-01`),
        $lte : new Date(`${fullYear}-12-31`)
      }
    })

    transactions.forEach((eachTransac) => {
      const monthIndex = eachTransac.date.getMonth();
      if (eachTransac.transactionType  === "Income"){
        summary[monthIndex].income += eachTransac.amount
      } else if (eachTransac.transactionType === "Expense"){
        summary[monthIndex].expense += eachTransac.amount
      }
    })

    res.status(200).json({
      message: `Summary fetched Successfully.`,
      summary : summary
    })

  } catch(err){
    res.status(500).json({
      message: `Error during fetching the summary ${err}`
    })
  }
}