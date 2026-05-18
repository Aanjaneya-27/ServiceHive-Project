import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/database';

connectDB()


app.listen(5000, () => {
    console.log('Congrats your server is running ');
})