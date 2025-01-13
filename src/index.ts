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
const PORT = serverConfig.port || 3000; // Use environment variable or default
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `API Docs available at https://nxt-job-assignment.onrender.com/api-docs`
  );
});
