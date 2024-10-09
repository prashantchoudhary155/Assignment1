const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: String,
    priceUsd: Number,
    marketCapUsd: Number,
    change24h: Number,
    fetchedAt: { type: Date, default: Date.now }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
