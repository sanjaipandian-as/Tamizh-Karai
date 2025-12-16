---
description: Deploy Tamizh-Karai Frontend and Backend
---

# Deployment Workflow for Tamizh-Karai

This workflow guides you through deploying both the frontend and backend of your Tamizh-Karai application.

## Prerequisites Checklist

Before deploying, ensure you have:
- [ ] MongoDB Atlas account (free tier available at mongodb.com/cloud/atlas)
- [ ] Cloudinary account for image uploads
- [ ] Google AI API key for the AI planner feature
- [ ] Git repository pushed to GitHub
- [ ] All environment variables ready

---

## Part 1: Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Click "Build a Database" → Choose "Free" tier (M0)
4. Select your preferred cloud provider and region (choose closest to your users)
5. Name your cluster (e.g., "tamizh-karai-cluster")
6. Click "Create Cluster"

### 2. Configure Database Access

1. In Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Create a username and strong password (save these!)
4. Set privileges to "Read and write to any database"
5. Click "Add User"

### 3. Configure Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your server's specific IP address
5. Click "Confirm"

### 4. Get Connection String

1. Go to "Database" → Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`)
4. Replace `<password>` with your actual database password
5. Add database name at the end: `mongodb+srv://username:password@cluster.mongodb.net/tamizh-karai`

---

## Part 2: Backend Deployment

### Option A: Deploy to Render (Free - Recommended for Quick Start)

#### 1. Prepare Backend for Deployment

```bash
cd Back-End
```

Make sure your `.env` file has production values (don't commit this file!):
- Set `NODE_ENV=production`
- Use MongoDB Atlas connection string
- Use strong JWT secrets
- Set production Cloudinary credentials

#### 2. Deploy to Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `tamizh-karai-api`
   - **Root Directory**: `Back-End`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-strong-secret>
   JWT_REFRESH_SECRET=<generate-strong-secret>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
   CLOUDINARY_API_KEY=<your-cloudinary-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-secret>
   GOOGLE_API_KEY=<your-google-api-key>
   FRONTEND_URL=<will-add-after-frontend-deployment>
   ```

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://tamizh-karai-api.onrender.com`)

**Generate Strong Secrets** (run in terminal):
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Option B: Deploy to Railway (Alternative Free Option)

1. Go to https://railway.app and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect your backend
5. Add environment variables in the "Variables" tab
6. Deploy automatically starts

### Option C: Deploy to Your Own Server (VPS)

If you have a VPS (DigitalOcean, AWS EC2, etc.):

```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone your repository
git clone https://github.com/yourusername/Tamizh-Karai.git
cd Tamizh-Karai/Back-End

# Install dependencies
npm ci --production

# Create .env file with production values
nano .env

# Start with PM2
pm2 start server.js --name tamizh-karai-api

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

---

## Part 3: Frontend Deployment

### Option A: Deploy to Vercel (Recommended - Free)

#### 1. Update API Endpoint

First, update your frontend to use the production backend URL:

```bash
cd Front-End
```

Edit `API.js` and update the base URL to your backend URL from Part 2:
```javascript
const API_BASE_URL = 'https://tamizh-karai-api.onrender.com/api/v1';
```

#### 2. Deploy to Vercel

**Method 1: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd Front-End
vercel --prod
```

**Method 2: Using Vercel Dashboard**
1. Go to https://vercel.com and sign up/login
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `Front-End`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click "Deploy"
6. Wait for deployment (2-5 minutes)
7. Copy your frontend URL (e.g., `https://tamizh-karai.vercel.app`)

#### 3. Update Backend CORS

Go back to your backend deployment (Render/Railway) and update the `FRONTEND_URL` environment variable with your Vercel URL:
```
FRONTEND_URL=https://tamizh-karai.vercel.app
```

Redeploy the backend for changes to take effect.

### Option B: Deploy to Netlify (Alternative)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the frontend
cd Front-End
npm run build

# Deploy
netlify deploy --prod
```

Or use Netlify's dashboard:
1. Go to https://netlify.com
2. Drag and drop your `dist` folder
3. Or connect GitHub repository

---

## Part 4: Post-Deployment Verification

### 1. Test Backend API

```bash
# Health check
curl https://your-backend-url.com/health

# Test places endpoint
curl https://your-backend-url.com/api/v1/places
```

### 2. Test Frontend

1. Open your frontend URL in a browser
2. Test user registration and login
3. Test place browsing
4. Test AI trip planner
5. Test hotel recommendations

### 3. Monitor Logs

**Render:**
- Go to your service dashboard → "Logs" tab

**Vercel:**
- Go to your project → "Deployments" → Click deployment → "Logs"

**PM2 (if using VPS):**
```bash
pm2 logs tamizh-karai-api
pm2 monit
```

---

## Part 5: Optional Enhancements

### Setup Custom Domain

**Vercel:**
1. Go to project settings → "Domains"
2. Add your custom domain
3. Update DNS records as instructed

**Render:**
1. Go to service settings → "Custom Domain"
2. Add domain and update DNS

### Enable HTTPS

- Vercel and Render provide automatic HTTPS
- For VPS, use Let's Encrypt:
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Setup Monitoring

1. **Uptime Monitoring**: Use UptimeRobot (free) to monitor your API
2. **Error Tracking**: Add Sentry for error monitoring
3. **Analytics**: Add Google Analytics to frontend

---

## Troubleshooting

### Backend Issues

**Problem: 502 Bad Gateway**
- Check if backend is running: `pm2 status` or check Render logs
- Verify MongoDB connection string is correct
- Check environment variables are set

**Problem: CORS Errors**
- Ensure `FRONTEND_URL` in backend matches your frontend URL exactly
- Redeploy backend after changing environment variables

**Problem: Database Connection Failed**
- Verify MongoDB Atlas IP whitelist includes your server IP
- Check connection string format
- Ensure database user has correct permissions

### Frontend Issues

**Problem: API calls failing**
- Verify `API.js` has correct backend URL
- Check browser console for CORS errors
- Ensure backend is running and accessible

**Problem: Build fails**
- Run `npm run build` locally to check for errors
- Check Node.js version compatibility
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

---

## Quick Reference Commands

### Backend (PM2)
```bash
pm2 status                    # Check status
pm2 logs tamizh-karai-api    # View logs
pm2 restart tamizh-karai-api # Restart
pm2 stop tamizh-karai-api    # Stop
```

### Update Deployment
```bash
# Pull latest code
git pull origin main

# Backend
cd Back-End
npm install
pm2 restart tamizh-karai-api

# Frontend (Vercel)
cd Front-End
npm install
npm run build
vercel --prod
```

---

## Cost Estimate

### Free Tier (Perfect for Portfolio/Demo)
- MongoDB Atlas: Free (512MB storage)
- Render/Railway: Free (sleeps after inactivity)
- Vercel/Netlify: Free (unlimited bandwidth)
- **Total: $0/month**

### Production Tier
- MongoDB Atlas: $9-57/month (dedicated cluster)
- Render/Railway: $7-25/month (always-on)
- Vercel Pro: $20/month (optional)
- **Total: ~$16-102/month**

---

## Success Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Backend deployed and health check passing
- [ ] Frontend deployed and accessible
- [ ] CORS configured correctly
- [ ] User registration and login working
- [ ] Places and hotels displaying correctly
- [ ] AI trip planner functional
- [ ] Image uploads working (Cloudinary)
- [ ] All environment variables set correctly
- [ ] Monitoring setup (optional)
- [ ] Custom domain configured (optional)

---

**Congratulations! Your Tamizh-Karai application is now live! 🎉**

Share your deployed URLs:
- Frontend: https://your-app.vercel.app
- Backend API: https://your-api.onrender.com
