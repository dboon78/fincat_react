import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { PortfolioGet, PortfolioPost, PortfolioPut } from "../Models/Portfolio";
import { HoldingPrice } from "../Models/Holding";
const api = `${process.env.REACT_APP_APIHOST}portfolio`;

export const portfolioPostAPI = async (name: string) => {
  try {
    console.log(`portfolioPostAPI: ${name}`);
    const data = await axios.post<PortfolioGet>(api + `?name=${name}`);
    return data;
  } catch (err) {
    handleError(err);
  }
};
export const portfolioPriceList = async () => {
  try {
    const data = await axios.get<HoldingPrice[]>(api + "/price-list");
    return data;
  } catch (err) {
    handleError(err);
  }
};

export const portfolioGetAPI = async () => {
  try {
    const data = await axios.get<PortfolioGet[]>(api);
    return data;
  } catch (err) {
    handleError(err);
  }
};
export const portfolioDeleteAPI = async (id: number) => {
  try {
    const data = await axios.delete<PortfolioPost>(api + `?id=${id}`);
    return data;
  } catch (err) {
    handleError(err);
  }
};

export const portfolioPutAPI = async (
  portfolioId: number,
  portfolioName: string
) => {
  try {
    console.log("portfolioPutAPI", portfolioName, portfolioId);
    const data = await axios.put<PortfolioPut>(api, {
      portfolioId: portfolioId,
      portfolioName: portfolioName,
    });
    return data;
  } catch (err) {
    handleError(err);
  }
};
