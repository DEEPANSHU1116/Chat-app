import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app, server } from './SocketIO/server.js';
import otpRoute from './routes/otp.route.js';

dotenv.config();

app.use(express.json());

app.use(cookieParser());

app.use(cors());

const PORT = process.env.PORT || 3001
const URI = process.env.MongoDB_URI;


try{
    mongoose.connect(URI);
    console.log('connected to MongoDB');
}catch(error){
    console.log(error);
}

app.use("/api/user",userRoute);
app.use("/api/message",messageRoute);
app.use("/api/otp", otpRoute);

// ADDED THIS NEW ROUTE
app.get('/', (req, res) => {
  res.send('Chat app BackEnd is running!')
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
