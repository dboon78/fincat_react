import React, { SyntheticEvent } from "react";
import Card from "../Card/Card";
import { CompanySearch } from "../../company";
import { v4 as uuidv4 } from "uuid";
import { PortfolioGet } from "../../Models/Portfolio";
import CardListHeader from "./CardListHeader/CardListHeader";
import { ModalContent } from "../Generics/CustomModal/ModelContent/ModalContent";
import AddPortfolioForm from "../Portfolio/AddPortfolioForm/AddPortfolioForm";

interface Props {
  portfolioValues: PortfolioGet[];
  searchResult: CompanySearch[];
  setModalContent: React.Dispatch<ModalContent | null>;
  onAddToPortfolio: (e: SyntheticEvent) => void;
  onRemoveHolding: (e: number) => void;
  setShowDialog: React.Dispatch<boolean>;
}

const tableConfig = [
  {
    label: "Ticker",
    render: (searchItem: CompanySearch) => searchItem.symbol,
  },
  {
    label: "Name",
    render: (searchItem: CompanySearch) => searchItem.name,
  },
  {
    label: "Currency",
    render: (searchItem: CompanySearch) => searchItem.currency,
  },
  {
    label: "Exchange",
    render: (searchItem: CompanySearch) => searchItem.exchangeShortName,
  },
];
const CardList: React.FC<Props> = ({
  onRemoveHolding,
  onAddToPortfolio,
  searchResult,
  portfolioValues,
  setShowDialog,
  setModalContent,
}: Props): JSX.Element => {
  const onAddAsset = (e: any) => {
    const symbol = e.target[0].value;
    const exchange = e.target[1].value;
    //console.log(`onAddAsset symbol:${symbol} exchange:${exchange}`);
    setModalContent({
      title: `Add ${symbol} to a Portfolio`,
      content: (
        <AddPortfolioForm
          exchange={exchange}
          setShowDialog={setShowDialog}
          onAddToPortfolio={onAddToPortfolio}
          portfolios={portfolioValues}
          symbol={symbol}
        />
      ),
    });
  };
  return (
    <div className="max-w-full justify-center items-center mt-5">
      {searchResult.length > 0 ? (
        <table className="max-w-7xl leading-normal mx-5 md:mx-auto border-gray-100 border-2">
          <CardListHeader config={tableConfig} />
          <tbody>
            {searchResult.map((result) => {
              return (
                <Card
                  setShowDialog={setShowDialog}
                  config={tableConfig}
                  portfolioValues={portfolioValues}
                  id={result.symbol}
                  key={uuidv4()}
                  searchResult={result}
                  onAddToHolding={onAddAsset}
                  onRemoveHolding={onRemoveHolding}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No results!
        </p>
      )}
    </div>
  );
};

export default CardList;
