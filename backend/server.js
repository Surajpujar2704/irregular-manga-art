require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());
app.use(cors({ origin: "*" }));

/* ---------------- TEST ROUTES ---------------- */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api", (req, res) => {
  res.json({ msg: "IMA Backend running" });
});

/* ---------------- DATABASE ---------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* ---------------- MODEL ---------------- */
const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
  })
);

/* ---------------- API ROUTE ---------------- */
app.post("/api/contact", async (req, res) => {
  try {
    console.log("📩 Incoming:", req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    await Contact.create({ name, email, message });

    return res.json({ ok: true });
  } catch (err) {
    console.error("❌ Contact Error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
