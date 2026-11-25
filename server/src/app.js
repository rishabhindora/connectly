const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const healthRoutes = require('./routes/healthRoutes');
const dbRoutes = require('./routes/dbRoutes');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const errorMiddleware = require('./middleware/errorMiddleware');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.get("/",(req, res) => {
  res.send("Welcome to the API");
});
app.use('/api/v1/health', healthRoutes);
app.use("/api/v1/db", dbRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;