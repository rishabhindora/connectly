const express = require("express");
const cors = require("cors");

const healthRoutes = require('./routes/healthRoutes');
const dbRoutes = require('./routes/dbRoutes');

const errorMiddleware = require('./middleware/errorMiddleware');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use("/api/db", dbRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;