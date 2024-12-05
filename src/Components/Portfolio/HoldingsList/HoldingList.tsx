import React, { SyntheticEvent, useEffect, useState } from "react";
import { PortfolioGet } from "../../../Models/Portfolio";
// import { formatLargeMonetaryNumber } from "../../../Helpers/NumberFormatting";
import "./HoldingList.css";
import { holdingListConfig } from "./HoldingListTable";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import GenericTable from "../../Table/GenericTable/GenericTable";
import { MdOutlineModeEdit } from "react-icons/md";
import { ModalContent } from "../../Generics/CustomModal/ModelContent/ModalContent";
import HoldingForm from "../HoldingForm/HoldingForm";
import fincat from "./img/FinCatLogo-black.jpg";
import {
  convertToBaseCurrency,
  convertToUserCurrency,
  getUserCurrency,
} from "../../../Services/AuthService";
// import {springmodal}
interface Props {
  portfolioValue: PortfolioGet;
  onRemoveHolding: (e: number) => void;
  handleUpdateHolding: (e: SyntheticEvent) => void;
  setModalContent: React.Dispatch<React.SetStateAction<ModalContent | null>>;
  setShowDialog: React.Dispatch<boolean>;
  colorArray: string[];
}

const HoldingList = ({
  colorArray,
  portfolioValue,
  onRemoveHolding,
  handleUpdateHolding,
  setModalContent,
  setShowDialog,
}: Props) => {
  const [portfolioTotal, setPortfolioValue] = useState<any>(0);
  // console.log(portfolioValue);
  const onEditHolding = (e: any) => {
    const index = parseInt(e.currentTarget.getAttribute("data-index"), 10);
    const holding = portfolioValue.holdings[index];

    setModalContent({
      content: (
        <>
          <HoldingForm
            onRemoveHolding={onRemoveHolding}
            holding={holding}
            setShowDialog={setShowDialog}
            handleUpdateHolding={handleUpdateHolding}
          />
        </>
      ),
      title: `Edit ${holding.stock.companyName} Holding`,
    });
  };

  useEffect(() => {
    const total = portfolioValue.holdings.reduce(
      (acc, item) => acc + item.stock.purchase * item.units,
      0
    );
    setPortfolioValue(total);
  }, [portfolioValue]);
  return (
    <>
      {portfolioValue.holdings.length > 0 ? (
        <GenericTable
          colorArray={colorArray}
          callbackIcon={<MdOutlineModeEdit />}
          callback={onEditHolding}
          config={holdingListConfig}
          results={portfolioValue.holdings}
          includeHeader={true}
        />
      ) : (
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                This portfolio is empty
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                To find stocks and crypto to add to
                {portfolioValue.portfolioName} use our search feature!
              </p>
              <Link
                to="/search"
                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center dark:text-white text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Get started
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Search Meow!
              </Link>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src={fincat} alt="Seach" />
            </div>
          </div>
        </section>
      )}
      {portfolioTotal > 0 ? (
        <h4
          className="inline-flex flex-auto mx-auto mt-2 w-full text-center text-md font-bold"
          data-tooltip-id="my-tooltip"
          data-tooltip-content={`${convertToBaseCurrency(
            portfolioTotal
          )} | ${getUserCurrency()}`}
          data-tooltip-place="top"
        >
          <RiMoneyDollarCircleFill className="ml-2 mt-1 text-lg" />
          {convertToUserCurrency(portfolioTotal)}
        </h4>
      ) : (
        <></>
      )}
    </>
  );
};

export default HoldingList;
