import React from "react";

type Props = {
  config: Array<any>;
  colorArray?: string[] | null;
};

const GenericTableHeader = ({ config, colorArray }: Props) => {
  return (
    <thead>
      <tr>
        {colorArray != null ? (
          <>
            <th
              className={
                "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider "
              }
            ></th>
          </>
        ) : (
          <></>
        )}
        {config.map((item) => {
          return (
            <th
              key={item.label}
              className={
                "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider " +
                item.addedCss
              }
            >
              {item.label}
            </th>
          );
        })}
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
      </tr>
    </thead>
  );
};

export default GenericTableHeader;
