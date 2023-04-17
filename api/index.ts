import express, { Express } from 'express';
import indexRoutes from './routes/routes';

const app: Express = express();
const PORT: number = 3000;

// Middlewares
app.use(express.json());

// Routes
app.use(indexRoutes);

// Server
app.listen(PORT, () => {
	console.log(`Server on PORT: ${PORT}`);
});