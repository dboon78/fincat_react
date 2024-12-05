import React from "react";

type Props = {
  config: Array<any>;
};

const CardListHeader = ({ config }: Props) => {
  return (
    <thead>
      <tr>
        {config.map((item) => {
          return (
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {item.label}
            </th>
          );
        })}
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
      </tr>
    </thead>
  );
};

export default CardListHeader;
