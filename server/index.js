// server/index.js

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import  dbConnect  from './src/config/database.js';

// Import Routers
import AuthRoutes from './src/routes/authRoutes.js';
import UserRoutes from './src/routes/userRoutes.js';
import SkillSwapRoutes from './src/routes/skillSwapRoutes.js';
import sessionRoutes from './src/routes/sessionRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
dbConnect();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to SkillSwap');
});


// Mounting Routers
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/swaps', SkillSwapRoutes);
app.use('/api/sessions', sessionRoutes);

// App starts
app.listen(PORT, () => {
  console.log(`Server Started Successfully At Port No: ${PORT}`);
});