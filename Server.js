const express = require("express");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("MONGODB_URL");

const Order = mongoose.model("Order", {
  product: String,
  price: Number,
  paymentId: String,
  date: { type: Date, default: Date.now }
});

const razorpay = new Razorpay({
  key_id: "RAZORPAY_KEY",
  key_secret: "RAZORPAY_SECRET"
});

app.post("/create-order", async (req, res) => {
  const order = await razorpay.orders.create({
    amount: 100,
    currency: "INR"
  });
  res.json(order);
});

app.post("/save-order", async (req, res) => {
  await new Order(req.body).save();
  res.json({ success: true });
});

app.listen(3000);