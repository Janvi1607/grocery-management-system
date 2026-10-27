const { body, validationResult } = require("express-validator");
const express = require("express");
const Order = require("../models/Order");
const { getIO } = require("../socket");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

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
router.post(
  "/",
  protect,
  authorize("Customer"),
  validateOrder,
  async (req, res) => {
    try {
      const order = new Order({
        customer: req.user.name,
        items: req.body.items,
        amount: req.body.amount,
      });
      const savedOrder = await order.save();
      
      // Send order confirmation email
      if (req.user.email && process.env.RESEND_API_KEY) {
        try {
          const itemsText = savedOrder.items
            .map((item) => {
              const name = item.name || item.title || "Item";
              const quantity = item.quantity || item.qty || 1;
              const price = item.price ?? item.amount ?? 0;
              const subtotal = price * quantity;

              return `${name} x ${quantity} — ₹${subtotal}`;
            })
            .join("\n");

          const { error } = await resend.emails.send({
            from: "Grocery Store <onboarding@resend.dev>",
            to: req.user.email,
            subject: `Order Confirmation - ${savedOrder._id}`,
            text: `
Hello ${req.user.name},

Your grocery order has been placed successfully!

Order ID: ${savedOrder._id}
Date: ${savedOrder.createdAt}
Items:
${itemsText}

Total Amount: ₹${savedOrder.amount}
Status: ${savedOrder.status}

Thank you for shopping with us!
      `,
          });

          if (error) {
            console.error("Order confirmation email failed:", error);
          } else {
            console.log("Order confirmation email sent to:", req.user.email);
          }
        } catch (emailError) {
          console.error("Email sending error:", emailError.message);
        }
      }

      const io = getIO();

      // Notify Store
      io.to("store").emit("new-order", savedOrder);

      // Notify the customer who placed this order
      io.to(`customer:${req.user.id}`).emit("order-confirmation", savedOrder);

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
