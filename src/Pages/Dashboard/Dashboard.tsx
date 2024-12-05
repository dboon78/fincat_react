import React, { SyntheticEvent, useEffect, useState } from "react";

import Search from "../../Components/Search/Search";
// import { searchCompanies } from "../../api";
// import { CompanySearch } from "../../company";
import { useNavigate, useParams } from "react-router";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import {
  portfolioGetAPI,
  portfolioPostAPI,
  portfolioPriceList,
  portfolioPutAPI,
} from "../../Services/PortfolioService";
import { toast } from "react-toastify";
import { PortfolioGet } from "../../Models/Portfolio";
import CustomModal from "../../Components/Generics/CustomModal/CustomModal";
import { ModalContent } from "../../Components/Generics/CustomModal/ModelContent/ModalContent";
import { holdingDeleteAPI, holdingPutAPI } from "../../Services/HoldingService";
import { HoldingGet, HoldingPrice } from "../../Models/Holding";
import Spinner from "../../Components/Spinner/Spinner";
type Props = {};

const Dashboard = (props: Props) => {
  let { portfolioIndex = "0" } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowDialog] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>(
    []
  );
  const [priceList, setPriceList] = useState<HoldingPrice[]>([]);
  const [search, setSearch] = useState<string>("");

  const getPrices = async () => {
    await portfolioPriceList().then((res) => {
      if (res?.data) {
        setPriceList(res?.data);
      }
    });
    setTimeout(() => {
      getPrices();
    }, 60000);
  };
  const getPortfolio = () => {
    portfolioGetAPI()
      .then((res) => {
        //console.log("getPorfolio", res?.data);
        if (res?.data) {
          res?.data.map((portfolio: PortfolioGet) => {
            portfolio.holdings = portfolio.holdings.sort(
              (a: HoldingGet, b: HoldingGet) =>
                a.stock.purchase * a.units > b.stock.purchase * b.units ? -1 : 1
            );
          });
          setPortfolioValues(res?.data);
        }
      })
      .catch((e) => {
        toast.warning("Could not get portfolio values!");
      });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleUpdateHolding = async (e: any) => {
    const holdingId = e.target[0].value;
    const bookCost = e.target[1].value;
    const units = e.target[2].value;

    //console.log("handleHolding:", bookCost, units);
    const result = await holdingPutAPI(holdingId, units, bookCost);
    if (typeof result === "string") {
      toast.warning("Could not edit holding");
    } else if (result?.status == 200) {
      setShowDialog(false);
      toast.success(`Holding updated`);
    }
    getPortfolio();
  };

  const onEditPorfolio = async (e: any) => {
    e.preventDefault();
    const id = parseInt(e.target[0].value);
    const name = e.target[2].value;
    if (name === "") return;
    if (id === -1) {
      await portfolioPostAPI(name)
        .then((res) => {
          if (res?.status === 200) {
            toast.success(`Portfolio name ${name} created`);
            getPortfolio();
          }
        })
        .catch((e) => {
          toast.warning("Could not edit portfolio");
        });
      return;
    }

    portfolioPutAPI(e.target[0].value, e.target[2].value)
      .then((res) => {
        if (res?.status === 200) {
          toast.success(`Portfolio ${res.data?.portfolioName} edited`);
          getPortfolio();
        }
      })
      .catch((e) => {
        toast.warning("Could not edit portfolio");
      });
  };
  const onRemoveHolding = (holdingId: number) => {
    // console.log("onPortfolioRemove val:", e.target[0].value);
    // e.preventDefault();

    setShowDialog(false);
    holdingDeleteAPI(holdingId)
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Stock successfully removed");
          getPortfolio();
        }
      })
      .catch((e) => {
        toast.warning("Could not remove portfolio item");
      });
  };
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    navigate("/search?s=" + search);
  };

  useEffect(() => {
    getPortfolio();
    //getPrices();
  }, []);
  useEffect(() => {
    if (portfolioValues == null) return;
    for (let i = 0; i < portfolioValues.length; i++) {
      for (let x = 0; x < portfolioValues[i].holdings.length; x++) {
        const price = priceList.find(
          (pl) => pl.s == portfolioValues[i].holdings[x].stock.symbol
        )?.p!;
        if (price != null) {
          portfolioValues[i].holdings[x].stock.purchase = price;
        }
      }
    }
    setPortfolioValues(portfolioValues);
  }, [priceList]);
  return (
    <div className="App mt-20">
      <CustomModal
        isOpen={showModal}
        setModalOpen={setShowDialog}
        modalContent={modalContent!}
      />
      <Search
        onSearchSubmit={onSearchSubmit}
        handleSearchChange={handleChange}
        search={search}
      />
      {portfolioValues?.length === 0 ? (
        <Spinner isLoading={true} />
      ) : (
        <ListPortfolio
          portfolioIndex={parseInt(portfolioIndex)}
          editPortfolio={onEditPorfolio}
          portfolioValues={portfolioValues!}
          onRemoveHolding={onRemoveHolding}
          setModalContent={setModalContent}
          setShowDialog={setShowDialog}
          handleUpdateHolding={handleUpdateHolding}
        />
      )}
    </div>
  );
};

export default Dashboard;
