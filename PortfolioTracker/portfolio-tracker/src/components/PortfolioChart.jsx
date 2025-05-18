import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioChart = ({ portfolio }) => {
  const data = {
    labels: portfolio.map((stock) => stock.ticker),
    datasets: [
      {
        label: 'Portfolio Breakdown',
        data: portfolio.map((stock) => parseFloat(stock.totalValue)),
        backgroundColor: [
          '#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#fd7e14',
          '#28a745', '#20c997', '#17a2b8', '#ffc107', '#dc3545'
        ],
        borderWidth: 1,
            },
        ],
    };
    return (
        <div className='card shadow-sm border-0 p-3 mb-5'>
            <h5 className=' text-center mb-3'>Portfolio Breakdown</h5>
            <Pie data={data}/>
        </div>
    );
};

export default PortfolioChart;