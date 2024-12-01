import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import SortDropdown from "./dropdown/SortDropdown";
import PriorityDropdown from "./dropdown/PriorityDropdown";
import StatusDropdown from "./dropdown/StatusDropdown";
import { useAuth } from "../context/AuthContext";
import {retrieveAllTasksForUsernameApi, deleteTaskApi, createTaskApi, updateTaskApi} from "../service/taskService.jsx";

const TaskList = () => {
    const authContext = useAuth();
    const username = authContext.user?.username || "";
    const token = authContext.token;

    const [tasks, setTasks] = useState([]);
    const [originalTasks, setOriginalTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTasks, setSelectedTasks] = useState([]); // State for selected tasks
    const [selectAll, setSelectAll] = useState(false); // State for "select all" checkbox
    const [showAddTask, setShowAddTask] = useState(false);
    const [showEditTask, setShowEditTask] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        if (username && token) {
            retrieveAllTasks();
        }
    }, [username, token]);

    const retrieveAllTasks = async () => {
        try {
            setLoading(true);
            const response = await retrieveAllTasksForUsernameApi(username, token);
            setTasks(response.data);
            setOriginalTasks(response.data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch tasks:", err);
            setError("Failed to load tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (title, startTime, endTime, priority) => {

        console.log("Inside handle func" + title, startTime, endTime, priority)
        const newTask = {
            title:title,
            start_time: startTime,
            end_time:endTime,
            priority:priority
        };

        console.log("Before Try" + newTask, token)

        try {
            console.log("inside try" + newTask);
            const response = await createTaskApi(token, newTask);
            setTasks([...tasks, response.data]);
            setShowAddTask(false);
            alert("Task added successfully");
        } catch (err) {
            console.log(JSON.stringify(newTask))
            console.error("Failed to add task:", err);
            alert("Failed to add task. Please try again.");
        }
    };

    const handleUpdateTask = async (title, startTime, endTime, priority, status) => {
        if (!taskToEdit) return;

        const updatedTask = {
            ...taskToEdit,
            title: title,
            start_time: startTime,
            end_time: endTime,
            priority: priority,
            status: status
        };

        try {
            const response = await updateTaskApi(token, updatedTask);

            // Update the tasks list with the updated task
            setTasks(tasks.map(task =>
                task.id === updatedTask.id ? response.data : task
            ));

            setShowEditTask(false);
            setTaskToEdit(null);
            alert("Task updated successfully");
        } catch (err) {
            console.error("Failed to update task:", err);
            alert("Failed to update task. Please try again.");
        }
    };


    const handleDeleteSelected = async () => {

        if (selectedTasks.length === 0) {
            alert('Please select tasks to delete');
            return;
        }

        try {
            for (const taskId of selectedTasks) {
                await deleteTaskApi(taskId, token);
            }

            setTasks(tasks.filter(task => !selectedTasks.includes(task.id)));
            setSelectedTasks([]);
            setSelectAll(false);
            alert('Selected tasks deleted successfully');
        } catch (error) {
            console.error('Error deleting tasks:', error);
            alert('Failed to delete selected tasks');
        }
    };

    // checkbox
    const handleCheckboxChange = (taskId) => {
        setSelectedTasks(prevSelected => {
            if (prevSelected.includes(taskId)) {
                return prevSelected.filter(id => id !== taskId);
            } else {
                return [...prevSelected, taskId];
            }
        });
    };

    // all checkbox
    const handleSelectAllChange = () => {
        setSelectAll(prev => {
            const newSelectAll = !prev;
            if (newSelectAll) {
                setSelectedTasks(tasks.map(task => task.id));
            } else {
                setSelectedTasks([]);
            }
            return newSelectAll;
        });
    };

    const formatDateTime = (isoString) => {
        const options = {
            day: "2-digit",
            month: "short",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        return new Date(isoString).toLocaleString("en-US", options);
    };

    const calculateTotalTime = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const diffMs = end - start;

        if (diffMs < 0) return "Invalid time range";

        const totalHours = diffMs / (1000 * 60 * 60);
        const hours = Math.floor(totalHours);
        const minutes = Math.round((totalHours - hours) * 60);

        return `${hours} hrs ${minutes} mins`;
    };

    const handleAddTaskOnClose = () => setShowAddTask(false);
    const handleEditTaskOnClose = () => setShowEditTask(false);

    return (
        <div className="p-6">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Task List</h1>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4 mb-4">
                        <button
                            className="border-solid border-2 border-indigo-600 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-600 hover:text-white"
                            onClick={() => setShowAddTask(true)}
                        >
                            + Add Task
                        </button>
                        <button
                            className="border-solid border-2 border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white"
                            onClick={handleDeleteSelected} // Trigger deletion of selected tasks
                        >
                            🗑️ Delete Selected
                        </button>
                    </div>

                    <div className="flex gap-4 mb-4">
                        <SortDropdown tasks={tasks} setTasks={setTasks} originalTasks={originalTasks} />
                        <PriorityDropdown tasks={tasks} setTasks={setTasks} originalTasks={originalTasks} />
                        <StatusDropdown tasks={tasks} setTasks={setTasks} originalTasks={originalTasks} />
                    </div>
                </div>
            </div>

            <div className="px-6">
                {loading ? (
                    <p>Loading tasks...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <table className="px-6 min-w-full border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-400">
                            <th className="border border-gray-300 p-2">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                />
                            </th>
                            <th className="border border-gray-300 p-2">Task ID</th>
                            <th className="border border-gray-300 p-2">Title</th>
                            <th className="border border-gray-300 p-2">Priority</th>
                            <th className="border border-gray-300 p-2">Status</th>
                            <th className="border border-gray-300 p-2">Start Time</th>
                            <th className="border border-gray-300 p-2">End Time</th>
                            <th className="border border-gray-300 p-2">Total Time to finish(hrs)</th>
                            <th className="border border-gray-300 p-2">Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id} className="odd:bg-white even:bg-gray-50">
                                <td className="border border-gray-300 p-2 text-center">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(task.id)}
                                        checked={selectedTasks.includes(task.id)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2 text-center">{task.id}</td>
                                <td className="border border-gray-300 p-2">{task.title}</td>
                                <td className="border border-gray-300 p-2 text-center">{task.priority}</td>
                                <td className="border border-gray-300 p-2 text-center">{task.status}</td>
                                <td className="border border-gray-300 p-2">{formatDateTime(task.start_time)}</td>
                                <td className="border border-gray-300 p-2">{formatDateTime(task.end_time)}</td>
                                <td className="border border-gray-300 p-2 text-center">{calculateTotalTime(task.start_time, task.end_time)}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => {setTaskToEdit(task);
                                            setShowEditTask(true)}

                                        }
                                    >
                                        ✏️
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
            <AddTask onAddTask={handleAddTask} onclose={handleAddTaskOnClose} visible={showAddTask} />
            <EditTask onEditTask={handleUpdateTask}
                      onclose={handleEditTaskOnClose}
                      visible={showEditTask}
                      task={taskToEdit}/>
        </div>
    );
};

export default TaskList;
