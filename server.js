import express from 'express';
import connectdb from './config/dbCon.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

// Connect to MongoDB
connectdb();

dotenv.config();

const allowedOrigins = process.env.CORS_ORIGINS.split(',');

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
    function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true,
}
app.use(cors(corsOptions));

app.use('/api/user', userRoutes);


// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Example protected route using the middleware
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.user.userId });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'This is a test route' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
