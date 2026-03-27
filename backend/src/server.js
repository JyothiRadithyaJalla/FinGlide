import express from "express"
import cors from "cors"
import authRouter from "./routes/authRoutes.js";
import accountRouter from "./routes/accountRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import trasactionRouter from "./routes/transactionRoutes.js";
import budgetRouter from "./routes/budgetRoutes.js";
import apiOnly from "./middleware/apiOnly.js";
import cookieParser from "cookie-parser"

import "dotenv/config"

import { connectDB } from "./config/db.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "https://fin-glide.vercel.app"], 
  credentials: true,               
}));
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000
const URL = process.env.MONGO_URI

if (!URL){
    console.error("MONGO_URI is not defined in the .env file.")
    process.exit(1)
}


async function main(){
    try{
        await connectDB(URL);
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`)
        })
    } catch (err){
        console.error("Error Connecting to the DataBase.",err)
        process.exit(1);
    }
}

main()

app.use("/api", apiOnly)

app.use('/api/auth/', authRouter)

app.use('/api/account/',accountRouter)

app.use('/api/category/',categoryRouter)

app.use('/api/transaction/',trasactionRouter)

app.use('/api/budget/',budgetRouter)