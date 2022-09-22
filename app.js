import express from 'express';
import * as dotenv from 'dotenv';
import 'express-async-errors';

import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import connectDB from './db/connect.js';
import productsRouter from './routes/products.js';

//async error


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


//middleware
app.use(express.json());

//routes
app.get('/', (req, res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Go to Products</a>');
});

app.use('/api/v1/products', productsRouter);

// products routes
app.use(notFound);
app.use(errorHandlerMiddleware);


const start = async() => {
 try {
   await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`The Connection was established successfully, PORT=${PORT}`));
 } catch (error) {
    console.log(error);
 }
};

start();