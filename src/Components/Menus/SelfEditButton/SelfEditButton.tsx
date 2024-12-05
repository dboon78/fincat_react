import React, { SyntheticEvent, useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";
type Props = {
  id: string;
  label: string;
  value: string;
  editSubmit: (e: SyntheticEvent) => void;
  link: string;
  selected: boolean;
};

const SelfEditButton = ({
  value,
  label,
  editSubmit,
  id,
  link,
  selected,
}: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const onSubmit = (e: SyntheticEvent) => {
    setEditMode(false);
    console.log(`onSubmit `, e);
    editSubmit(e);
  };
  useEffect(() => {
    if (value == "") setEditMode(true);
  }, []);
  return (
    <>
      {editMode ? (
        <form
          onSubmit={onSubmit}
          className="overflow-visible    relative inline-flex items-center justify-center p-2 pl-3 pr-2 border-b-2 border-transparent "
        >
          <input type="hidden" name="id" value={id} />
          <button
            className="!absolute right-4 top-3 z-10 select-none rounded bg-gray-500 p-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
            type="submit"
          >
            <IoMdCheckmark />
          </button>
          <input
            type="text"
            name="portfolioName"
            value={editValue}
            onChange={(e) => {
              setEditValue(e.target.value);
            }}
            className="peer rounded-[7px] w-36 border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  disabled:border-0 disabled:bg-blue-gray-50"
          />
        </form>
      ) : (
        <span
          className={
            "block md:inline-flex items-center justify-center relative group p-4 pl-6 border-2 md:border-0 w-full " +
            (selected
              ? "text-gray-600 shadow-lg md:shadow-none md:border-b-2 border-gray-400"
              : "animated-bottom  text-gray-700 hover:text-gray-600 ")
          }
        >
          <Link className="mr-1" to={link}>
            {label}
          </Link>
          <button
            className="spin group-hover:inline-flex p-1 bg-transparent  text-gray-400 group-hover:text-gray-900 hover:text-gray-50"
            onClick={() => setEditMode(true)}
          >
            <MdOutlineModeEdit />
          </button>
        </span>
      )}
    </>
  );
};

export default SelfEditButton;
