import dotenv from 'dotenv';

dotenv.config();

// Validate required environment variables (only critical ones)
const requiredEnvVars = [
  'PORT',
  'MONGO_URI',
  'JWT_SECRET'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => console.error(`   - ${envVar}`));
  console.error('\nPlease check your .env file and ensure all required variables are set.');
  process.exit(1);
}

const config = {
  // Server
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  mongoUri: process.env.MONGO_URI,

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    refreshExpire: process.env.JWT_REFRESH_EXPIRE || '30d'
  },

  // Cloudinary (optional - for image uploads)
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  },

  // Google AI (optional - for AI trip planner)
  googleApiKey: process.env.GOOGLE_API_KEY,

  // Frontend
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },

  // Security
  isProduction: process.env.NODE_ENV === 'production'
};

// Warn about optional missing credentials
if (!config.cloudinary.cloudName || !config.cloudinary.apiKey || !config.cloudinary.apiSecret) {
  console.warn('⚠️  Warning: Cloudinary credentials not configured. Image upload features will not work.');
  console.warn('   Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env file.');
}

if (!config.googleApiKey) {
  console.warn('⚠️  Warning: Google AI API key not configured. AI trip planner will not work.');
  console.warn('   Add GOOGLE_API_KEY to .env file.');
}

export default config;
