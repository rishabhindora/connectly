const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/test", async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS result");

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