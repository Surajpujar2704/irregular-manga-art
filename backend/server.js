// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// -----------------------------
// DATABASE
// -----------------------------
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ima_db";
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("DB error:", err));


// -----------------------------
// CONTACT MODEL
// -----------------------------
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model("Contact", contactSchema);


// -----------------------------
// API ROUTES
// -----------------------------
app.get("/api", (req, res) => {
  res.json({ msg: "IMA Backend running" });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Contact.create({ name, email, message });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false });
  }
});


// -----------------------------
// SERVE FRONTEND (FIXED FOR EXPRESS v5)
// -----------------------------
// No wildcard ("*") allowed in v5.
// Instead: serve static files first.

app.use(cors({
  origin: "https://irregular-manga-art.vercel.app",
  methods: ["GET", "POST"],
}));





// -----------------------------
// START SERVER
// -----------------------------
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Backend running on ${PORT}`)
);


