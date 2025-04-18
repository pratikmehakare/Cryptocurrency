const express = require('express');
const axios = require('axios');
const cors = require('cors');
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;

app.use(cors());

// Get market chart data for a coin
app.get('/api/coins/market_chart/:id', async (req, res) => {
  const { id } = req.params;
  const { vs_currency = 'usd', days = '7' } = req.query;
  try {
    const { data } = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
      params: { vs_currency, days },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market chart data.' });
  }
});

// Get top gainer
app.get('/api/coins/top_gainer', async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'price_change_percentage_24h_desc',
        per_page: 1,
        page: 1,
      },
    });
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top gainer.' });
  }
});

// Get top loser
app.get('/api/coins/top_loser', async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'price_change_percentage_24h_asc',
        per_page: 1,
        page: 1,
      },
    });
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top loser.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
