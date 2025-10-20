// src/app.ts
import express from "express";
import cors from "cors";
import router from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// API versioning prefix
app.use("/api/v1", router);

// health
app.get("/health", (_req, res) => res.json({ success: true, uptime: process.uptime() }));

// global error fallback
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(PORT, () => {
  console.log(`Game API listening on http://localhost:${PORT}/api/v1`);
});

export default app;
