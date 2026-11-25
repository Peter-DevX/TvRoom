import express from "express";
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js"
import movieRoutes from "./routes/movie.routes.js"
import tvRoutes from "./routes/tv.routes.js"

import {ENV_VARS} from "./config/envVars.js"
import {connectDB} from "./config/db.js"

dotenv.config()

const PORT = ENV_VARS.PORT

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie", movieRoutes)
app.use("/api/v1/tv", tvRoutes)


app.listen(3000, () => {
    console.log("Backend server is running on port"+PORT);
    connectDB()
    
})