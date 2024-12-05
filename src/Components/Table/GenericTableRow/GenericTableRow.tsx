import React, { ReactNode, SyntheticEvent } from "react";
import { Link } from "react-router-dom";

type Props = {
  config: Array<any>;
  result: any;
  callback: (e: SyntheticEvent) => void | null;
  callbackIcon: ReactNode | null;
  index: number;
  colorArray?: string[] | null;
};

const GenericTableRow = ({
  index,
  result,
  config,
  callback,
  callbackIcon,
  colorArray,
}: Props) => {
  return (
    <tr
      key={index}
      data-testid={`tablerow-${config[0].render(result)}`}
      className={index % 2 == 0 ? "bg-white" : "bg-gray-100"}
    >
      {colorArray != null ? (
        <>
          <td>
            <span
              className="ml-4 w-4 h-4 rounded-full border-2 flex justify-center items-center"
              style={{ backgroundColor: colorArray[index] }}
            ></span>
          </td>
        </>
      ) : (
        <></>
      )}
      {config.map((item) => {
        return (
          <td
            key={item.label}
            className={
              "px-5 py-5 border-b border-gray-200  text-sm " + item.addedCss
            }
          >
            {item.url === undefined || item.url(result) == null ? (
              <p
                className="text-gray-900"
                data-testid={`${item.label}-col-${config[0].render(result)}`}
              >
                {item.render(result)}
              </p>
            ) : (
              <Link
                data-testid={`link-${item.render(result)}`}
                className="font-bold text-center text-veryDarkViolet md:text-left"
                to={item.url(result)}
              >
                {item.render(result)}
              </Link>
            )}
          </td>
        );
      })}
      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        <button
          data-testid={`rowbutton-${config[0].render(result)}`}
          className="spin group-hover:inline-flex p-1 bg-transparent  text-gray-400 group-hover:text-gray-900 hover:text-gray-500"
          onClick={(e) => {
            callback(e);
          }}
          data-index={index}
        >
          {callbackIcon}
        </button>
      </td>
    </tr>
  );
};

export default GenericTableRow;
