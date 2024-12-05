import React, { SyntheticEvent, useState } from "react";
import { IoAdd } from "react-icons/io5";
interface Props {
  onAddToHolding: (e: SyntheticEvent) => void;
  symbol: string;
  exchange: string;
}

const AddPortfolio = ({ onAddToHolding, symbol, exchange }: Props) => {
  const [tooltipHide, setHideTooltip] = useState(false);
  const submitAdd = (e: any) => {
    setHideTooltip(true);
    onAddToHolding(e);
    // console.log(`tooltipHide=${tooltipHide}`);
  };
  return (
    <form onSubmit={submitAdd}>
      <input readOnly={true} hidden={true} value={symbol} />
      <input readOnly={true} hidden={true} value={exchange} />
      <button
        data-testid={`addto-portfolio-${symbol}`}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={`Add ` + symbol}
        data-tooltip-place="top"
        data-tooltip-hidden={tooltipHide}
        type="submit"
        className="spin group-hover:inline-flex p-1 bg-transparent  text-gray-400 group-hover:text-gray-900 hover:text-gray-900"
      >
        <IoAdd />
      </button>
    </form>
  );
};

export default AddPortfolio;
