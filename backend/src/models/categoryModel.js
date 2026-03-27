import mongoose from "mongoose";

const categoryModel = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  categoryType:{
    type: String,
    enum: ["Expense","Income"],
    required: true
  },
  icon:{
    type: String,
  },
  description:{
    type: String,
  },
  createdAt:{
    type: Date,
    default: Date.now 
  }
},{ timeStamps: true })

export const CategoryModel = mongoose.model("Category",categoryModel)