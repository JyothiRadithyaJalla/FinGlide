import { AccountModel } from "../models/accountModel.js"; 
import { TransactionModel } from "../models/transactionModel.js";
import mongoose from "mongoose";

export const createAccount = async(req,res) => {
  try{
    const {name ,accountType, accountNumber, balance, institution,icon} = req.body;
    const userId=req.user.userId
    const exsisting_account = await AccountModel.findOne({name,userId})

    if (exsisting_account){
        return res.status(400).json({
            message: "account name already exists. Try using another name.",
        })
    } else {
        const newAccount = await AccountModel.create({
          userId: req.user.userId,
          name, accountType, balance,institution,accountNumber, icon
        });

        const accounts = await AccountModel.find({ userId });
      

        res.status(201).json({
          message: "Account created successfully",
          accounts,
        })
    }
  } catch(err){
    res.status(500).json({
      message: "Error during creating the account",
      error: err.message,
    })
  }
}

export const getAccounts = async(req,res) => {
  try{
    const allAccounts = await AccountModel.find({userId: req.user.userId});

    res.status(200).json({
      accounts : allAccounts,
    });
  } catch(err){
    res.status(500).json({
      message: `Error during fetching the accounts ${err}`
    })
  }
}

export const updateAccount = async(req,res) => {
  try{
    const updatedAccount = await AccountModel.findOneAndUpdate({_id:req.params.id,userId:req.user.userId},req.body,{new:true});
    const userId=req.user.userId
    const accounts = await AccountModel.find({ userId });


    res.status(200).json({
      message: "Account updated successfully",
      accounts
    })
  } catch(err){
    res.status(500).json({
      message: "Error during updating the account",
      error: err.message,
    })
  }
}

export const deleteAccount = async(req,res) => {
  try{
    const deletedAccount = await AccountModel.findOneAndDelete({_id:req.params.id, userId:req.user.userId})
    const userId=req.user.userId
    if (!deletedAccount) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    const accounts = await AccountModel.find({ userId });

    res.status(200).json({
      message : "Account deleted successfully.",
      accounts, 
    })
  } catch(err){
    res.status(500).json({
      message: `Error during deleting the account.`,
      error: err.message,
    })
  }
}

// export const monthlySummary = async(req,res) => {
//   try{
//     const userId = new mongoose.Types.ObjectId(req.user.userId)
//     const year = parseInt(req.query.year)
//     // console.log(userId,year)
//     let accounts = await AccountModel.find({userId});
//     accounts = accounts.filter((each) => each.balance > 0).slice(0,3)
//     if(!accounts){
//       return res.status(400).json({
//         message: `No account fetched during the fetching the accounts summary. summary: ${accounts}`
//       })
//     }

//     const accountMap = {};
//     accounts.forEach(account => {
//       accountMap[account._id.toString()] = account.name;
//     })
//     console.log(accounts)

//     const transactions = await TransactionModel.aggregate([
//       {
//         $match :{
//           userId: userId,
//           date: {
//             $gte : new Date(`${year}-01-01`),
//             $lte : new Date(`${year}-12-31`)
//           }
//         }
//       },
//       {
//         $project: {
//           month: {$month : "$date"},
//           amount: 1,
//           transactionType: 1,
//           accountId: 1,
//           fromAccountId: 1,
//           toAccountId: 1,
//         }
//       }
//     ])

//     // console.log(transactions)

//     const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
//     const summary = months.map((eachmonth) => {      
//       let base = { month: eachmonth };
//       accounts.forEach(acc => {
//         base[acc.name] = 0;
//       });
//       return base;
//     })
//     const balances = {}
//     accounts.forEach(acc => {
//       balances[acc._id.toString()] = 0;
//     })

//     transactions.forEach(eachTransac => {
//       const monthIndex = eachTransac.month - 1;
//       if (eachTransac.transactionType === "Income" && eachTransac.accountId){
//         balances[eachTransac.accountId.toString()] += eachTransac.amount; 
//       } else if( eachTransac.transactionType === "Expense" && eachTransac.accountId) {
//         balances[eachTransac.accountId.toString()] -= eachTransac.amount;
//       } else if(eachTransac.transactionType === "Transfer" && eachTransac.fromAccountId && eachTransac.toAccountId) {
//         balances[eachTransac.fromAccountId.toString()] -= eachTransac.amount;
//         balances[eachTransac.toAccountId.toString()] += eachTransac.amount;
//       }

//       let namedBalances = {};
//       Object.keys(balances).forEach(id => {
//         const name = accountMap[id];
//         if (name) {
//           namedBalances[name] = balances[id];
//         }
//       })

//       summary[monthIndex] = {
//         ...summary[monthIndex],
//         ...namedBalances
//       };
//     })

//     res.status(201).json({
//       message: "Monthly accounts summary fetched successfully.",
//       summary: summary,
//     })
//   } catch(err){
//     res.status(500).json({
//       message: `Error during fetching the account summary ${err}.`
//     })
//   }
// }