import React, { ReactNode, useState } from "react";
import "./SlidingTab.css";
import { MenuItem } from "../MenuTypes";

type Props = {
  menuData: MenuItem[];
  sideHeader: string | ReactNode;
  name: string;
};

const SlidingTab = ({ sideHeader, menuData, name }: Props) => {
  const [index, setIndex] = useState(0);
  if (menuData == null) {
    return;
  }

  return (
    <div className="relative mt-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="mr-auto md:flex md:flex-wrap">
        {menuData.length > 0 ? (
          menuData.map((item: MenuItem, index: number) => {
            return (
              <li key={index} className={"mr-auto md:me-2"}>
                {item.label}
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
      {sideHeader}
    </div>
  );
};

export default SlidingTab;
