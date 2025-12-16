# Tamizh-Karai 🏛️

> A modern Tamil cultural tourism platform connecting travelers with authentic Tamil heritage sites, temples, and cultural experiences.

[![CI/CD](https://github.com/yourusername/Tamizh-Karai/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/yourusername/Tamizh-Karai/actions)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## 🌟 Features

- **🗺️ Place Discovery**: Explore Tamil Nadu's rich cultural heritage with detailed information about temples, beaches, hills, museums, and more
- **🏨 Hotel Recommendations**: Find accommodations near cultural sites
- **🤖 AI Trip Planner**: Get personalized itineraries powered by Google Generative AI
- **👤 User Contributions**: Share your favorite places and experiences
- **🔐 Secure Authentication**: JWT-based authentication with refresh tokens
- **📱 Responsive Design**: Beautiful UI built with React and Tailwind CSS
- **⚡ High Performance**: Optimized with caching, compression, and database indexing

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js 5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with refresh tokens
- **Security**: Helmet, Rate Limiting, Input Validation, CORS
- **Logging**: Winston with log rotation
- **Testing**: Jest, Supertest, MongoDB Memory Server
- **File Upload**: Cloudinary integration

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **UI Components**: Radix UI, Framer Motion
- **AI Integration**: Google Generative AI

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- MongoDB 7 or higher (local or MongoDB Atlas)
- npm or yarn
- Cloudinary account (for image uploads)
- Google AI API key (for AI planner)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Tamizh-Karai.git
   cd Tamizh-Karai
   ```

2. **Backend Setup**
   ```bash
   cd Back-End
   npm install
   
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your configuration
   # Required: MONGO_URI, JWT_SECRET, CLOUDINARY credentials
   ```

3. **Frontend Setup**
   ```bash
   cd ../Front-End
   npm install
   
   # Update API.js with your backend URL if needed
   ```

4. **Start Development Servers**
   
   Backend:
   ```bash
   cd Back-End
   npm run dev
   ```
   
   Frontend (in a new terminal):
   ```bash
   cd Front-End
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 🚀 Production Deployment

For detailed deployment instructions to various platforms (AWS, Google Cloud, DigitalOcean, Heroku, etc.), see [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Production Setup

1. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   ```

2. **Start Backend with PM2**
   ```bash
   cd Back-End
   pm2 start server.js --name tamizh-karai-api
   pm2 save
   pm2 startup
   ```

3. **Build Frontend**
   ```bash
   cd Front-End
   npm run build
   # Deploy the 'dist' folder to your web server
   ```

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete production deployment guide including:
- MongoDB Atlas setup
- PM2 configuration
- Nginx reverse proxy
- SSL certificate setup
- Cloud platform deployment (AWS, GCP, etc.)


## 🧪 Testing

### Backend Tests

```bash
cd Back-End

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Frontend Tests

```bash
cd Front-End

# Run linter
npm run lint

# Build for production
npm run build
```

## 📁 Project Structure

```
Tamizh-Karai/
├── Back-End/
│   ├── Controllers/        # Route controllers
│   ├── Models/            # Mongoose models
│   ├── middleware/        # Custom middleware
│   ├── config/            # Configuration files
│   ├── __tests__/         # Test files
│   ├── logs/              # Application logs
│   ├── server.js          # Entry point
│   └── package.json
├── Front-End/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── assets/        # Static assets
│   │   └── App.jsx        # Main app component
│   ├── public/            # Public assets
│   └── package.json
├── docker-compose.yml     # Docker orchestration
└── README.md
```

## 🔐 Environment Variables

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/tamizh-karai

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRE=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google AI
GOOGLE_API_KEY=your-google-api-key

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/v1/auth/users/signup` - Register new user
- `POST /api/v1/auth/users/login` - Login user
- `POST /api/v1/auth/users/refresh-token` - Refresh access token
- `GET /api/v1/auth/users/profile` - Get user profile (Protected)
- `PUT /api/v1/auth/users/profile` - Update profile (Protected)
- `POST /api/v1/auth/users/forgot-password` - Reset password
- `DELETE /api/v1/auth/users/delete` - Delete account (Protected)

### Places Endpoints

- `GET /api/v1/places` - Get all places
- `GET /api/v1/places/:id` - Get place by ID
- `POST /api/v1/places` - Create new place (Protected)
- `PUT /api/v1/places/:id` - Update place (Protected)
- `DELETE /api/v1/places/:id` - Delete place (Protected)

### Hotels Endpoints

- `GET /api/v1/hotels` - Get all hotels
- `GET /api/v1/hotels/:id` - Get hotel by ID

### AI Planner

- `POST /api/v1/ai/plan` - Generate trip itinerary

## 🔒 Security Features

- ✅ Helmet.js for security headers
- ✅ Rate limiting on all routes
- ✅ Input validation and sanitization
- ✅ NoSQL injection prevention
- ✅ XSS protection
- ✅ CORS configuration
- ✅ JWT authentication with refresh tokens
- ✅ Password hashing with bcrypt (12 rounds)
- ✅ Request size limiting
- ✅ HTTP parameter pollution prevention

## 🚀 Performance Optimizations

- ✅ Database indexing on frequently queried fields
- ✅ Response compression (gzip/brotli)
- ✅ Cloudinary for optimized image delivery
- ✅ Connection pooling
- ✅ Efficient error handling
- ✅ Structured logging with Winston

## 📊 Monitoring

### Health Check

```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-12-11T09:18:04.000Z",
  "environment": "development",
  "uptime": 123.456
}
```

### Logs

Logs are stored in `Back-End/logs/`:
- `combined.log` - All logs
- `error.log` - Error logs only
- `exceptions.log` - Uncaught exceptions
- `rejections.log` - Unhandled promise rejections

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Tamil Nadu Tourism for inspiration
- Google Generative AI for AI capabilities
- Cloudinary for image management
- All contributors and supporters

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

Made with ❤️ for Tamil Culture