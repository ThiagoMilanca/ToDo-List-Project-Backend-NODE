import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { appRouter } from './app.router';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('🚀 Server working correctly!');
});

app.use('/', appRouter);

const server = app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`);
});

export { app, server };
