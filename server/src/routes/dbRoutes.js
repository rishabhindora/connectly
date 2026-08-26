const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/test", async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT DATABASE() AS databaseName");

    res.json({
      success: true,
      message: "MySQL connection successful",
      data: rows
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;