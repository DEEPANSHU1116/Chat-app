import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app, server } from './SocketIO/server.js';
import otpRoute from './routes/otp.route.js';
import path from 'path';
import { fileURLToPath } from 'url';


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


// Required if you're using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
