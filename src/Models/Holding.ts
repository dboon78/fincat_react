import { StockGet } from "./Stock";
export type HoldingGet = {
  holdingId: number;
  bookCost: number;
  units: number;
  stock: StockGet;
};

export type HoldingPost = {
  symbol: string;
  portfolioId: number;
  isCrypto: boolean;
};
export type HoldingPut = {
  holdingId: number;
  bookCost: number;
  units: number;
};

export type HoldingPrice = {
  s: string;
  p: number;
};
