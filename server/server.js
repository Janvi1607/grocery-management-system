const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const { setIO } = require("./socket");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests, please try again later.",
  },
});

// Middleware
app.use(morgan("dev"));
app.use(helmet());
const allowedOrigins = [
  "http://localhost:5173",
  "https://grocery-management-system-rouge.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", apiLimiter);

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);


// Test route
app.get("/", (req, res) => {
  res.send("Grocery Store API is running");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

setIO(io);



io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = decoded;
    next();
  } catch (error) {
    next(new Error("Invalid or expired token"));
  }
});

io.on("connection", (socket) => {
  console.log("Authenticated client connected:", socket.id);

  // Customer ko uske personal room mein join karana
  if (socket.user.role === "Customer") {
    socket.join(`customer:${socket.user.id}`);
    console.log(`Customer joined personal room`);
  }

  // Store dashboard ko store room mein join karana
  if (socket.user.role === "Store") {
    socket.join("store");
    console.log(`Socket ${socket.id} joined store room`);
  }

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});


httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});