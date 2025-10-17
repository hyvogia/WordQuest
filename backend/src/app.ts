import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

const port = process.env.PORT ?? 5003
app.listen(port, () => console.log(`Listening on ${port}...`))
