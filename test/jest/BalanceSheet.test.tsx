import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BalanceSheet from "../../src/Components/BalanceSheet/BalanceSheet";
import { useOutletContext } from "react-router-dom";
import { getBalanceSheet } from "../../src/api";
import { config } from "../../src/Components/BalanceSheet/BalanceSheetTableConfig";

// Mock the `useOutletContext` and `getBalanceSheet` functions
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: jest.fn(),
}));

jest.mock("../../api", () => ({
  getBalanceSheet: jest.fn(),
}));

describe("BalanceSheet Component", () => {
  const mockTicker = "AAPL";
  const mockBalanceSheetData = {
    date: "2023-12-31",
    symbol: "TSLA",
    reportedCurrency: "USD",
    cik: "0001318605",
    fillingDate: "2024-01-29",
    acceptedDate: "2024-01-26 21:00:20",
    calendarYear: "2023",
    period: "FY",
    cashAndCashEquivalents: 16398000000,
    shortTermInvestments: 12696000000,
    cashAndShortTermInvestments: 29094000000,
    netReceivables: 3508000000,
    inventory: 13626000000,
    otherCurrentAssets: 543000000,
    totalCurrentAssets: 49616000000,
    propertyPlantEquipmentNet: 45123000000,
    goodwill: 253000000,
    intangibleAssets: 178000000,
    goodwillAndIntangibleAssets: 431000000,
    longTermInvestments: 514000000,
    taxAssets: 6733000000,
    otherNonCurrentAssets: 4201000000,
    totalNonCurrentAssets: 57002000000,
    otherAssets: 0,
    totalAssets: 106618000000,
    accountPayables: 14431000000,
    shortTermDebt: 1975000000,
    taxPayables: 1204000000,
    deferredRevenue: 3740000000,
    otherCurrentLiabilities: 8602000000,
    totalCurrentLiabilities: 28748000000,
    longTermDebt: 2682000000,
    deferredRevenueNonCurrent: 3251000000,
    deferredTaxLiabilitiesNonCurrent: 3846000000,
    otherNonCurrentLiabilities: 4482000000,
    totalNonCurrentLiabilities: 14261000000,
    otherLiabilities: 0,
    capitalLeaseObligations: 4916000000,
    totalLiabilities: 43009000000,
    preferredStock: 0,
    commonStock: 3000000,
    retainedEarnings: 27882000000,
    accumulatedOtherComprehensiveIncomeLoss: -143000000,
    othertotalStockholdersEquity: 34892000000,
    totalStockholdersEquity: 62634000000,
    totalEquity: 63609000000,
    totalLiabilitiesAndStockholdersEquity: 106618000000,
    minorityInterest: 975000000,
    totalLiabilitiesAndTotalEquity: 106618000000,
    totalInvestments: 12696000000,
    totalDebt: 5230000000,
    netDebt: -11168000000,
    link: "https://www.sec.gov/Archives/edgar/data/1318605/000162828024002390/0001628280-24-002390-index.htm",
    finalLink:
      "https://www.sec.gov/Archives/edgar/data/1318605/000162828024002390/tsla-20231231.htm",
  };

  beforeEach(() => {
    // Mock the `useOutletContext` function to return the ticker value
    (useOutletContext as jest.Mock).mockReturnValue(mockTicker);

    // Mock the `getBalanceSheet` function to return mock data
    (getBalanceSheet as jest.Mock).mockResolvedValue({
      data: [mockBalanceSheetData],
    });
  });

  it("renders loading text initially", () => {
    render(<BalanceSheet />);
    expect(screen.getByText("loading")).toBeInTheDocument();
  });

  it("renders each balance sheet item from the config after loading", async () => {
    render(<BalanceSheet />);

    // Wait for the async data to load
    await waitFor(() => {
      config.forEach((item) => {
        // Check that each label is in the document
        if (typeof item.label === "string") {
          let thisLabel = screen.getByText(item.label);
          expect(thisLabel).toBeInTheDocument();
          // Find the parent `<li>` element containing the label
          const listItem = thisLabel.closest("li");
          expect(listItem).toBeInTheDocument();

          const renderedValue = item.render(mockBalanceSheetData);
          // // Check that the rendered value is in the document
          const valueContainer = listItem?.querySelector(".inline-flex");
          expect(valueContainer).toHaveTextContent(renderedValue.toString());
        }
      });
    });
  });
});
