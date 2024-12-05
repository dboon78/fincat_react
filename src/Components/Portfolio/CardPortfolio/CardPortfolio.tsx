import { SyntheticEvent, useState } from "react";
import { HoldingGet } from "../../../Models/Holding";
import HoldingDisplay from "../HoldingDisplay/HoldingDisplay";
import "./CardPortfolio.css";
import React from "react";
interface Props {
  key: number;
  holding: HoldingGet;
  onRemoveHolding: (e: number) => void;
  getPortfolio: () => void;
}

const CardPortfolio = ({
  getPortfolio,
  key,
  holding,
  onRemoveHolding,
}: Props) => {
  const [editMode, SetEditMode] = useState(false);
  return (
    <div
      key={key}
      className="holding relative flex grow flex-col mb-5 mx-2 p-8 text-center rounded-lg shadow-2xl border-2 border-black min-w-60 max-w-80 items-center"
    >
      {editMode ? (
        <></>
      ) : (
        <HoldingDisplay
          holding={holding}
          onRemoveHolding={onRemoveHolding}
          SetEditMode={SetEditMode}
        />
      )}
    </div>
  );
};

export default CardPortfolio;
