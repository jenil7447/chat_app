// const express = require('express') method-1
import express from "express"; // method -2
import dotenv from "dotenv";
dotenv.config({});
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js"; 



const PORT = process.env.PORT || 5050;
//middleware
app.use(express.urlencoded({extended:true})); 
// "This line (app.use(express.urlencoded({ extended: true }));) is middleware that helps Express parse form data sent from HTML forms. When you submit a form, the data comes in a URL-encoded string (like username=john&password=123), and this middleware converts it into a JavaScript object (req.body) so we can easily use it in our routes."
app.use(express.json());
app.use(cookieParser());
const corsOPtion={
    origin:'http://localhost:5173'||'http://localhost:3000',
    credentials:true
};
app.use(cors(corsOPtion));

//routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);

server.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
})
