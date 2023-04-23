import indexRoutes from './routes/routes';
import dotenv from 'dotenv';
import express, { Express } from 'express';

const app: Express = express();
const PORT: number = 3000;

// Config dotenv
dotenv.config({ path: './config/.env' });

// Middlewares
app.use(express.json());

// Routes
app.use(indexRoutes);

// Server
app.listen(PORT, () => {
	console.log(`Server on PORT: ${PORT}`);
});
