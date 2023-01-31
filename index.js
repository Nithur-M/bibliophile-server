import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import decodeIDToken from './middleware/auth.js';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import bookRoutes from  './routes/books.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(decodeIDToken);

app.use('/book', bookRoutes);
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));
