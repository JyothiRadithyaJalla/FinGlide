import { TransactionModel } from "../models/transactionModel.js";
import { CategoryModel } from "../models/categoryModel.js";
import mongoose from "mongoose";

export const createCategory = async(req,res) => {
  try{
    const {name, categoryType, icon, description} = req.body;
    const userId=req.user.userId

    const exsisting_category = await CategoryModel.findOne({name,userId:req.user.userId})

    if (exsisting_category){
        return res.status(400).json({
            message: "category name already exists. Try using another name.",
        })
    } else {
        const newCategory = await CategoryModel.create({
          userId: req.user.userId,
          name, categoryType, icon, description
        });

        const categories = await CategoryModel.find({ userId });

        res.status(201).json({
          message: "Category created successfully",
          categories,
        })
    }
  } catch(err){
    res.status(500).json({
      message: "Error during creating the category",
      error: err.message,
    })
  }
}

export const getCategories = async(req,res) => {
  try{
    const allCategories = await CategoryModel.find({userId: req.user.userId});

    res.status(200).json({
      Categories : allCategories,
    });
  } catch(err){
    res.status(500).json({
      message: `Error during fetching the categories ${err}`
    })
  }
}

export const updateCategory = async(req,res) => {
  try{
    const updatedCategory = await CategoryModel.findOneAndUpdate({_id:req.params.id,userId:req.user.userId},req.body,{new:true},{ runValidators: true });
    const userId=req.user.userId

    const categories = await CategoryModel.find({ userId });

    res.status(200).json({
      message: "Category updated successfully",
      categories, 
    })
  } catch(err){
    res.status(500).json({
      message: "Error during updating the category",
      error: err.message,
    })
  }
}

export const deleteCategory = async(req,res) => {
  try{
    const deletedCategory = await CategoryModel.findOneAndDelete({_id:req.params.id, userId:req.user.userId})
    const userId=req.user.userId
    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found to delete.",
      });
    }

    const categories = await CategoryModel.find({ userId });


    res.status(200).json({
      message : "Category deleted successfully.",
      categories
    })
  } catch(err){
    res.status(500).json({
      message: "Error during deleting the category",
      error: err.message,
    })
  }
}


export const getPieData = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const { month = new Date().getMonth() + 1, year = new Date().getFullYear()} = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const results = await TransactionModel.aggregate([
      {
        $match: {
          userId,
          transactionType: "Expense",
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: "$categoryId",
          total: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $project: {
          _id: 0,
          name: "$category.name",
          total: 1,
          color: "$category.color",
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.status(200).json({
      transactionData: results,
    });
  } catch (err) {
    console.error("Pie data error:", err);
    res.status(500).json({
      message: "Error during fetching the pie data",
    });
  }
};
