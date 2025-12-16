# Deployment Guide - Tamizh-Karai

This guide covers deploying Tamizh-Karai to production environments.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Docker Deployment](#docker-deployment)
7. [Cloud Deployment Options](#cloud-deployment-options)
8. [Post-Deployment](#post-deployment)
9. [Monitoring](#monitoring)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 20+ installed
- MongoDB 7+ (local or cloud)
- Domain name (optional but recommended)
- SSL certificate (Let's Encrypt recommended)
- Cloud account (AWS, Google Cloud, Azure, or DigitalOcean)

## Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/Tamizh-Karai.git
cd Tamizh-Karai
```

### 2. Configure Environment Variables

**Backend (.env)**
```bash
cd Back-End
cp .env.example .env
nano .env
```

Update with production values:
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/tamizh-karai
JWT_SECRET=<generate-strong-secret>
JWT_REFRESH_SECRET=<generate-strong-secret>
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
GOOGLE_API_KEY=your-google-api-key
FRONTEND_URL=https://yourdomain.com
```

**Generate Secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Database Setup

### Option 1: MongoDB Atlas (Recommended)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Configure network access (add your server IP)
4. Create database user
5. Get connection string
6. Update `MONGO_URI` in `.env`

### Option 2: Self-Hosted MongoDB

```bash
# Install MongoDB
sudo apt-get install mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Create database and user
mongo
> use tamizh-karai
> db.createUser({
    user: "tamizh_user",
    pwd: "strong_password",
    roles: ["readWrite"]
  })
```

## Backend Deployment

### Option 1: PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Navigate to backend
cd Back-End

# Install dependencies
npm ci --production

# Start with PM2
pm2 start server.js --name tamizh-karai-api

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

**PM2 Commands:**
```bash
pm2 status              # Check status
pm2 logs tamizh-karai-api  # View logs
pm2 restart tamizh-karai-api  # Restart
pm2 stop tamizh-karai-api     # Stop
```

### Option 2: Systemd Service

Create `/etc/systemd/system/tamizh-karai.service`:
```ini
[Unit]
Description=Tamizh-Karai Backend API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/Tamizh-Karai/Back-End
ExecStart=/usr/bin/node server.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Start service:
```bash
sudo systemctl daemon-reload
sudo systemctl start tamizh-karai
sudo systemctl enable tamizh-karai
sudo systemctl status tamizh-karai
```

### Nginx Reverse Proxy

Install Nginx:
```bash
sudo apt-get install nginx
```

Create `/etc/nginx/sites-available/tamizh-karai`:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/tamizh-karai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL Certificate (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
sudo certbot renew --dry-run  # Test renewal
```

## Frontend Deployment

### Build for Production

```bash
cd Front-End

# Update API endpoint in API.js
# Change to your production backend URL

# Build
npm run build
```

### Option 1: Nginx Static Hosting

```bash
# Copy build to web root
sudo cp -r dist/* /var/www/html/

# Or create separate directory
sudo mkdir -p /var/www/tamizh-karai
sudo cp -r dist/* /var/www/tamizh-karai/
```

Nginx config `/etc/nginx/sites-available/tamizh-karai-frontend`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/tamizh-karai;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Option 2: Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd Front-End
vercel --prod
```

### Option 3: Netlify

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

## Docker Deployment

### Build and Run

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Docker Compose

Update `docker-compose.yml` for production:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
    volumes:
      - mongodb_data:/data/db
    networks:
      - tamizh-network

  backend:
    build: ./Back-End
    restart: always
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
    env_file:
      - ./Back-End/.env
    depends_on:
      - mongodb
    networks:
      - tamizh-network

  frontend:
    build: ./Front-End
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - backend
    networks:
      - tamizh-network

networks:
  tamizh-network:
    driver: bridge

volumes:
  mongodb_data:
```

## Cloud Deployment Options

### AWS (Amazon Web Services)

**Option 1: EC2**
1. Launch EC2 instance (Ubuntu 22.04)
2. Configure security groups (ports 22, 80, 443, 5000)
3. SSH into instance
4. Follow manual deployment steps above

**Option 2: Elastic Beanstalk**
1. Install EB CLI
2. Initialize: `eb init`
3. Create environment: `eb create production`
4. Deploy: `eb deploy`

**Option 3: ECS (Docker)**
1. Push images to ECR
2. Create ECS cluster
3. Define task definitions
4. Create services

### Google Cloud Platform

**Option 1: Compute Engine**
- Similar to AWS EC2

**Option 2: Cloud Run**
```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/tamizh-karai-backend
gcloud builds submit --tag gcr.io/PROJECT_ID/tamizh-karai-frontend

# Deploy
gcloud run deploy tamizh-karai-backend --image gcr.io/PROJECT_ID/tamizh-karai-backend
gcloud run deploy tamizh-karai-frontend --image gcr.io/PROJECT_ID/tamizh-karai-frontend
```

### DigitalOcean

**Option 1: Droplet**
1. Create Ubuntu droplet
2. Follow manual deployment

**Option 2: App Platform**
1. Connect GitHub repository
2. Configure build settings
3. Deploy

### Heroku

**Backend:**
```bash
cd Back-End
heroku create tamizh-karai-api
heroku config:set NODE_ENV=production
git push heroku main
```

**Frontend:**
- Deploy to Vercel or Netlify instead

## Post-Deployment

### 1. Verify Deployment

```bash
# Check backend health
curl https://api.yourdomain.com/health

# Check frontend
curl https://yourdomain.com

# Test API endpoints
curl https://api.yourdomain.com/api/v1/places
```

### 2. Setup Monitoring

**Backend Logs:**
```bash
# PM2
pm2 logs

# Systemd
sudo journalctl -u tamizh-karai -f

# Docker
docker-compose logs -f backend
```

### 3. Database Backup

**MongoDB Atlas:**
- Automatic backups enabled by default

**Self-Hosted:**
```bash
# Create backup script
#!/bin/bash
mongodump --uri="mongodb://localhost:27017/tamizh-karai" --out=/backups/$(date +%Y%m%d)

# Add to crontab
0 2 * * * /path/to/backup-script.sh
```

### 4. Setup SSL Auto-Renewal

```bash
# Certbot auto-renewal (already setup)
sudo certbot renew --dry-run

# Check cron
sudo systemctl status certbot.timer
```

## Monitoring

### Application Monitoring

**Option 1: PM2 Plus**
```bash
pm2 link <secret> <public>
```

**Option 2: New Relic**
1. Sign up at newrelic.com
2. Install agent
3. Configure

**Option 3: Sentry (Error Tracking)**
```bash
npm install @sentry/node
```

### Server Monitoring

**Uptime Monitoring:**
- UptimeRobot (free)
- Pingdom
- StatusCake

**Server Metrics:**
```bash
# Install htop
sudo apt-get install htop

# Monitor
htop
```

## Troubleshooting

### Common Issues

**1. Cannot connect to MongoDB**
```bash
# Check MongoDB status
sudo systemctl status mongodb

# Check connection string
# Verify network access in MongoDB Atlas
```

**2. 502 Bad Gateway**
```bash
# Check backend is running
pm2 status
sudo systemctl status tamizh-karai

# Check Nginx config
sudo nginx -t
```

**3. CORS Errors**
- Update `FRONTEND_URL` in backend `.env`
- Restart backend service

**4. High Memory Usage**
```bash
# Check processes
pm2 monit

# Restart if needed
pm2 restart tamizh-karai-api
```

**5. Slow Performance**
- Check database indexes
- Enable caching
- Optimize images
- Use CDN

### Logs Location

- Backend logs: `Back-End/logs/`
- Nginx logs: `/var/log/nginx/`
- PM2 logs: `~/.pm2/logs/`
- System logs: `/var/log/syslog`

## Security Checklist

- [ ] Environment variables secured
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Database access restricted
- [ ] Regular backups enabled
- [ ] Monitoring setup
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] Dependencies updated
- [ ] Secrets rotated

## Maintenance

### Regular Tasks

**Daily:**
- Monitor error logs
- Check uptime status

**Weekly:**
- Review performance metrics
- Check disk space
- Review security logs

**Monthly:**
- Update dependencies
- Review and rotate logs
- Database optimization
- Security audit

### Update Deployment

```bash
# Pull latest code
git pull origin main

# Backend
cd Back-End
npm install
pm2 restart tamizh-karai-api

# Frontend
cd ../Front-End
npm install
npm run build
sudo cp -r dist/* /var/www/tamizh-karai/
```

---

For additional help, refer to the main README or contact support.
