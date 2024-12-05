import React, { SyntheticEvent } from "react";
import { IoRemoveOutline } from "react-icons/io5";
interface Props {
  onRemoveHolding: (e: number) => void;
  holdingId: number;
  className: string;
  companyName: string;
  symbol: string;
}

const DeletePortfolio = ({
  className,
  onRemoveHolding,
  holdingId,
  companyName,
  symbol,
}: Props) => {
  return (
    <>
      <button
        onClick={() => {
          onRemoveHolding(holdingId);
        }}
        className={className}
        data-testid={`delete-portfolio-${symbol}`}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={`Remove ` + companyName}
        data-tooltip-place="top"
      >
        <IoRemoveOutline />
      </button>
    </>
  );
};

export default DeletePortfolio;
