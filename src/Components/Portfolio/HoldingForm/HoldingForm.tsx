import React, { SyntheticEvent, useState } from "react";
import { HoldingGet } from "../../../Models/Holding";
interface Props {
  holding: HoldingGet;
  setShowDialog: React.Dispatch<boolean>;
  handleUpdateHolding: (e: SyntheticEvent) => void;
  onRemoveHolding: (e: number) => void;
}

const HoldingForm = ({
  setShowDialog,
  holding,
  handleUpdateHolding,
  onRemoveHolding,
}: Props) => {
  const [book, setBookCost] = useState(holding.bookCost);
  const [units, setUnits] = useState(holding.units);
  const holdingSubmit = (e: any) => {
    e.preventDefault();
    // console.log("holdingSubmit", e.target);
    handleUpdateHolding(e);
  };
  return (
    <form onSubmit={holdingSubmit} className="grid gap-4 mb-4">
      <input type="hidden" name="holdingId" value={holding.holdingId} />
      <label
        htmlFor="price"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Book Cost
      </label>
      <input
        data-testid={`holding-book-${holding.stock.symbol}`}
        type="number"
        id="bookCost"
        step="0.01"
        className="w-full bg-gray-50 border border-gray-300 text-gray sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={book}
        onChange={(e) => {
          setBookCost(parseFloat(e.target.value));
        }}
      />
      <label
        htmlFor="price"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Units
      </label>
      <input
        data-testid={`holding-units-${holding.stock.symbol}`}
        type="number"
        id="units"
        step="any"
        value={units}
        onChange={(e) => {
          setUnits(parseFloat(e.target.value));
        }}
        className="bg-gray-50 border border-gray-300 text-gray sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <div className="flex items-center md:p-5 md:pl-0 border-t border-gray-200 rounded-b dark:border-gray-600">
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
        <button
          onClick={() => {
            onRemoveHolding(holding.holdingId);
          }}
          data-modal-hide="popup-modal"
          type="button"
          className="py-2.5 px-5 ms-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center text-center"
        >
          Remove
        </button>
      </div>
    </form>
  );
};

export default HoldingForm;
