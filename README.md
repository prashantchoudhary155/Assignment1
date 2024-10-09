# Cryptocurrency API Assignment

## Overview

This project is an Express.js-based server application that provides API endpoints for retrieving cryptocurrency deviation and statistics data for Bitcoin, Ethereum, and Matic. It serves as a foundation for building a more comprehensive cryptocurrency data service.

## Features

- RESTful API for cryptocurrency data.
- Supports multiple cryptocurrencies (Bitcoin, Ethereum, Matic).
- Displays user-friendly messages for available routes.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js to build APIs.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Ensure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: Node package manager comes with Node.js.

## Setup Instructions

Follow these steps to set up and run the application:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Install dependencies**:
   npm install

3. **Start the server**:
   node api/index.js


## API Endpoints
The following API endpoints are available:

## GET /deviation?coin=<coin-name>:
Description: Retrieves the deviation data for the specified cryptocurrency.
Parameters:
coin: The cryptocurrency for which to fetch the deviation data. Acceptable values:
bitcoin
ethereum
matic

## GET /stats?coin=<coin-name>:
Description: Retrieves statistics for the specified cryptocurrency.
Parameters:
coin: The cryptocurrency for which to fetch the statistics. Acceptable values:
bitcoin
ethereum
matic
  
