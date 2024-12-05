import React from "react";
import Title from "../Title/Title";
import { Outlet } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  ticker: string;
};

const CompanyDashboard = ({ children, ticker }: Props) => {
  return (
    <div className="relati mt-20 md:ml-64 bg-blueGray-100 w-full">
      <div className="relative  pb-32 bg-lightBlue-500">
        <div className="px-4 md:px-6 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">{children}</div>

            <div className="flex flex-wrap">{<Outlet context={ticker} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
