// Libraries
import "dotenv/config.js";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

// Routes
import articleRoutes from "./routes/article.routes.js";
import fileRoutes from "./routes/file.routes.js";

// Environment
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_URL = process.env.CLIENT_URL;

// Init
const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(cors({ origin: CLIENT_URL }));

app.use("/api", articleRoutes);
app.use("/api", fileRoutes);

// Start server
async function startServer() {
    try {
        await mongoose.connect(MONGODB_URI);
        app.listen(PORT);
    } catch (error) {
        console.error(`Sever error while connecting to the database: ${error}`);
    }
}

startServer();