import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './configuration/db.js';
import authenticationRoute from './routes/authenticationRoute.js';
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js'
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));
app.use('/api/v1/auth', authenticationRoute);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.get('/', (req, res) => {

    res.send('THIS IS THE SECOND SEND MESSAGE')

})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})