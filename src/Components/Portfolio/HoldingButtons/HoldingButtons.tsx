import React, { SyntheticEvent } from "react";
import { HoldingGet } from "../../../Models/Holding";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { GoGraph } from "react-icons/go";

type Props = {
  holding: HoldingGet;
  onRemoveHolding: (e: number) => void;
};

const HoldingButtons = ({ holding, onRemoveHolding }: Props) => {
  return (
    <div className="top-0 left-0 absolute inline-flex justify-start rounded-md shadow-sm ">
      <DeletePortfolio
        symbol={holding.stock.symbol}
        className="cursor-pointer px-4 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-tl-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        holdingId={holding.holdingId}
        companyName={holding.stock.companyName}
        onRemoveHolding={onRemoveHolding}
      />
      <button
        data-testid={`portfolio-edit-${holding.stock.symbol}`}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={`Edit ` + holding.stock.companyName}
        data-tooltip-place="top"
        onClick={() => {}}
        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        <CiEdit />
      </button>
      <Link
        data-testid={`portfolio-details-${holding.stock.symbol}`}
        data-tooltip-id="my-tooltip"
        data-tooltip-content=" Details"
        data-tooltip-place="top"
        className="px-4 py-2 text-sm font-normal text-gray-900 bg-white border border-gray-200 rounded-br-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        to={`/company/${holding.stock.symbol}/company-profile`}
      >
        <GoGraph className="mt-1" />
      </Link>
    </div>
  );
};

export default HoldingButtons;
