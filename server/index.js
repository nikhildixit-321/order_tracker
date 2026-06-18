require('dotenv').config(); 
const express  = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

// Configure Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// Socket.io Connection & Simulation Logic
io.on('connection', (socket) => {
    console.log('New connection for tracking:', socket.id);

    // Initial Location (Delivery Boy's Starting Point)
    let currentLat = 28.6139; // e.g. New Delhi
    let currentLng = 77.2090; 
    
    // Simulate Delivery Boy Movement every 2 seconds
    const interval = setInterval(() => {
        // Gadi ko aage badha rahe hain (changing coordinates slightly)
        currentLat += 0.0001;
        currentLng += 0.0001;

        // Frontend ko naya location bhej rahe hain
        socket.emit('location-update', { lat: currentLat, lng: currentLng });
    }, 2000);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        clearInterval(interval); // User ke jaane par movement roko
    });
});

// Server Started 
const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});