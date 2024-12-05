import { formatLargeMonetaryNumber } from "../../../Helpers/NumberFormatting";
import { HoldingGet } from "../../../Models/Holding";
import { convertToUserCurrency } from "../../../Services/AuthService";
import React from "react";
export const holdingListConfig = [
  {
    label: "Ticker",
    addedCss: "",
    url: (item: HoldingGet) =>
      item.stock.exchange.exchangeName !== "CCC"
        ? `/company/${item.stock.symbol}/company-profile`
        : null,
    render: (item: HoldingGet) => item.stock.symbol,
  },
  {
    label: "Name",
    addedCss: " hidden md:table-cell",
    render: (item: HoldingGet) => item.stock.companyName,
  },
  {
    label: "Price",
    addedCss: "",
    render: (item: HoldingGet) => convertToUserCurrency(item.stock.purchase),
  },
  {
    label: "1D",
    addedCss: " hidden lg:table-cell",
    render: (item: HoldingGet) =>
      item.stock.priceChange?._1D.toFixed(1) +
      "%" +
      (item.units > 0
        ? ` (${convertToUserCurrency(
            item.units *
              item.stock.purchase *
              (item.stock.priceChange._1D / 100)
          )})`
        : ""),
  },
  {
    label: "1M",
    addedCss: " hidden lg:table-cell",
    render: (item: HoldingGet) =>
      item.stock.priceChange?._1M.toFixed(1) +
      "%" +
      (item.units > 0
        ? ` (${convertToUserCurrency(
            item.units *
              item.stock.purchase *
              (item.stock.priceChange._1M / 100)
          )})`
        : ""),
  },
  {
    label: "6M",
    addedCss: " hidden lg:table-cell",
    render: (item: HoldingGet) =>
      item.stock.priceChange?._6M.toFixed(1) +
      "%" +
      (item.units > 0
        ? ` (${convertToUserCurrency(
            item.units *
              item.stock.purchase *
              (item.stock.priceChange._6M / 100)
          )})`
        : ""),
  },
  {
    label: "Units",
    addedCss: "visible",
    render: (item: HoldingGet) => item.units,
  },
  {
    label: "Book",
    addedCss: " hidden md:table-cell",
    render: (item: HoldingGet) =>
      item.bookCost > 0 ? convertToUserCurrency(item.bookCost) : "--",
  },
  {
    label: "Value",
    addedCss: "visible",
    render: (item: HoldingGet) =>
      convertToUserCurrency(item.units * item.stock.purchase),
  },
  {
    label: "Gains",
    addedCss: " hidden lg:table-cell",
    render: (item: HoldingGet) =>
      item.bookCost > 0 && item.units > 0
        ? convertToUserCurrency(
            item.units * item.stock.purchase - item.bookCost
          )
        : "--",
  },
];
