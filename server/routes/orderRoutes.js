const { body, validationResult } = require("express-validator");
const express = require("express");
const Order = require("../models/Order");
const { getIO } = require("../socket");

const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

const validateOrder = [
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
router.get("/", protect, async (req, res) => {
  try {
    let orders;

    if (req.user.role === "Store") {
      orders = await Order.find().sort({ createdAt: -1 });
    } else {
      orders = await Order.find({
        customer: req.user.name,
      }).sort({ createdAt: -1 });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE order
router.post("/", protect, authorize("Customer"), validateOrder, async (req, res) => {
    try {
      const order = new Order({
        customer: req.user.name,
        items: req.body.items,
        amount: req.body.amount,
      });
      const savedOrder = await order.save();

      const io = getIO();
      io.emit("new-order", savedOrder);

      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
);

// UPDATE order status
router.patch("/:id/status", protect, authorize("Store"), async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true },
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
