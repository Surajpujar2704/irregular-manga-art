// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ----------------------------------------------------
// MIDDLEWARE
// ----------------------------------------------------
app.use(express.json());

app.use(
  cors({
    origin: "https://irregular-manga-art.vercel.app", // your deployed frontend
    methods: ["GET", "POST"],
  })
);

// ----------------------------------------------------
// DATABASE (MongoDB Atlas)
// ----------------------------------------------------
const MONGO = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!MONGO) {
  console.error("❌ ERROR: MONGO_URI is missing in environment variables!");
}

mongoose
  .connect(MONGO, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB error:", err));

// ----------------------------------------------------
// CONTACT MODEL
// ----------------------------------------------------
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------
app.get("/", (req, res) => {
  res.send("Backend is running.");
});

app.get("/api", (req, res) => {
  res.json({ msg: "IMA Backend running" });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await Contact.create({ name, email, message });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Contact Error:", err);
    return res.status(500).json({ ok: false, error: "Server Error" });
  }
});

// ----------------------------------------------------
// START SERVER (RENDER REQUIRES 0.0.0.0)
// ----------------------------------------------------
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Backend running on port ${PORT}`)
);
