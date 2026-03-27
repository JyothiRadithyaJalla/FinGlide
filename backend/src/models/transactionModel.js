import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  transactionType: {
    type: String,
    enum: ["Income","Expense","Transfer"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  fromAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  toAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  },
  amount: {
    type: Number,
    required: true,
  },
  notes: {
    type: String
  }
},{ timeStamps: true })

export const TransactionModel = mongoose.model("Transaction",transactionSchema)