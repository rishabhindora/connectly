const healthCheck = (req, res) => {
    res.json({
      success: true,
      message: "Connectly API is healthy"
    });
  };
  
  module.exports = healthCheck;