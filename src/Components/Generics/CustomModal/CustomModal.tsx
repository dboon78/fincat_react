import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModalContent } from "./ModelContent/ModalContent";
type Props = {
  isOpen: boolean;
  setModalOpen: React.Dispatch<boolean>;
  modalContent: ModalContent | null;
};
const CustomModal = ({ isOpen = false, setModalOpen, modalContent }: Props) => {
  const handleCloseDialog = () => {
    //console.log("handleCloseDialog");
    setModalOpen(false);
  };
  useEffect(() => {
    setModalOpen(true);
  }, [modalContent]);
  useEffect(() => {
    setModalOpen(false);
  }, []);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.25 }}
          exit={{ opacity: 0 }}
          onClick={() => handleCloseDialog()}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className=" text-black p-6 rounded-lg w-full max-w-lg cursor-default relative overflow-hidden"
          >
            <div
              onClick={() => {
                handleCloseDialog();
              }}
              id="crud-modal"
              tabIndex={-1}
              className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative p-4 w-full max-w-md max-h-full mx-auto mt-50"
              >
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {modalContent?.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        handleCloseDialog();
                      }}
                      type="button"
                      className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="authentication-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 md:p-5">{modalContent?.content}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default CustomModal;
