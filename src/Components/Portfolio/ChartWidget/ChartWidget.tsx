// App.js
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import React from "react";
import { PortfolioGet } from "../../../Models/Portfolio";
import { priceHistory } from "../../../api";
import { Doughnut } from "react-chartjs-2";
import { LineElement, PointElement, CategoryScale } from "chart.js";
import "chart.js/auto";
import "./ChartWidget.css";
import { HistoryData } from "../../../Models/Stock";
import WealthStackChart from "./WealthStackChart/WealthStackChart";
import Spinner from "../../Spinner/Spinner";
import { userData } from "../../../Services/AuthService";
import WealthPie from "./WealthPie/WealthPie";
type Props = {
  portfolio: PortfolioGet;
  colorArray: any;
  totalHoldings: number;
};

Chart.register(CategoryScale, LineElement, PointElement);

const ChartWidget = ({ portfolio, colorArray, totalHoldings }: Props) => {
  const [adjustedPortfolio, setAdjustedPortfolio] =
    useState<PortfolioGet | null>(null);

  useEffect(() => {
    const newPort = JSON.parse(JSON.stringify(portfolio));
    newPort.holdings = portfolio.holdings.filter((item) => item.units > 0);
    setAdjustedPortfolio(newPort);
  }, [portfolio]);
  return (
    <div className="relative chart-container container mx-auto mt-5">
      {adjustedPortfolio != null && adjustedPortfolio.holdings.length > 0 ? (
        <>
          {adjustedPortfolio.holdings[0].units > 0 ? (
            <>
              <div className="flex flex-col md:flex-row md:space-x-4 mx-auto">
                <div className="p-4 border-gray-100 border-2 rounded-lg shadow-md mb-4 md:mb-0 md:w-1/2">
                  <WealthPie
                    portfolio={adjustedPortfolio}
                    colorArray={colorArray}
                  />
                </div>

                <div className="relative border-gray-100 border-2 p-4 rounded-lg shadow-md mb-4 md:mb-0 md:w-1/2">
                  <WealthStackChart
                    colorArray={colorArray}
                    portfolio={adjustedPortfolio}
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChartWidget;
