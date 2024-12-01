import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Status from "./dropdown/Status";
import Priority from "./dropdown/Priority";

const EditTask = ({ visible, onclose, task, onEditTask }) => {
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');

    // Use useEffect to update state when task changes
    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setStartTime(task.start_time ? new Date(task.start_time) : new Date());
            setEndTime(task.end_time ? new Date(task.end_time) : new Date());
            setPriority(task.priority || '');
            setStatus(task.status || '');
        }
    }, [task, visible]);

    if (!visible) {
        return null;
    }

    const handleOnClose = (e) => {
        if (e.target.id === "container") onclose();
    };

    const handleUpdate = () => {
        onEditTask(title, startTime, endTime, priority, status);
    };

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="bg-white p-6 rounded-sm max-w-6xl h-auto text-gray-700">
                <h1 className="font-black text-left text-xl">Edit Task</h1>

                <div>
                    <div className="flex flex-col">
                        <label className="text-left py-2 pb-0 font-bold">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-400 p-2 rounded-sm mb-3 w-2/3 h-8 active:border-gray-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 grid-rows-2 text-left">
                        <div>
                            <Priority
                                key={priority}
                                initialValue={priority}
                                onChange={(selectedPriority) => setPriority(selectedPriority)}
                            />
                        </div>

                        <div>
                            <label className="text-left py-0 pb-0 font-bold">Status</label>
                            <Status
                                key={status}
                                initialValue={status}
                                onChange={(selectedStatus) => setStatus(selectedStatus)}
                            />
                        </div>

                        <div>
                            <label className="text-left py-0 pb-0 font-bold">Start time</label>
                            <div className="mt-2 w-10/12">
                                <DatePicker
                                    selected={startTime}
                                    onChange={(date) => setStartTime(date)}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    className="w-full border border-gray-400 rounded-3xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-left py-0 pb-0 font-bold">End time</label>
                            <div className="mt-2 w-10/12">
                                <DatePicker
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
                            onClick={handleUpdate}
                            className="px-3 p-1 bg-indigo-500 text-white font-semibold rounded-sm hover:bg-indigo-600"
                        >
                            Update
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

export default EditTask;