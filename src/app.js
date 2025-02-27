import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express();

// Enable CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}))

app.use(express.json({limit:"16kb"}))// middleware 'use'
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(cookieParser()) // to store a secure cookies related to user in browser
app.use(express.static("public"))// for public assets

// routes imports
import userRouter from './routes/user.routes.js'

// routes declaration
app.use("/api/v1/users", userRouter) // use middleware instead of app.get b/c routes are define in seperate file.



export { app }

