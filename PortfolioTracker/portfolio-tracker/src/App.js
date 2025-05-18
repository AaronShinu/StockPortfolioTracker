import React, { useState } from 'react';
import PortfolioForm from './components/PortfolioForm';
import PortfolioChart from './components/PortfolioChart';
import axios from 'axios';
import logo from './assets/logo.svg';
import './App.css';

const calculateGainLoss = (stock) => {
  const priceDiff = parseFloat(stock.price) - parseFloat(stock.initialPrice);
  const gainLoss = (priceDiff * stock.shares).toFixed(2);

  if (priceDiff === 0) return '—';
  return priceDiff > 0 ? `+ $${gainLoss}` : `- $${Math.abs(gainLoss)}`;
};

function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const fetchStockPrice = async (ticker, shares) => {
  const apiKey = 'c1b8037047dc4655838f373ab7855c78';
  const url = `https://api.twelvedata.com/price?symbol=${ticker}&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (!data || data.status === 'error' || !data.price || isNaN(data.price)) {
      alert(`Could not fetch price for ${ticker}.`);
      return;
    }

    const price = parseFloat(data.price);
    const totalValue = (price * shares).toFixed(2);

    const newStock = {
      ticker,
      shares,
      price: price.toFixed(2),
      totalValue,
      initialPrice: price.toFixed(2), 
    };

    setPortfolio((prev) => [...prev, newStock]);
  } catch (error) {
    console.error(`Error fetching price for ${ticker}:`, error);
    alert(`Something went wrong while fetching ${ticker}.`);
  }
};

  const totalPortfolioValue = portfolio.reduce((acc, stock) => {
    return acc + parseFloat(stock.totalValue);
  }, 0).toFixed(2);

  return (
    <div className={`min-vh-100 py-4 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
        <img src={logo} alt="Logo" className="animated-logo" style={{ width: '36px', height: '36px' }} />
        <h2 className="fw-bold m-0">React Stock Portfolio Tracker</h2>
        <button
            onClick={() => setDarkMode(!darkMode)}
            className={`btn btn-sm ${darkMode ? 'btn-light' : 'btn-dark'} ms-3`}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
          <PortfolioForm onAddStock={fetchStockPrice} />
        <div className="row justify-content-center">
                {portfolio.map((stock, index) => (
                  <div key={index} className="col-md-5 col-lg-4 mb-4">
                    <div className={`card shadow-sm border-0 h-100 ${darkMode ? 'bg-secondary text-light' : ''}`}>
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{stock.ticker}</h5>
                        <p><strong>{stock.shares}</strong> shares</p>
                        <p>Price: <strong>${stock.price}</strong></p>
                        <p>Value: <strong>${stock.totalValue}</strong></p>
                        <p>
                          Gain/Loss:
                          <strong className={parseFloat(stock.price) - parseFloat(stock.initialPrice) >= 0 ? 'text-success' : 'text-danger'}>
                            &nbsp;{calculateGainLoss(stock)}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            <div className="text-center my-4">
            <span className={`badge fs-5 ${darkMode ? 'bg-light text-dark' : 'bg-dark text-light'}`}>
              Total Portfolio Value: ${totalPortfolioValue}
            </span>
          </div>
          <PortfolioChart portfolio={portfolio} />
        </div>
      </div>  
  );
}

export default App;
