import React, { ReactNode } from "react";

type Props = {
  symbol: string | ReactNode;
  info: string;
  isVisible: boolean;
  ticker: string;
  id: string;
};

const DataItem = ({ symbol, info, isVisible, ticker, id }: Props) => {
  return (
    <>
      {isVisible ? (
        <li className="flex items-center text-blue-600 dark:text-black">
          <span
            data-testid={`holding-${ticker}-${id}`}
            className="flex font-semibold md:font-medium items-center justify-center w-5 h-5 me-2 p-4 text-xs rounded-full ring-2 ring-black border-black ring-inset"
          >
            <span>{symbol}</span>
          </span>
          {info}
        </li>
      ) : (
        <></>
      )}
    </>
  );
};

export default DataItem;
