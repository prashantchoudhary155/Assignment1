const Crypto = require('../models/Crypto'); // Use a relative path

const storeCryptoData = async (cryptoData) => {
    try {
        for (const data of cryptoData) {
            const newCrypto = new Crypto(data);
            await newCrypto.save();
        }
        console.log('Crypto data saved successfully!');
    } catch (error) {
        console.error('Error saving crypto data:', error);
    }
};

module.exports = storeCryptoData;
