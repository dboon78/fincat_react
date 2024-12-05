import React, { useEffect, useState } from "react";
import { CompanyBalanceSheet } from "../../company";
import { useOutletContext } from "react-router-dom";
import RatioList from "../RatioList/RatioList";
import { getBalanceSheet } from "../../api";
import { config } from "./BalanceSheetTableConfig";

type Props = {};

const BalanceSheet = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet>();
  useEffect(() => {
    const getCompanyData = async () => {
      const value = await getBalanceSheet(ticker!);
      setBalanceSheet(value?.data[0]);
    };
    getCompanyData();
  }, []);
  return (
    <>
      {balanceSheet ? (
        <RatioList data={balanceSheet} config={config} />
      ) : (
        <>loading</> // <Spinner />
      )}
    </>
  );
};

export default BalanceSheet;
