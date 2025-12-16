# Simple Deployment Guide (Without Docker)

## Quick Production Deployment

### 1. Install PM2 Globally
```bash
npm install -g pm2
```

### 2. Deploy Backend

```bash
cd Back-End

# Install production dependencies
npm ci --production

# Start with PM2
pm2 start server.js --name tamizh-karai-api

# Save PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
```

### 3. Deploy Frontend

```bash
cd Front-End

# Build for production
npm run build

# The 'dist' folder contains your production-ready frontend
# Deploy this folder to:
# - Vercel (recommended): vercel --prod
# - Netlify: netlify deploy --prod
# - Or copy to your web server
```

### 4. PM2 Commands

```bash
pm2 status                    # Check status
pm2 logs tamizh-karai-api    # View logs
pm2 restart tamizh-karai-api # Restart app
pm2 stop tamizh-karai-api    # Stop app
pm2 delete tamizh-karai-api  # Remove from PM2
pm2 monit                     # Monitor resources
```

### 5. Environment Setup

Make sure your `.env` file has production values:
- `NODE_ENV=production`
- Production MongoDB URI (MongoDB Atlas recommended)
- Strong JWT secrets
- Production Cloudinary credentials

## Recommended Hosting

### Backend
- **Vercel** (easiest)
- **Railway** (simple)
- **DigitalOcean** (affordable)
- **AWS EC2** (scalable)

### Frontend
- **Vercel** (recommended - free tier)
- **Netlify** (free tier)
- **GitHub Pages** (free)

### Database
- **MongoDB Atlas** (free tier available)

## Full Deployment Guide

For detailed instructions including:
- MongoDB Atlas setup
- Nginx configuration
- SSL certificates
- Cloud platform deployment
- Troubleshooting

See: [DEPLOYMENT.md](DEPLOYMENT.md)
