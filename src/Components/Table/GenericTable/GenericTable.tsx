import React, { ReactNode, SyntheticEvent } from "react";
import GenericTableHeader from "../GenericTableHeader/GenericTableHeader";
import GenericTableRow from "../GenericTableRow/GenericTableRow";

type Props = {
  config: Array<any>;
  results: any[];
  includeHeader: boolean;
  callback: (e: SyntheticEvent) => void | null;
  callbackIcon: ReactNode;
  colorArray?: string[] | null;
};

const GenericTable = ({
  callbackIcon,
  results,
  config,
  includeHeader,
  callback,
  colorArray,
}: Props) => {
  return (
    <div className="max-w-full w-full mt-0">
      <table className="leading-normal border-gray-100 border-2 w-full  mx-auto ">
        {includeHeader ? (
          <GenericTableHeader colorArray={colorArray} config={config} />
        ) : (
          <></>
        )}

        <tbody>
          {results.map((item, index) => {
            return (
              <GenericTableRow
                colorArray={colorArray}
                key={index}
                index={index}
                callbackIcon={callbackIcon}
                config={config}
                result={item}
                callback={callback}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
