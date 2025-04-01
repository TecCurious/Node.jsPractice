import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log(process.env.PORT);


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/auth',authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});