const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Keep track of the database connection status
let isConnected;

const connectDB = async () => {
    // Check if we have a connection to the database already
    if (isConnected) {
        // If we are connected, return immediately
        return;
    }

    // Check the existing mongoose connection status
    if (mongoose.connection.readyState) {
        // If mongoose is already connected or connecting, set isConnected and return
        isConnected = mongoose.connection.readyState;
        return;
    }

    try {
        // Create a new database connection
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = db.connections[0].readyState;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
