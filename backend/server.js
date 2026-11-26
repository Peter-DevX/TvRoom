import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import {protectRoute} from "./middleware/protectRoute.js"
import authRoutes from "./routes/auth.routes.js"
import movieRoutes from "./routes/movie.routes.js"
import tvRoutes from "./routes/tv.routes.js"
import searchRoutes from "./routes/search.routes.js"


import {ENV_VARS} from "./config/envVars.js"
import {connectDB} from "./config/db.js"

dotenv.config()

const PORT = ENV_VARS.PORT

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie",protectRoute, movieRoutes)
app.use("/api/v1/tv", protectRoute, tvRoutes)
app.use("/api/v1/search", protectRoute, searchRoutes)


app.listen(3000, () => {
    console.log("Backend server is running on port"+PORT);
    connectDB()
    
})