//common js import & export
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
import { globalErrorHandler, notFound } from '../middlewares/globalErrorHandler.js';
import productRouter from '../routes/productsRoute.js';


//db connect
dbConnect();

const app = express();

//pass incoming data - "get rid of Cannot destructure property 'fullName' of 'req.body' as it is undefined" error
app.use(express.json())

//routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/product', productRouter);

app.use(notFound) //-should come before the global Error handler so the next will be the GE handler
//err middleware - call it below routes as it will be a  catch it all block
app.use(globalErrorHandler);

export default app;