import indexRoutes from './routes/routes.js';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';

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
