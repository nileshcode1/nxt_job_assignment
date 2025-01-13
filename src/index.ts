// src/index.ts
import express from "express";
import { serverConfig } from "./config";
import jobsRouter from "./routes/job";
import bodyParser from "body-parser";
import { setupSwagger } from "./swagger";

const app = express();

// Middleware
app.use(bodyParser.json());

// Swagger Documentation
setupSwagger(app);

// Routes
app.use("/jobs", jobsRouter);

// Root Endpoint
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Job Board API. Visit /api-docs for API documentation."
  );
});

// Start Server
app.listen(serverConfig.port, () => {
  console.log(`Server is running on port ${serverConfig.port}`);
  console.log(
    `API Docs available at http://localhost:${serverConfig.port}/api-docs`
  );
});
