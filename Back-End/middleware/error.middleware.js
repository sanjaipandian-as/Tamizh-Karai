import logger from '../config/logger.js';
import config from '../config/env.config.js';

// Custom error class
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Global error handler middleware
export const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log error
    logger.error({
        message: err.message,
        statusCode: err.statusCode,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: req.user?.id
    });

    // Development error response
    if (!config.isProduction) {
        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    // Production error response
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message
        });
    }

    // Programming or unknown error: don't leak error details
    console.error('ERROR 💥', err);
    return res.status(500).json({
        success: false,
        status: 'error',
        message: 'Something went wrong. Please try again later.'
    });
};

// Handle specific error types
export const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

export const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0];
    const message = `Duplicate field value: ${value}. Please use another value.`;
    return new AppError(message, 400);
};

export const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

export const handleJWTError = () =>
    new AppError('Invalid token. Please log in again.', 401);

export const handleJWTExpiredError = () =>
    new AppError('Your token has expired. Please log in again.', 401);

// 404 handler
export const notFoundHandler = (req, res, next) => {
    const err = new AppError(`Cannot find ${req.originalUrl} on this server`, 404);
    next(err);
};

// Async error wrapper
export const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
