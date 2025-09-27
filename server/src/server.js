import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";



// Load env vars
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send(
    "🚀 Welcome to SkillSwap API – Exchange skills, learn, and grow together!."
  );
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
