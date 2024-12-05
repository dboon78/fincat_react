import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { HoldingGet, HoldingPut } from "../Models/Holding";
const api = `${process.env.REACT_APP_APIHOST}holding/`;

export const holdingPostAPI = async (
  symbol: string,
  portfolioId: number,
  exchange: string
) => {
  try {
    //console.log("holdingPostAPI", symbol, portfolioId, exchange);
    const data = await axios.post<HoldingGet>(api, {
      symbol: symbol,
      portfolioId: portfolioId,
      isCrypto: exchange === "CRYPTO",
    });
    return data;
  } catch (err) {
    handleError(err);
  }
};
export const holdingGetAPI = async () => {
  try {
    const data = await axios.get<HoldingGet[]>(api);
    return data;
  } catch (err) {
    handleError(err);
  }
};
export const holdingDeleteAPI = async (holdingId: number) => {
  //console.log("holdingDeleteAPI id:", holdingId);
  try {
    const data = await axios.delete(api + holdingId);
    return data;
  } catch (err) {
    handleError(err);
  }
};
export const holdingPutAPI = async (
  holdingId: number,
  units: number | null,
  bookCost: number | null
) => {
  try {
    // console.log(
    //   "holdingPutAPI holdingId",
    //   holdingId,
    //   "units:",
    //   units,
    //   "bookCost:",
    //   bookCost
    // );
    const data = await axios.put<HoldingPut>(api, {
      holdingId: holdingId,
      units: units,
      bookCost: bookCost,
    });
    return data;
  } catch (err) {
    handleError(err);
  }
};
