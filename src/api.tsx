import axios from "axios";
import {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyCompData,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
  CompanyTenK,
} from "./company";

// const apiurl = (endpoint: string) => {
//   console.log("endpoint:", endpoint.indexOf("?"));
//   if (endpoint.indexOf("?") !== -1) {
//     //assume it ends with & because it has a ?
//     return `https://financialmodelingprep.com/api/v3/${endpoint}&apikey=${process.env.REACT_APP_FINAPI_KEY}`;
//   } else {
//     return `https://financialmodelingprep.com/api/v3/${endpoint}?apikey=${process.env.REACT_APP_FINAPI_KEY}`;
//   }
// };
const apiEndpoint = (endpoint: string) =>
  `${api}relay?endpoint=${encodeURIComponent(endpoint)}`;
interface SearchResponse {
  data: CompanySearch[];
}

const api = `${process.env.REACT_APP_APIHOST}fmp/`;

export const fetchCurrencies = async () => {
  try {
    let url = `${process.env.REACT_APP_APIHOST}account/currency-list`;
    const data = await axios.get<string[]>(url);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      return error.message;
    } else {
      console.log("unexpected error:", error);
      return "An unexpected error has occured";
    }
  }
};
export const priceHistory = async (id: number) => {
  try {
    let url = `${process.env.REACT_APP_APIHOST}stock/history/${id}?period=1M`;
    //console.log(`${url} history`);
    const data = await axios.get<number[]>(url);
    //console.log(`data= `, data.data);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      return error.message;
    } else {
      console.log("unexpected error:", error);
      return "An unexpected error has occured";
    }
  }
};

export const searchCompanies = async (query: string) => {
  try {
    let url = `${process.env.REACT_APP_APIHOST}stock/search?query=${query}`;
    console.log(`${url} search`);
    const data = await axios.get<SearchResponse>(url);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      return error.message;
    } else {
      console.log("unexpected error:", error);
      return "An unexpected error has occured";
    }
  }
};

export const stockHistory = async (id: number) => {
  try {
    let url = `${process.env.REACT_APP_APIHOST}stock/history/${id}?period=1Y`;
    console.log(`${url} history`);
    const data = await axios.get<number[]>(url);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error message:", error.message);
      return error.message;
    } else {
      console.log("unexpected error", error);
      return "An unexpected error has occured";
    }
  }
};
export const getCompanyProfile = async (query: string) => {
  try {
    const data = await axios.get<CompanyProfile[]>(
      apiEndpoint(`profile/${query}`)
    );
    return data;
  } catch (error: any) {
    console.log("error msg: " + error.message);
  }
};

export const getKeyMetrics = async (query: string) => {
  try {
    const data = await axios.get<CompanyKeyMetrics[]>(
      apiEndpoint(`key-metrics-ttm/${query}`)
    );
    return data;
  } catch (error: any) {
    console.log("error message: " + error.message);
  }
};
export const getIncomeStatement = async (query: string) => {
  try {
    const data = await axios.get<CompanyIncomeStatement[]>(
      apiEndpoint(`income-statement/${query}?limit=40`)
    );
    return data;
  } catch (error: any) {
    console.log("error message: " + error.message);
  }
};
export const getBalanceSheet = async (query: string) => {
  try {
    const data = await axios.get<CompanyBalanceSheet[]>(
      apiEndpoint(`balance-sheet-statement/${query}?limit=40`)
    );
    return data;
  } catch (error: any) {
    console.log("error message: " + error.message);
  }
};
export const getCashFlowStatement = async (query: string) => {
  try {
    const data = await axios.get<CompanyCashFlow[]>(
      apiEndpoint(`cash-flow-statement/${query}?limit=40`)
    );
    return data;
  } catch (error: any) {
    console.log("error message: " + error.message);
  }
};
export const getCompData = async (query: string) => {
  try {
    const data = await axios.get<CompanyCompData[]>(
      apiEndpoint(`stock-peers/${query}?limit=40`)
    );
    return data;
  } catch (error: any) {
    console.log("error message: " + error.message);
  }
};
export const getTenK = async (query: string) => {
  try {
    const data = await axios.get<CompanyTenK[]>(
      apiEndpoint(`sec_filings/${query}?type=10-k&page=0`)
    );
    return data;
  } catch (error: any) {
    console.log("error message: " + error.message);
  }
};
