import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
      },
      name : {
        type:String,
        required:true,
      },
      accountType:{
        type:String,
        enum: ["wallet", "bank", "card", "investment","crypto","loan","creditCard"], 
        required:true,
      },
      balance:{
        type:Number,
        default:0,
        required:true
      },
      accountNumber:{
        type: String,
        default: "N/A"
      },
      institution:{ 
        type: String ,
        default:"N/A",
      },
      icon:{
        type: String,
      },
      createdAt:{
        type:Date,
        default: Date.now(),
      }
},{ timeStamps: true })

export const  AccountModel = mongoose.model("Account",accountSchema)