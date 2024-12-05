import React, { SetStateAction, SyntheticEvent } from "react";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import { GiProfit } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import { GoGraph } from "react-icons/go";
import { LuBookOpenCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import { HoldingGet } from "../../../Models/Holding";
import { TbMoneybag } from "react-icons/tb";
import { formatLargeMonetaryNumber } from "../../../Helpers/NumberFormatting";
import DataRow from "../../Table/DataRow/DataRow";
import DataItem from "../../Table/DataItem/DataItem";
import { FaCircleDollarToSlot } from "react-icons/fa6";

interface Props {
  SetEditMode: (e: SetStateAction<boolean>) => void;
  holding: HoldingGet;
  onRemoveHolding: (e: number) => void;
}

const HoldingDisplay = ({ holding, onRemoveHolding, SetEditMode }: Props) => {
  //console.log("HoldingDisplay:", holding);
  return (
    <>
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
          onClick={() => {
            SetEditMode(true);
          }}
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

      <Link
        data-testid={"portfolio-link-" + holding.stock.symbol}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={holding.stock.symbol + " Details"}
        data-tooltip-place="top"
        className="absolute truncate text-left px-2 w-1/2 top-1 right-2 text-xl font-bold my-0 py-0 hover:text-blue-700"
        to={`/company/${holding.stock.symbol}/company-profile`}
      >
        {holding.stock.symbol}
      </Link>
      <div className="space-y-6 mt-8">
        <DataRow isVisible={holding.stock.priceChange != null}>
          <DataItem
            ticker={holding.stock.symbol}
            id="change1D"
            isVisible={true}
            symbol="1D"
            info={holding.stock.priceChange?._1D.toFixed(1) + "%"}
          />
          <DataItem
            ticker={holding.stock.symbol}
            id="change6M"
            isVisible={true}
            symbol="6M"
            info={holding.stock.priceChange?._6M.toFixed(1) + "%"}
          />
        </DataRow>

        <DataRow isVisible={true}>
          <DataItem
            ticker={holding.stock.symbol}
            id="price"
            isVisible={true}
            symbol={<FaCircleDollarToSlot size={22} />}
            info={formatLargeMonetaryNumber(holding.stock.purchase)}
          />
          <DataItem
            ticker={holding.stock.symbol}
            id="units"
            isVisible={holding.units > 0}
            symbol={<TbMoneybag size={22} />}
            info={formatLargeMonetaryNumber(
              holding.stock.purchase * holding.units
            )}
          />
        </DataRow>

        <DataRow isVisible={holding.bookCost != 0}>
          <DataItem
            ticker={holding.stock.symbol}
            id="book"
            isVisible={true}
            symbol={<LuBookOpenCheck size={22} />}
            info={formatLargeMonetaryNumber(holding.bookCost)}
          />
          <DataItem
            ticker={holding.stock.symbol}
            id="gains"
            isVisible={holding.units > 0 && holding.bookCost > 0}
            symbol={<GiProfit size={22} />}
            info={formatLargeMonetaryNumber(
              (holding.stock.purchase - holding.bookCost) * holding.units
            )}
          />
        </DataRow>
      </div>
    </>
  );
};

export default HoldingDisplay;
