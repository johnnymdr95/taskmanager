import React, {useEffect, useState} from "react";

const Priority = ({initialValue, onChange }) => {
    const [selectedPriority, setSelectedPriority] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setSelectedPriority(initialValue || "");
    }, [initialValue]);

    const handleSelection = (priority) => {
        setSelectedPriority(priority);
        setIsOpen(false);
        if (onChange) {
            onChange(priority);
        }
    };

    return (
        <div className="relative">
            <label className="text-left py-0 pb-0 font-bold">Priority</label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-10/12 border border-gray-400 rounded p-2 text-left flex justify-between items-end focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {selectedPriority || ""}
                <span className="ml-2">
          {isOpen ? (
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4"
              >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 15l7-7 7 7"
                  />
              </svg>
          ) : (
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4"
              >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                  />
              </svg>
          )}
        </span>
            </button>
            {isOpen && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md mt-1">
                    <li
                        onClick={() => handleSelection("1 (Highest)")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        1 (Highest)
                    </li>
                    <li
                        onClick={() => handleSelection("2")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        2
                    </li>
                    <li
                        onClick={() => handleSelection("3")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        3
                    </li>
                    <li
                        onClick={() => handleSelection("4")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        4
                    </li>
                    <li
                        onClick={() => handleSelection("5 (Lowest)")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        5 (Lowest)
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Priority;
