import React, { ReactNode } from "react";

type Props = {
  children: React.ReactNode;
  isVisible: boolean;
};

const DataRow = ({ children, isVisible }: Props) => {
  return (
    <>
      {isVisible ? (
        <ol className="flex items-center px-3 space-x-2 text-sm font-medium text-center text-gray-900 bg-white border-2 border-gray-700 border rounded-lg shadow-sm dark:text-gray-900 sm:text-base dark:bg-white dark:border-gray-900 sm:px-4 sm:py-2 sm:space-x-4 rtl:space-x-reverse ring-2 ring-gray-400 ring-offset-2">
          {children}
        </ol>
      ) : (
        <></>
      )}
    </>
  );
};

export default DataRow;
