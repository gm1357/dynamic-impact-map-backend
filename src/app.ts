import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import pastorRoutes from './routes/pastor.routes';
import mapRoutes from './routes/map.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());

app.use('/api/pastors', pastorRoutes);
app.use('/api/map', mapRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
