import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",    
    credentials: true,
}));

app.use(morgan("dev"));

app.use(express.json());

app.use("/api", authRoutes);

export default app;