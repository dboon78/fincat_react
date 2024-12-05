import React, { SyntheticEvent, useEffect, useState } from "react";
import "./Card.css";
import { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import DeletePortfolio from "../Portfolio/DeletePortfolio/DeletePortfolio";
import { Link } from "react-router-dom";
import { PortfolioGet } from "../../Models/Portfolio";
import { HoldingGet } from "../../Models/Holding";

interface Props {
  setShowDialog: React.Dispatch<boolean>;
  portfolioValues: PortfolioGet[];
  id: string;
  key: string;
  searchResult: CompanySearch;
  config: Array<any>;
  onAddToHolding: (e: SyntheticEvent) => void;
  onRemoveHolding: (e: number) => void;
}

const Card: React.FC<Props> = ({
  id,
  key,
  searchResult,
  onAddToHolding,
  onRemoveHolding,
  config,
  portfolioValues,
  setShowDialog,
}: Props): JSX.Element => {
  const [holding, setHolding] = useState<HoldingGet | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioGet | null>(null);
  // console.log("holdingIndex:", holdingIndex);
  useEffect(() => {
    const portfolio = portfolioValues.find((parent) =>
      parent.holdings.some((h) => h.stock.symbol == searchResult.symbol)
    );
    setPortfolio(portfolio!);
    if (portfolio == null) {
      setHolding(null);
      return;
    }
    const holding = portfolio?.holdings.find(
      (h) => h.stock.symbol == searchResult.symbol
    );
    setHolding(holding!);
  }, []);
  return (
    <tr>
      {config.map((item, index) => {
        return (
          <td
            key={`td-${index}`}
            className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
          >
            <p
              data-testid={`search-symbol-${searchResult.symbol}-${index}`}
              className="text-gray-900 whitespace-no-wrap"
            >
              {item.render(searchResult)}
            </p>
          </td>
        );
      })}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm items-center justify-center">
        {holding != null && portfolioValues != null ? (
          <DeletePortfolio
            className="spin group-hover:inline-flex p-1 bg-transparent  text-gray-400 group-hover:text-gray-900 hover:text-gray-900"
            holdingId={holding.holdingId}
            companyName={holding.stock.companyName}
            symbol={holding.stock.symbol}
            onRemoveHolding={onRemoveHolding}
          />
        ) : (
          <AddPortfolio
            onAddToHolding={onAddToHolding}
            symbol={searchResult.symbol}
            exchange={searchResult.exchangeShortName}
          />
        )}
      </td>
    </tr>
  );
};

export default Card;

// <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
// 									<p className="text-gray-900 whitespace-no-wrap">Admin</p>
// 								</td>
//       <Link
//         className="font-bold text-center text-veryDarkViolet md:text-left"
//         to={`/company/${searchResult.symbol}/company-profile`}
//       >
//         {searchResult.name} ({searchResult.symbol})
//       </Link>
//       <p className="text-black">{searchResult.currency}</p>
//       <p className="font-bold text-black">
//         {searchResult.exchangeShortName} - {searchResult.stockExchange}
//       </p>
//       {holdingIndex > -1 ? (
//         <DeletePortfolio
//           className="cursor-pointer pt-1 px-2 text-white  rounded-lg  focus:outline-none bg-gray-700 hover:text-red-500 hover:bg-white border-gray-500dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
//           holdingId={portfolioValues[0].holdings[holdingIndex].holdingId}
//           companyName={
//             portfolioValues[0].holdings[holdingIndex].stock.companyName
//           }
//           onRemoveHolding={onRemoveHolding}
//         />
//       ) : (
//         <AddPortfolio
//           onAddToHolding={onAddToHolding}
//           symbol={searchResult.symbol}
//           portfolioId={portfolioValues[0].portfolioId}
//           exchange={searchResult.exchangeShortName}
//         />
//       )}
//     </div>
