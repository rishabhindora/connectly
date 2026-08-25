const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        status: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
};

module.exports = notFoundMiddleware;