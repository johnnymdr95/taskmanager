import React, { useState } from "react";

const PriorityDropdown = ({tasks, setTasks, originalTasks}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState("");

    const toggleDropdown = () => setIsOpen(!isOpen);

    const filterTasksByPriority = (priority) => {
        setSelectedPriority(priority);
        setIsOpen(false);

        // Filter tasks based on the selected priority
        const filteredTasks = originalTasks.filter((task) => task.priority === Number(priority));
        setTasks(filteredTasks);
    };

    const removeSort = () => {
        setSelectedPriority("");
        setIsOpen(false);
        setTasks(originalTasks);

    };


    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="inline-flex w-full justify-center rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                {selectedPriority ? `${selectedPriority}` : "Priority"}
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <div className="py-1">
                        <button
                            onClick={() => filterTasksByPriority("1")}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            1
                        </button>
                        <button
                            onClick={() => filterTasksByPriority("2")}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            2
                        </button>
                        <button
                            onClick={() => filterTasksByPriority("3")}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            3
                        </button>
                        <button
                            onClick={() => filterTasksByPriority("4")}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            4
                        </button>

                        <button
                            onClick={() => filterTasksByPriority("5")}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            5
                        </button>

                        <button
                            onClick={removeSort}
                            className="block w-full border-t px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                            Remove sort
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriorityDropdown;
