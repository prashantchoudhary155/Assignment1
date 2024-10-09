const express = require('express');
const connectDB = require('../config/db');
const runCryptoJob = require('../jobs/cryptoJob');
const Crypto = require('../models/Crypto');
const serverless = require('serverless-http');

const app = express();

// Connect to MongoDB
connectDB();

// Start the crypto job
runCryptoJob();

// Function to calculate standard deviation
const calculateStandardDeviation = (prices) => {
    const n = prices.length;
    if (n === 0) return 0;

    const mean = prices.reduce((acc, val) => acc + val, 0) / n;
    const variance = prices.reduce((acc, val) => acc + (val - mean) ** 2, 0) / n;

    return Math.sqrt(variance);
};

// Function to escape special regex characters
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  // API to get standard deviation of the requested cryptocurrency
app.get('/deviation', async (req, res) => {
    const { coin } = req.query;
  
    if (!coin) {
      return res.status(400).json({ error: 'Coin parameter is required' });
    }
  
    try {
      const escapedCoin = escapeRegex(coin);
  
      // Fetch the last 100 records for the requested cryptocurrency
      const records = await Crypto.find({
        name: { $regex: new RegExp(`^${escapedCoin}$`, 'i') },
      })
        .sort({ fetchedAt: -1 }) // Sort by most recent
        .limit(100); // Limit to last 100 records
  
      // If there are no records, return a response indicating that
      if (records.length === 0) {
        return res
          .status(404)
          .json({ error: `No records found for ${coin}` });
      }
  
      // Extract prices
      const prices = records.map((record) => record.priceUsd);
  
      // Calculate the standard deviation
      const stdDeviation = calculateStandardDeviation(prices);
  
      // Return the result
      res.json({ coin, standardDeviation: stdDeviation.toFixed(2) });
    } catch (error) {
      console.error('Error fetching data:', error);
      res
        .status(500)
        .json({ error: 'An error occurred while fetching data' });
    }
  });
  

app.get('/stats', async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin query parameter is required' });
  }

  try {
    // Find the latest data for the requested coin
    const latestData = await Crypto.findOne({ name: { $regex: new RegExp(coin, 'i') } }) // case-insensitive search
      .sort({ fetchedAt: -1 }); // sort by fetchedAt to get the latest

    if (!latestData) {
      return res.status(404).json({ error: 'Coin not found' });
    }

    // Format and send the response
    const response = {
      price: latestData.priceUsd,
      marketCap: latestData.marketCapUsd,
      '24hChange': latestData.change24h,
    };

    return res.json(response);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
module.exports.handler = serverless(app);
