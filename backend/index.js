

import express from "express";
import { PORT,mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";  

import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import authRouter from "./routes/authRoute.js"
import cors from "cors"
import errorMiddleware from "./middlewares/error-middleware.js";

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],


// }))

app.get("/",(req,res)=>{
    console.log(req)
    return res.status(200).send("Hello, Welcome to BOOKSTORE Project")
})
app.use("/books",booksRoute)

app.use(errorMiddleware)

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database")
    app.listen(PORT,()=>{
        console.log(`App is listening to port: ${PORT}`)
    })

})
.catch((error)=>{
    console.log(error)

})