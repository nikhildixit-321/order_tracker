require('dotenv').config(); 
const express  = require('express');
const path = require('path');
const { Pool } = require('pg');
const { PrismaPg } = require("@prisma/adapter-pg"); 
const { PrismaClient } = require("./generated/prisma_client"); 
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Setup Prisma with pg adapter
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
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

// Store active intervals to prevent memory leaks
const activeSimulations = {};

// API Route to Create Order
app.post('/api/orders', async  (req, res) => {
    // Generate a random order ID
    const orderId = Math.floor(Math.random() * 1000000).toString();
    
    // Save order to PostgreSQL via Prisma
    const { product, deliveryLocation: dest } = req.body;
    await prisma.order.create({
        data: {
            id: orderId,
            productId: product.id,
            productTitle: product.title,
            productPrice: product.price,
            productThumbnail: product.thumbnail || null,
            deliveryLat: dest.lat,
            deliveryLng: dest.lng,
            status: 'out_for_delivery'
        }
    });
    console.log(`Order saved to DB: ${orderId}`);
    const endLat = dest ? dest.lat : 28.6150;
    const endLng = dest ? dest.lng : 77.2100;

    // Start simulation for this order
    // Default starting point (Restaurant)
    const startLat = 28.6100; 
    const startLng = 77.2000; 

    // Move in 30 steps
    const totalSteps = 30;
    let currentStep = 0;

    const latStep = (endLat - startLat) / totalSteps;
    const lngStep = (endLng - startLng) / totalSteps;

    let currentLat = startLat;
    let currentLng = startLng;

    activeSimulations[orderId] = setInterval(() => {
        currentLat += latStep;
        currentLng += lngStep;
        currentStep++;

        // Emit only to users in this specific order's room
        io.to(`order_${orderId}`).emit('location-update', { lat: currentLat, lng: currentLng });

        if (currentStep >= totalSteps) {
            clearInterval(activeSimulations[orderId]);
            delete activeSimulations[orderId];
            io.to(`order_${orderId}`).emit('order-delivered', { message: 'Order has been delivered!' });
        }
    }, 1500); // Update every 1.5 seconds

    return res.json({ success: true, orderId, restaurantLocation: { lat: startLat, lng: startLng } });
});

// Socket.io Connection & Simulation Logic
io.on('connection', (socket) => {
    console.log('New connection for tracking:', socket.id);

    // Join a specific order tracking room
    socket.on('join-tracking', (orderId) => {
        socket.join(`order_${orderId}`);
        console.log(`Socket ${socket.id} joined tracking room: order_${orderId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Server Started 
const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});