const express = require('express');
const connectDB = require('../config/db');
const runCryptoJob = require('../jobs/cryptoJob');
const Crypto = require('../models/Crypto');
const calculateStandardDeviation = require('../utils/StandardDeviation');

// const serverless = require('serverless-http');

const app = express();

// Connect to MongoDB
connectDB();

// Start the crypto job
runCryptoJob();

app.get('/', async (req, res) => {
  try {
    res.send("Hello, the assignment is done. You can check the following routes:\n" +
             "1. /deviation?coin=bitcoin\n" +
             "2. /deviation?coin=ethereum\n" +
             "3. /deviation?coin=matic\n" +
             "4. /stats?coin=bitcoin\n" +
             "5. /stats?coin=ethereum\n" +
             "6. /stats?coin=matic");
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});


  
// API to get standard deviation of the requested cryptocurrency
app.get('/deviation', async (req, res) => {
    const { coin } = req.query;
    
  
    if (!coin) {
      return res.status(400).json({ error: 'Coin parameter is required' });
    }
  
    try {
      
      const records = await Crypto.find({
        name: { $regex: new RegExp(`^${coin}$`, 'i') },
      })
        .sort({ fetchedAt: -1 }) 
        .limit(100); 
  
      
      if (records.length === 0) {
        return res
          .status(404)
          .json({ error: `No records found for ${coin}` });
      }
  
     
      const prices = records.map((record) => record.priceUsd);
  
      const stdDeviation = calculateStandardDeviation(prices);
  
      
      res.json({ coin, standardDeviation: stdDeviation.toFixed(2) });
    } catch (error) {
      console.error('Error fetching data:', error);
      res
        .status(500)
        .json({ error: 'An error occurred while fetching data' });
    }
  });
  
// API to get stats of the requested cryptocurrency
app.get('/stats', async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin query parameter is required' });
  }

  try {
    
    const latestData = await Crypto.findOne({ name: { $regex: new RegExp(coin, 'i') } }) 
      .sort({ fetchedAt: -1 }); 

    if (!latestData) {
      return res.status(404).json({ error: 'Coin not found' });
    }

    
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


