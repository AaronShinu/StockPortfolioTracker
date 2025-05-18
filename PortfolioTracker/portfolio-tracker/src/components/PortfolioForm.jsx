import React, { useState } from 'react';

const PortfolioForm = ({ onAddStock }) => {
    const [ticker, setTicker] = useState('');
    const [shares, setShares] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ticker || !shares) return;

        onAddStock(ticker.toUpperCase(), parseFloat(shares));
        setTicker('');
        setShares('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2 justify-content-center">
            <div className="col-md-4">
            <input
                type="text"
                className="form-control"
                placeholder="Stock Ticker (e.g. AAPL)"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
            />
            </div>
            <div className="col-md-3">
            <input
                type="number"
                className="form-control"
                placeholder="Shares"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
            />
            </div>
            <div className="col-md-2 d-grid">
            <button type="submit" className="btn btn-dark w-100">Add Stock</button>
            </div>
        </div>
        </form>
    );
};

export default PortfolioForm;