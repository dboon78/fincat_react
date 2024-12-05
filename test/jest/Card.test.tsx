import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../../src/Components/Card/Card";
import { CompanySearch } from "../../src/company";
// Mock the navigate function from react-router-dom
const portfolioValue = [
  {
    portfolioId: 1,
    portfolioName: "Default",
    holdings: [
      {
        holdingId: 1,
        stock: {
          id: 1,
          symbol: "TSLA",
          companyName: "Tesla, Inc.",
          purchase: 257.55,
          lastDiv: 0,
          industry: "Auto - Manufacturers",
          marketCap: 826750953000,
          priceChange: {
            _1D: -0.7591,
            _5D: 0.601539,
            _1M: -1.55945,
            _3M: 15.69041,
            _6M: 40.5227,
            ytd: 3.67523,
            _1Y: 30.49757,
            _3Y: -36.0696,
            _5Y: 1126.42857,
            _10Y: 1518.79321,
            max: 16098.11321,
          },
          exchange: {
            exchangeName: "NASDAQ Global Market",
            openingHour: "2024-10-30T00:00:00-04:00",
            closingHour: "2024-10-30T00:00:00-04:00",
          },
          comments: [],
        },
        bookCost: 0,
        units: 0,
      },
      {
        holdingId: 2,
        stock: {
          id: 2,
          symbol: "BTCUSD",
          companyName: "Bitcoin USD",
          purchase: 72406.88,
          lastDiv: 0,
          industry: "",
          marketCap: 1431820419964,
          comments: [],
          priceChange: {
            _1D: -0.41007,
            _5D: 6.23949,
            _1M: 14.3887,
            _3M: 9.43,
            _6M: 19.44403,
            ytd: 63.74537,
            _1Y: 109.92034,
            _3Y: 16.9925,
            _5Y: 690.11353,
            _10Y: 20869.71723,
            max: 31812.49365,
          },
          exchange: {
            exchangeName: "CCC",
            openingHour: "2024-10-30T00:00:00-04:00",
            closingHour: "2024-10-30T00:00:00-04:00",
          },
        },
        bookCost: 0,
        units: 0,
      },
    ],
  },
];
const tableConfig = [
  {
    label: "Ticker",
    render: (searchItem: CompanySearch) => searchItem.symbol,
  },
  {
    label: "Name",
    render: (searchItem: CompanySearch) => searchItem.name,
  },
  {
    label: "Currency",
    render: (searchItem: CompanySearch) => searchItem.currency,
  },
  {
    label: "Exchange",
    render: (searchItem: CompanySearch) => searchItem.exchangeShortName,
  },
];
const searchResult1 = {
  symbol: "TSLA",
  name: "Tesla, Inc.",
  currency: "USD",
  stockExchange: "NASDAQ Global Select",
  exchangeShortName: "NASDAQ",
};

const searchResult2 = {
  symbol: "TSLQ",
  name: "AXS TSLA Bear Daily ETF",
  currency: "USD",
  stockExchange: "NASDAQ Global Market",
  exchangeShortName: "NASDAQ",
};
describe("Card tests", () => {
  test("render search item with holding", () => {
    render(
      <Card
        key={"asdf"}
        portfolioValues={portfolioValue}
        id={"TSLA"}
        searchResult={searchResult1}
        config={tableConfig}
        onAddToHolding={function (e: React.SyntheticEvent): void {
          throw new Error("Function not implemented.");
        }}
        onRemoveHolding={function (e: React.SyntheticEvent): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    const textElement = screen.getByText(/Tesla, Inc./i);
    expect(textElement).toBeInTheDocument();
    const deleteElement = screen.getByTestId("delete-portfolio-1");
    expect(deleteElement).toBeInTheDocument();
    // const addElement = screen.queryAllByTestId("addto-portfolio-TSLA");
    // expect(addElement).toBeNull();
  });

  test("render search item with no holding", () => {
    render(
      <Card
        key={"asdf"}
        portfolioValues={portfolioValue}
        id={"TSLQ"}
        searchResult={searchResult2}
        config={tableConfig}
        onAddToHolding={function (e: React.SyntheticEvent): void {
          throw new Error("Function not implemented.");
        }}
        onRemoveHolding={function (e: React.SyntheticEvent): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    const textElement = screen.getByText(/AXS TSLA Bear Daily ETF/i);
    expect(textElement).toBeInTheDocument();
    const deleteElement = screen.getByTestId("addto-portfolio-TSLQ");
    expect(deleteElement).toBeInTheDocument();
    // const addElement = screen.queryAllByTestId("addto-portfolio-TSLA");
    // expect(addElement).toBeNull();
  });
});
