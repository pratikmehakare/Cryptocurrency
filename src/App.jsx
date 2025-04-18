import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const API_BASE = process.env.REACT_APP_API_BASE;

const coins = [
  { id: 'bitcoin', name: 'Bitcoin' },
  { id: 'ethereum', name: 'Ethereum' },
  { id: 'dogecoin', name: 'Dogecoin' },
];

export default function App() {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [days, setDays] = useState(7);
  const [marketData, setMarketData] = useState(null);
  const [gainer, setGainer] = useState(null);
  const [loser, setLoser] = useState(null);

  useEffect(() => {
    fetchMarketChart();
    fetchGainer();
    fetchLoser();
  }, [selectedCoin, days]);

  const fetchMarketChart = async () => {
    const res = await axios.get(`${API_BASE}/coins/market_chart/${selectedCoin}`, {
      params: { vs_currency: 'usd', days },
    });
    setMarketData(res.data);
  };

  const fetchGainer = async () => {
    const res = await axios.get(`${API_BASE}/coins/top_gainer`);
    setGainer(res.data);
  };

  const fetchLoser = async () => {
    const res = await axios.get(`${API_BASE}/coins/top_loser`);
    setLoser(res.data);
  };

  const priceChartData = {
    labels: marketData?.prices.map(p => new Date(p[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Price (USD)',
        data: marketData?.prices.map(p => p[1]),
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const volumeChartData = {
    labels: marketData?.total_volumes.map(p => new Date(p[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Volume',
        data: marketData?.total_volumes.map(p => p[1]),
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: 'gray',
      },
    ],
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Crypto Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <select
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        >
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>{coin.name}</option>
          ))}
        </select>

        <div className="flex gap-2">
          {[7, 14, 30].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-4 py-2 rounded ${days === d ? 'bg-gray-400 text-white' : 'bg-white border'}`}
            >
              {d} Days
            </button>
          ))}
        </div>
      </div>

      {marketData && (
        <div className="bg-white rounded shadow p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">{selectedCoin.toUpperCase()} - Price Chart</h2>
          <Line data={priceChartData} />

          <h3 className="mt-6 text-lg font-semibold">Trading Volume</h3>
          <Bar data={volumeChartData} />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {gainer && (
          <div className="bg-white border-l-4 border-green-500 rounded shadow p-4">
            <h3 className="text-lg font-bold text-green-600">Top Gainer</h3>
            <p><strong>{gainer.name} ({gainer.symbol.toUpperCase()})</strong></p>
            <p>Price: ${gainer.current_price}</p>
            <p>24h Change: <span className="text-green-600">{gainer.price_change_percentage_24h.toFixed(2)}%</span></p>
          </div>
        )}

        {loser && (
          <div className="bg-white border-l-4 border-red-500 rounded shadow p-4">
            <h3 className="text-lg font-bold text-red-600">Top Loser</h3>
            <p><strong>{loser.name} ({loser.symbol.toUpperCase()})</strong></p>
            <p>Price: ${loser.current_price}</p>
            <p>24h Change: <span className="text-red-600">{loser.price_change_percentage_24h.toFixed(2)}%</span></p>
          </div>
        )}
      </div>
    </div>
  );
}
