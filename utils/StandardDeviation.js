// Function to calculate standard deviation
const calculateStandardDeviation = (prices) => {
    const n = prices.length;
    if (n === 0) return 0;

    const mean = prices.reduce((acc, val) => acc + val, 0) / n;
    const variance = prices.reduce((acc, val) => acc + (val - mean) ** 2, 0) / n;

    return Math.sqrt(variance);
};

module.exports = calculateStandardDeviation
