// require('dotenv').config()
import connectDB from "./db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv";

// Configure dotenv at the very beginning
dotenv.config({
    path: './.env'
});

console.log("HELLOS")

connectDB()
.then(()=>{
    app.listen((process.env.PORT||3000),()=>{
        console.log(`Server is running at port ${process.env.PORT || 3000}`);
    })

})
.catch((err)=>{
    console.log("MONGODB CONNECTION ERROR:", err)
})

