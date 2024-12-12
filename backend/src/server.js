import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/database.js';
import errorHandler from './utils/errorHandler.js';

// Routes
import adminAuthRoutes from './routes/admin/authRoutes.js';
import adminProfileRoutes from './routes/admin/profileRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin', adminProfileRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});