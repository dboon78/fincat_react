import React, { useEffect, useState } from "react";
import {
  convertToBaseCurrency,
  convertToUserCurrency,
  getCurrencyCode,
  getUserCurrency,
} from "../../../Services/AuthService";
import { FaGear } from "react-icons/fa6";
import { ModalContent } from "../../Generics/CustomModal/ModelContent/ModalContent";
import CurrencyForm from "./CurrencyForm/CurrencyForm";
import { fetchCurrencies } from "../../../api";

type Props = {
  portfolioTotal: number;
  setShowDialog: React.Dispatch<boolean>;
  setModalContent: React.Dispatch<React.SetStateAction<ModalContent | null>>;
};

const SideHeader = ({
  portfolioTotal,
  setModalContent,
  setShowDialog,
}: Props) => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [totalString, setTotalString] = useState<string>("");
  const loadCurrencies = async () => {
    const currencies = await fetchCurrencies();
    if (typeof currencies == "string") {
      return;
    }
    setCurrencies(currencies);
  };
  const setTotals = () => {
    setTotalString(convertToUserCurrency(portfolioTotal) + "");
  };

  const onEditCurrency = async (e: any) => {
    const currencyCode = await getCurrencyCode();
    setModalContent({
      content: (
        <CurrencyForm
          currencies={currencies}
          currencyCode={currencyCode}
          setShowDialog={setShowDialog}
          onComplete={setTotals}
        />
      ),
      title: `Change Currency`,
    });
  };
  useEffect(() => {
    loadCurrencies();
  }, []);
  useEffect(() => {
    setTotals();
  }, [portfolioTotal]);
  return (
    <span
      className="md:absolute md:top-4 md:right-10"
      data-tooltip-id="my-tooltip"
      data-tooltip-content={`${convertToBaseCurrency(
        portfolioTotal
      )} | ${getUserCurrency()}`}
      data-tooltip-place="top"
    >
      {totalString}
      <button
        disabled={currencies.length === 0}
        onClick={onEditCurrency}
        className="spin inline-flex ml-2 p-1 bg-transparent  text-gray-400 hover:text-gray-900"
      >
        <FaGear />
      </button>
    </span>
  );
};

export default SideHeader;
