```javascript
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { createServer } from 'http';
import connectDB from './config/database.js';
import errorHandler from './utils/errorHandler.js';
import { loginLimiter, apiLimiter } from './middleware/rateLimiter.js';

// Routes
import adminAuthRoutes from './routes/admin/authRoutes.js';
import adminProfileRoutes from './routes/admin/profileRoutes.js';
import adminDashboardRoutes from './routes/admin/dashboardRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Apply rate limiting
app.use('/api/admin/auth', loginLimiter);
app.use('/api', apiLimiter);

// Mount routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/profile', adminProfileRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Close server & exit process
  httpServer.close(() => process.exit(1));
});
```