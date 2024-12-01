import React, { useState } from "react";
import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Status from "./dropdown/Status";
import Priority from "./dropdown/Priority";

const AddTask = ({ visible, onclose, onAddTask }) => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    if (!visible) {
        return null;
    }

    const formatDate = (date) => {
        date.setDate(date.getDate() - 1); // Adjust to previous day if necessary (optional)
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };


    const handleAddTask = () => {
        if (!title || !priority) {
            alert("Please fill all fields!");
            return;
        }

        const formattedST = formatDate(startTime)
        const formattedET = formatDate(endTime)
        console.log(formattedST)
        console.log(formattedET)

        onAddTask(title, formattedST, formattedET, priority);
        onclose();
    };

    const handleOnClose = (e) => {
        if (e.target.id === "container") onclose();
    };

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="bg-white p-6 rounded-sm max-w-6xl h-auto text-gray-700">
                <h1 className="font-black text-left text-xl">Add New Task</h1>

                <div>
                    <div className="flex flex-col">
                        <label className="text-left py-2 pb-0 font-bold ">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-400 p-2 rounded mb-3 w-2/3 h-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 grid-rows-2 text-left">
                        <div>
                            {/*<label className="text-left py-0 pb-0 font-bold ">PriorityMisc</label>*/}
                            <Priority onChange={(priority) => setPriority(priority)} />

                        </div>

                        <div>
                            <label className="text-left py-0 pb-0 font-bold ">Status</label>
                            <Status onChange={(status) => setStatus(status)}/>
                        </div>

                        <div>
                            <label className="text-left py-0 pb-0 font-bold ">Start time</label>
                            <div className="mt-2 w-10/12">
                                <DateTimePicker
                                    selected={startTime}
                                    onChange={(date) => setStartTime(date)}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    className="w-full border border-gray-400 rounded-3xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-left py-0 pb-0 font-bold ">End time</label>
                            <div className="mt-2 w-10/12">
                                <DateTimePicker
                                    selected={endTime}
                                    onChange={(date) => setEndTime(date)}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    className="w-full border border-gray-400 rounded-3xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                />
                            </div>
                        </div>


                    </div>

                    <div className="flex flex-cols-3 space-x-3">
                        <button
                            onClick={handleAddTask}
                            className="px-3 p-1 bg-indigo-500 text-white font-semibold rounded-sm hover:bg-indigo-600"
                        >
                            Add task
                        </button>
                        <button
                            onClick={onclose}
                            className="px-3 border border-gray-400 rounded-sm hover:border-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
