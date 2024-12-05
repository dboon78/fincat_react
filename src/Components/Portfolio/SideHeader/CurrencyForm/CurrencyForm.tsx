import React from "react";
import { useAuth } from "../../../../Context/useAuth";

type Props = {
  setShowDialog: React.Dispatch<boolean>;
  currencyCode: string;
  currencies: string[];
  onComplete: () => void;
};

const CurrencyForm = ({
  setShowDialog,
  currencyCode,
  currencies,
  onComplete,
}: Props) => {
  const { changeSettings } = useAuth();
  const changeCurrencyForm = async (e: any) => {
    e.preventDefault();
    await changeSettings(e.target[0].value);
    onComplete();
    setShowDialog(false);
  };

  return (
    <form
      onSubmit={(e) => {
        changeCurrencyForm(e);
      }}
      className="grid gap-4 mb-4"
    >
      <label
        htmlFor="porfolioId"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Currency:
      </label>

      <select
        defaultValue={currencyCode}
        id="currencyCode"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      >
        {currencies.map((item: string) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>

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

export default CurrencyForm;
