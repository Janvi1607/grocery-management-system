const { body, validationResult } = require("express-validator");
const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

const validateOrder = [
  body("customer")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required"),

  body("items")
    .isArray({ min: 1 })
    .withMessage("Order must contain at least one item"),

  body("amount")
    .isFloat({ min: 0 })
    .withMessage("Amount must be a positive number"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Order validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE order
router.post("/", validateOrder, async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE order status
router.patch("/:id/status", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;