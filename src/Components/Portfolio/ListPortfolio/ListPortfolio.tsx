import React, { SyntheticEvent, useEffect, useState } from "react";
import { PortfolioGet } from "../../../Models/Portfolio";
import HoldingList from "../HoldingsList/HoldingList";
import SlidingTab from "../../Menus/SlidingTab/SlidingTab";
import { MenuItem } from "../../Menus/MenuTypes";
import SelfEditButton from "../../Menus/SelfEditButton/SelfEditButton";
import { IoMdAdd } from "react-icons/io";
import "./ListPortfolio.css";
import { ModalContent } from "../../Generics/CustomModal/ModelContent/ModalContent";
import SideHeader from "../SideHeader/SideHeader";
import ChartWidget from "../ChartWidget/ChartWidget";
import { generateColorRange } from "../../../Helpers/ColorHelper";
interface Props {
  portfolioValues: PortfolioGet[];
  onRemoveHolding: (e: number) => void;
  handleUpdateHolding: (e: SyntheticEvent) => void;
  editPortfolio: (e: SyntheticEvent) => void;
  setModalContent: React.Dispatch<React.SetStateAction<ModalContent | null>>;
  setShowDialog: React.Dispatch<boolean>;
  portfolioIndex: number;
}

const ListPortfolio = ({
  portfolioIndex,
  portfolioValues,
  onRemoveHolding,
  editPortfolio,
  setModalContent,
  setShowDialog,
  handleUpdateHolding,
}: Props) => {
  const [count, setPortfolioCount] = useState(portfolioValues.length);
  const [totals, setTotals] = useState(0);
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [portfolioTotal, setPortfolioValue] = useState(0);
  const [colorArray, setColorArray] = useState<string[]>(
    generateColorRange("#7ed4ff", "#00ff1f", 1)
  );
  const curPortfolio =
    portfolioValues == undefined ? null : portfolioValues[portfolioIndex];
  const editPortfolioSubmit = (e: any) => {
    portfolioValues.pop();
    setPortfolioCount(portfolioValues.length);
    // console.log("portfolio count:" + count);
    editPortfolio(e);
  };
  const addPortfolioUI = () => {
    portfolioValues.push({
      portfolioId: -1,
      portfolioName: "",
      holdings: [],
    });
    setPortfolioCount(portfolioValues.length);
  };
  // console.log(portfolioValue);
  useEffect(() => {
    const menuList = portfolioValues.map((portfolio, index) => ({
      label: (
        <SelfEditButton
          label={portfolio.portfolioName}
          id={portfolio.portfolioId.toString()}
          editSubmit={editPortfolioSubmit}
          link={`/dashboard/${index}`}
          value={portfolio.portfolioName}
          selected={curPortfolio?.portfolioId == portfolio.portfolioId}
        />
      ),
      id: `portfolio${portfolio.portfolioId}`,
      isSelected: curPortfolio?.portfolioId == portfolio.portfolioId,
    }));
    if (portfolioValues.length < 5) {
      menuList.push({
        label: (
          <span className="animated-bottom group relative inline-flex items-center  justify-center p-4   text-gray-700 hover:text-gray-600 ">
            <button
              className="spin group-hover:inline-flex p-1 bg-transparent  text-gray-400 group-hover:text-gray-900 hover:text-gray-50"
              onClick={addPortfolioUI}
            >
              <IoMdAdd className="cursor-pointer m-0" />
            </button>
          </span>
        ),
        id: "addPortfolio",
        isSelected: false,
      });
    }

    setMenuList(menuList);
    const holdingtotals = portfolioValues.map((p) =>
      p.holdings.reduce(
        (acc, item) => acc + item.stock.purchase * item.units,
        0
      )
    );
    setTotals(holdingtotals.reduce((acc, e) => acc + e, 0));
    setPortfolioValue(
      holdingtotals.reduce((partialSum, a) => partialSum + a, 0)
    );

    setPortfolioCount(portfolioValues.length);
    if (curPortfolio)
      setColorArray(
        generateColorRange("#1a56db", "#00ff1f", curPortfolio!.holdings.length)
      );
  }, [count, portfolioValues, portfolioIndex]);

  return (
    <section id="portfolio" className="items-center justify-center">
      {curPortfolio?.holdings != null &&
      curPortfolio.holdings.length > 0 &&
      curPortfolio.holdings[0].units > 0 ? (
        <ChartWidget
          colorArray={colorArray}
          portfolio={curPortfolio!}
          totalHoldings={totals}
        />
      ) : (
        <></>
      )}
      <div className="mx-auto px-0 md:px-10  ">
        <SlidingTab
          menuData={menuList!}
          name="portfolios"
          sideHeader={
            <SideHeader
              setShowDialog={setShowDialog}
              portfolioTotal={portfolioTotal}
              setModalContent={setModalContent!}
            />
          }
        />
        {curPortfolio != null ? (
          <HoldingList
            colorArray={colorArray}
            setModalContent={setModalContent!}
            handleUpdateHolding={handleUpdateHolding}
            setShowDialog={setShowDialog}
            key={curPortfolio!.portfolioId}
            portfolioValue={curPortfolio!}
            onRemoveHolding={onRemoveHolding}
          />
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default ListPortfolio;
