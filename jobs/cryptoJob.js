const cron = require('node-cron');
const fetchCryptoData = require('../services/fetchCryptoData');
const storeCryptoData = require('../services/storeCryptoData');

const runCryptoJob = () => {
    // Run every 2 hours (0th minute of every second hour)
    cron.schedule('0 */2 * * *', async () => {
        console.log('Fetching and storing crypto data...');

        try {
            const cryptoData = await fetchCryptoData();
            await storeCryptoData(cryptoData);
        } catch (error) {
            console.error('Failed to run crypto job:', error);
        }
    });
};

module.exports = runCryptoJob;
