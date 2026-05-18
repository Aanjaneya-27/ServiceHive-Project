import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import leadRoutes from './routes/leadRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/leads', leadRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the user api');
})



export default app;