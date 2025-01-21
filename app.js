import express from 'express';
const app= express()
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression'; 
import morgan from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {flags: "a"})

app.use(helmet())
app.use(compression())
app.use(morgan("combined", {stream: accessLogStream}))
app.use(express.json())
app.use(express.urlencoded({ extended: false })); 

// Derive __dirname in ES module scope

import cors from 'cors';

import sequelize from './utils/Database.js';

import userRoute from './routes/userRoutes.js';
import awsroute from './routes/AwsRoutes.js';
import premiumroute from './routes/PremiumRoutes.js';
import incomeroute from './routes/IncomeRoutes.js';
import expenseroute from './routes/ExpenseRoutes.js';
import passwordroute from './routes/PasswordRoutes.js';
import deleteRoute from "./routes/DeleteExpense.js"


app.use(cors())

app.use("/users", userRoute)
app.use("/expenses", expenseroute)
app.use("/password", passwordroute)
app.use(premiumroute)
app.use(incomeroute)
app.use(awsroute)
app.use(deleteRoute)

sequelize.sync().then(result=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Server is running on port 3000")
    })
    console.log("database connected sucessfully")
}).catch(err=>{
    console.log(err)
})
