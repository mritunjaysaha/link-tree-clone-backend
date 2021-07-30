require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");

// my routes
const authRoutes = require("./routes/auth");

// initialize app
const app = express();

// connect database
connectDB();

// initialize middleware
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ extend: false }));

// my routes
app.get("/", (req, res) => res.send("Server is active"));
app.use("/api", authRoutes);
// setting PORT

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
