import mongoose from "mongoose";

const budgetModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  period: {
    type: String,
    enum: ["monthly","yearly","weekly"],
    default: "monthly,"
  },
},{ timestamps: true })

export const BudgetModel = mongoose.model("Budget",budgetModel)