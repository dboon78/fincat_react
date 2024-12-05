import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { HistoryData } from "../../../../Models/Stock";
import {
  displayUserCurrency,
  userData,
} from "../../../../Services/AuthService";
import Spinner from "../../../Spinner/Spinner";
import { PortfolioGet } from "../../../../Models/Portfolio";
import { priceHistory } from "../../../../api";

type Props = {
  portfolio: PortfolioGet;
  colorArray: any;
};

const WealthStackChart = ({ portfolio, colorArray }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [historyDataSets, setHistoryDataSets] = useState<any>({
    labels: [],
    datasets: [],
  });
  const getMonthName = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  };
  const generateXLabels = (numDays: number): string[] => {
    const labels: string[] = [];
    let currentDate = new Date();

    while (labels.length < numDays) {
      if (currentDate.getDate() === 1) {
        labels.push(getMonthName(currentDate)); // Add date string in 'YYYY-MM-DD' format
      } else {
        labels.push(``); // Add null for other days
      }
      currentDate.setDate(currentDate.getDate() - 1);
    }
    // Reverse to start from the earliest date to today
    return labels.reverse();
  };
  const options = () => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        filler: {
          propagate: true,
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (context: any) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                const index = context.datasetIndex;
                const xIndex = context.dataIndex;
                let value = historyDataSets.datasets[index].data[xIndex];
                //console.log("value:", value);
                if (index > 0) {
                  value -= historyDataSets.datasets[index - 1].data[xIndex];
                }
                label += `${displayUserCurrency(value)}`;
              }
              return label;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          ticks: {
            callback: (value: any, index: number, values: any) =>
              xLabels[index] || null,
          },
        },
      },
    };
  };
  const numDays = 90;
  const xLabels: string[] = generateXLabels(numDays);

  const fetchHoldingHistory = async () => {
    if (portfolio == null) return;
    setLoading(true);
    let historyDataset = [];

    let values = Array<number>(90).fill(0);
    const user = userData();
    const exchangeRate =
      user === null || user === undefined ? 1 : user.userCurrency.value;
    for (let i = 0; i < portfolio.holdings.length; i++) {
      let history = await priceHistory(portfolio.holdings[i].stock.id);
      if (typeof history == "string") continue;
      // console.log(
      //   `priceHistory ${portfolio.holdings[i].stock.symbol} `,
      //   history
      // );
      history = history.reverse();

      for (let x = 0; x < history.length; x++) {
        if (portfolio.holdings[i].units > 0) {
          history[x] = history[x] * portfolio.holdings[i].units * exchangeRate;
        } else {
          history[x] = history[x] * exchangeRate;
        }
        values[x] += history[x];
      }
      historyDataset.push({
        label: portfolio.holdings[i].stock.symbol,
        borderColor: "black",
        backgroundColor: colorArray[i],
        borderWidth: 1,
        pointBorderWidth: 1,
        pointRadius: 1,
        fill: {
          target: i == 0 ? "origin" : i - 1,
          above: colorArray[i], // Area will be red above the origin
          below: i == 0 ? colorArray[i] : colorArray[i - 1], // And blue below the origin
        },
        data: [...values],
      });
    }
    const histData = {
      labels: xLabels,
      datasets: historyDataset,
    };
    setHistoryDataSets(histData);

    setLoading(false);
  };
  useEffect(() => {
    fetchHoldingHistory();
  }, [portfolio]);
  return isLoading ? (
    <Spinner isLoading={true} />
  ) : (
    <Line id="wealth" data={historyDataSets} options={options()} />
  );
};

export default WealthStackChart;
