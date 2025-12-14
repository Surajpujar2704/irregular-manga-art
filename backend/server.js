require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://irregular-manga-art.vercel.app",
  methods: ["GET","POST"]
}));

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("✅ MongoDB connected"))
  .catch(err=>console.error(err));

const Contact = mongoose.model("Contact", new mongoose.Schema({
  name:String,
  email:String,
  message:String,
  createdAt:{type:Date,default:Date.now}
}));

app.post("/api/contact", async (req,res)=>{
  try{
    await Contact.create(req.body);
    res.json({ok:true});
  }catch(err){
    res.status(500).json({ok:false});
  }
});

app.listen(process.env.PORT || 5000, "0.0.0.0", () =>
  console.log("🚀 Server running")
);
