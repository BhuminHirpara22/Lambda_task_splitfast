import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import body_parser from 'body-parser';
import setupSocketRoutes from "./routes/GroupRoutes.js";
import cors from 'cors';

const app = express();
const server = http.createServer(app);

// Setting up Socket.IO server with CORS configuration
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"  // Allowing requests from the frontend running on localhost:3000
    }
});

// Attaching the socket instance to the app
app.set('socket', io);

// Middleware setup
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(body_parser.urlencoded({ extended: true }));  // Parsing URL-encoded bodies
app.use(body_parser.json());  // Parsing JSON bodies

// Connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/datadb")
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error.stack));

// Setup Socket.IO routes
setupSocketRoutes(io);

// Start the server on port 8080
server.listen(8080, () => {
    console.log('Socket.IO server is running on http://localhost:8080');
});