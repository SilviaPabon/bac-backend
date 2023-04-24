import indexRoutes from './routes/routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';

const app: Express = express();
const PORT: number = 3000;

// Config dotenv
dotenv.config({ path: './config/.env' });

// Middlewares
app.use(express.json());

// Allow cors
app.use(
	cors({
		origin: 'http://127.0.0.1:5173',
	}),
);

// Routes
app.use(indexRoutes);

// Server
app.listen(PORT, () => {
	console.log(`Server on PORT: ${PORT}`);
});
