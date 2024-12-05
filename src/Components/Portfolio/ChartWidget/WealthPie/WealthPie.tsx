import { ChartData } from "chart.js";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { PortfolioGet } from "../../../../Models/Portfolio";
import { displayUserCurrency } from "../../../../Services/AuthService";

type Props = { portfolio: PortfolioGet; colorArray: any };

const WealthPie = ({ portfolio, colorArray }: Props) => {
  const getStockSymbols = (portfolio: PortfolioGet) => {
    let stockSymbols: string[] = [];
    portfolio.holdings.forEach((holding) => {
      if (holding.stock && holding.stock.symbol && holding.units > 0) {
        stockSymbols.push(holding.stock.symbol);
      }
    });
    return stockSymbols;
  };
  function calculateStockValues(portfolio: PortfolioGet) {
    let values: number[] = [];
    portfolio.holdings.forEach((holding) => {
      if (holding.units > 0)
        values.push(holding.units * holding.stock.purchase);
    });
    return values;
  }

  const [portfolioPie, setPortPie] = useState({
    labels: getStockSymbols(portfolio),
    datasets: [
      {
        label: "holdings",
        data: calculateStockValues(portfolio),
        backgroundColor: colorArray,
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    setPortPie({
      labels: getStockSymbols(portfolio),
      datasets: [
        {
          label: "holdings",
          data: calculateStockValues(portfolio),
          backgroundColor: colorArray,
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [portfolio]);

  return (
    <Doughnut
      id="portfolioPie"
      data={portfolioPie!}
      options={{
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (context: any) {
                const index = context.datasetIndex;
                const xIndex = context.dataIndex;
                let value = portfolioPie.datasets[index].data[xIndex];
                return `${displayUserCurrency(value)}`;
              },
            },
          },
        },
      }}
    />
  );
};

export default WealthPie;
