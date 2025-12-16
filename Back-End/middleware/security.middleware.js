import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import config from '../config/env.config.js';

// Helmet - Security headers
export const helmetMiddleware = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        },
    },
    crossOriginEmbedderPolicy: false,
});

// Rate limiting for all routes
export const generalLimiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequests,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter rate limiting for authentication routes
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    skipSuccessfulRequests: true,
    message: {
        success: false,
        message: 'Too many login attempts, please try again after 15 minutes.'
    }
});

// Rate limiting for password reset
export const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 requests per hour
    message: {
        success: false,
        message: 'Too many password reset attempts, please try again later.'
    }
});

// Custom NoSQL injection prevention (Express 5 compatible)
// Replaces express-mongo-sanitize which has compatibility issues
export const sanitizeData = (req, res, next) => {
    const sanitize = (obj) => {
        if (obj && typeof obj === 'object') {
            Object.keys(obj).forEach(key => {
                // Remove keys that start with $ or contain .
                if (key.startsWith('$') || key.includes('.')) {
                    delete obj[key];
                    console.warn(`⚠️  Sanitized potentially malicious key: ${key}`);
                } else if (typeof obj[key] === 'object') {
                    sanitize(obj[key]);
                }
            });
        }
    };

    // Sanitize body, params, and query
    if (req.body) sanitize(req.body);
    if (req.params) sanitize(req.params);
    if (req.query) sanitize(req.query);

    next();
};

// Prevent HTTP Parameter Pollution
export const preventParameterPollution = hpp({
    whitelist: ['price', 'rating', 'category'] // Add fields that can have multiple values
});

// Custom XSS protection middleware
export const xssProtection = (req, res, next) => {
    // Basic XSS sanitization for request body
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                req.body[key] = req.body[key]
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#x27;')
                    .replace(/\//g, '&#x2F;');
            }
        });
    }
    next();
};

// Request size limiter
export const requestSizeLimiter = (req, res, next) => {
    const contentLength = req.headers['content-length'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (contentLength && parseInt(contentLength) > maxSize) {
        return res.status(413).json({
            success: false,
            message: 'Request entity too large. Maximum size is 10MB.'
        });
    }
    next();
};

// CORS configuration
export const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            config.frontendUrl,
            'http://localhost:5173',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:3000'
        ];

        // In development, allow requests with no origin (like Postman, mobile apps)
        // In production, be more strict
        if (!origin && config.nodeEnv === 'development') {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`⚠️  CORS blocked request from origin: ${origin}`);
            callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
};
