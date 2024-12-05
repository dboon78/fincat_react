import React, { SyntheticEvent, useEffect, useState } from "react";
import { PortfolioGet } from "../../../Models/Portfolio";

type Props = {
  setShowDialog: React.Dispatch<boolean>;
  onAddToPortfolio: (e: SyntheticEvent) => void;
  portfolios: PortfolioGet[];
  symbol: string;
  exchange: string;
};

const AddPortfolioForm = ({
  setShowDialog,
  onAddToPortfolio,
  portfolios,
  symbol,
  exchange,
}: Props) => {
  const [portolioId, setPortfolioId] = useState(portfolios[0].portfolioId);
  const [newPorfolio, setNewPorfolio] = useState(false);
  const addPorftolioForm = (e: any) => {
    e.preventDefault();
    setShowDialog(false);
    onAddToPortfolio(e);
  };

  useEffect(() => {
    setNewPorfolio(portolioId == -1);
  }, [portolioId]);
  return (
    <form
      onSubmit={(e) => {
        addPorftolioForm(e);
      }}
      className="grid gap-4 mb-4"
    >
      <input type="hidden" name="symbol" value={symbol} />
      <input type="hidden" name="exchange" value={exchange} />
      <input type="hidden" name="portfolioId" value={portolioId} />
      <label
        htmlFor="porfolioId"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Portfolio
      </label>

      <select
        onChange={(e) => {
          setPortfolioId(parseInt(e.target.value));
        }}
        defaultValue={portolioId}
        id="porfolioId"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      >
        {portfolios.map((item: PortfolioGet) => {
          return (
            <option key={item.portfolioId} value={item.portfolioId}>
              {item.portfolioName}
            </option>
          );
        })}
        <option value="-1">Add new</option>
      </select>
      {newPorfolio ? (
        <>
          <label
            htmlFor="newPorftolioName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Portfolio Name
          </label>
          <input
            data-testid={`newPortfolioName`}
            type="text"
            id="newPorftolioName"
            className="w-full bg-gray-50 border border-gray-300 text-gray sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </>
      ) : (
        <></>
      )}

      <div className="flex items-center md:p-5 md:pl-0 border-t mt-0 border-gray-200 rounded-b dark:border-gray-600">
        <button
          data-modal-hide="small-modal"
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
          onClick={() => {
            setShowDialog(false);
          }}
          data-modal-hide="small-modal"
          type="button"
          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddPortfolioForm;
