import { CommentGet } from "./Comment";
export type HistoryData = {
  symbol: string;
  data: number[];
};
export type StockGet = {
  id: number;
  symbol: string;
  companyName: string;
  purchase: number;
  lastDiv: number;
  industry: string;
  marketCap: number;
  priceChange: PriceChangeGet;
  exchange: ExchangeGet;
  comments: CommentGet[];
};
export type ExchangeGet = {
  exchangeName: string;
  openingHour: string;
  closingHour: string;
};
export type PriceChangeGet = {
  _1D: number;
  _5D: number;
  _1M: number;
  _3M: number;
  _6M: number;
  ytd: number;
  _1Y: number;
  _3Y: number;
  _5Y: number;
  _10Y: number;
  max: number;
};
