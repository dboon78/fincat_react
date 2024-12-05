import React, { SyntheticEvent, useEffect, useState } from "react";
import CardList from "../../Components/CardList/CardList";
import Search from "../../Components/Search/Search";
import { searchCompanies } from "../../api";
import { CompanySearch } from "../../company";
import { PortfolioGet } from "../../Models/Portfolio";
import {
  portfolioGetAPI,
  portfolioPostAPI,
} from "../../Services/PortfolioService";
import { toast } from "react-toastify";
import {
  holdingDeleteAPI,
  holdingPostAPI,
} from "../../Services/HoldingService";
import { ModalContent } from "../../Components/Generics/CustomModal/ModelContent/ModalContent";
import CustomModal from "../../Components/Generics/CustomModal/CustomModal";
import Spinner from "../../Components/Spinner/Spinner";

interface Props {}

// "symbol": "FB",
// "name": "Meta Platforms, Inc.",
// "currency": "USD",
// "stockExchange": "NASDAQ Global Select",
// "exchangeShortName": "NASDAQ"

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>(
    []
  );
  const [searchResult, setSearchResults] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const [showModal, setShowDialog] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  // const [modalTitle, setModalTitle] = useState<ReactNode>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getPortfolio = () => {
    portfolioGetAPI()
      .then((res) => {
        // console.log("getPorfolio", res?.data);
        if (res?.data) {
          setPortfolioValues(res?.data);
        }
      })
      .catch((e) => {
        toast.warning("Could not get portfolio values!");
      });
  };

  const onAddToPortfolio = async (e: any) => {
    const symbol = e.target[0].value;
    const exchange = e.target[1].value;
    let portfolioId = e.target[2].value;

    if (portfolioId == -1) {
      const name = e.target[4].value;

      const response = await portfolioPostAPI(name)
        .then((res) => {
          if (res?.status === 200) {
            portfolioId = res.data.portfolioId;
            toast.success(`Portfolio ${res.data.portfolioName} created`);
            getPortfolio();
          }
        })
        .catch((e) => {
          toast.warning("Could not edit portfolio");
        });
      console.log(`Created new portfolio named ${name} with id ${portfolioId}`);
    }

    holdingPostAPI(symbol, portfolioId, exchange)
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Stock added to portfolio holdings!");
          getPortfolio();
        }
      })
      .catch((e) => {
        toast.warning("Could not create portfolio item");
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setServerError("");
    setIsLoading(true);
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResults(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const initSearch = async (query: string) => {
      setSearch(query);
      const result = await searchCompanies(query);
      if (typeof result === "string") {
        setServerError(result);
      } else if (Array.isArray(result.data)) {
        setSearchResults(result.data);
      }
    };
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const query = params.get("s");

    if (query != null) {
      initSearch(query);
    }

    getPortfolio();
  }, []);
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
      {isLoading ? (
        <Spinner isLoading={true} />
      ) : (
        <CardList
          setModalContent={setModalContent}
          setShowDialog={setShowDialog}
          portfolioValues={portfolioValues!}
          searchResult={searchResult}
          onAddToPortfolio={onAddToPortfolio}
          onRemoveHolding={onRemoveHolding}
        />
      )}
    </div>
  );
};

export default SearchPage;
