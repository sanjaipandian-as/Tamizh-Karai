import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

// Import configuration
import config from "./config/env.config.js";
import logger from "./config/logger.js";

// Import middleware
import {
  helmetMiddleware,
  generalLimiter,
  sanitizeData,
  preventParameterPollution,
  corsOptions,
  requestSizeLimiter
} from "./middleware/security.middleware.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

// Import routes
import authRoutes from "./Controllers/UserRoutes.js";
import userPickRoutes from "./Controllers/UserPickRoutes.js";
import hotelroute from "./Controllers/HotelRoute.js";
import AiPlanner from "./Controllers/AIPlanner.js";
import placeroute from "./Controllers/PlacesRoute.js";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Initialize Express app
const app = express();

// Trust proxy (important for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security Middleware
app.use(helmetMiddleware);
app.use(sanitizeData);
app.use(preventParameterPollution);

// CORS
app.use(cors(corsOptions));

// Body parser with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(requestSizeLimiter);

// Compression
app.use(compression());

// HTTP request logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream: logger.stream }));
}

// Rate limiting
app.use('/api/', generalLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    uptime: process.uptime()
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Tamizh-Karai API',
    version: '1.0.0',
    documentation: '/api/docs'
  });
});

// Database Connection
mongoose
  .connect(config.mongoUri)
  .then(() => {
    logger.info('✅ Database Connected Successfully');
    logger.info(`📊 Database: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    logger.error('❌ Database Connection Failed:', err);
    process.exit(1);
  });

// Database connection event handlers
mongoose.connection.on('disconnected', () => {
  logger.warn('⚠️  Database disconnected');
});

mongoose.connection.on('reconnected', () => {
  logger.info('✅ Database reconnected');
});

// API Routes (v1)
app.use("/api/v1/auth/users", authRoutes);
app.use("/api/v1/picks", userPickRoutes);
app.use("/api/v1/hotels", hotelroute);
app.use("/api/v1/ai", AiPlanner);
app.use("/api/v1/places", placeroute);

// Backward compatibility routes (for old frontend code)
app.use("/api", AiPlanner); // This makes /api/ai-trip work

// Legacy routes (for backward compatibility - will be deprecated)
app.use("/api/auth/users", authRoutes);
app.use("/api/picks", userPickRoutes);
app.use("/api/auth/hotels", hotelroute);
app.use("/api/ai", AiPlanner);
app.use("/api/places", placeroute);

// 404 handler
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM received. Shutting down gracefully...');
  mongoose.connection.close(() => {
    logger.info('💤 Database connection closed');
    process.exit(0);
  });
});

// Start server
const server = app.listen(config.port, () => {
  logger.info(`🚀 Server running in ${config.nodeEnv} mode on port ${config.port}`);
  logger.info(`🌍 Frontend URL: ${config.frontendUrl}`);
});

app.get('/', (req, res) => {
  res.status(200).json({ message: "API is running successfully" });
});

export default app;
