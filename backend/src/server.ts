import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import checkoutRoutes from './routes/checkoutRoutes';
import webhookRoutes from './routes/webhookRoutes';
import authRoutes from './routes/authRoutes';

// Load .env from root
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/checkout', checkoutRoutes);
app.use('/api/v1/webhooks', webhookRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
