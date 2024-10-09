const axios = require('axios');

const fetchCryptoData = async () => {
    const coinIds = ['bitcoin', 'matic-network', 'ethereum'];
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

    try {
        const response = await axios.get(url);
        const { bitcoin, 'matic-network': matic, ethereum } = response.data;

        return [
            { name: 'Bitcoin', priceUsd: bitcoin.usd, marketCapUsd: bitcoin.usd_market_cap, change24h: bitcoin.usd_24h_change },
            { name: 'Matic', priceUsd: matic.usd, marketCapUsd: matic.usd_market_cap, change24h: matic.usd_24h_change },
            { name: 'Ethereum', priceUsd: ethereum.usd, marketCapUsd: ethereum.usd_market_cap, change24h: ethereum.usd_24h_change }
        ];
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        throw error;
    }
};

module.exports = fetchCryptoData;
