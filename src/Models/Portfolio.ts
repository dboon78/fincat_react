import { HoldingGet } from "./Holding";

export type PortfolioGet = {
  portfolioId: number;
  portfolioName: string;
  holdings: HoldingGet[];
};

export type PortfolioPost = {
  symbol: string;
};

export type PortfolioPut = {
  portfolioId: number;
  portfolioName: string;
};
