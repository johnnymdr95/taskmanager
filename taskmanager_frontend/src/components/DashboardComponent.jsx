import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getDashboardStats } from "../service/dashboardService.jsx";

export default function Dashboard() {
    const authContext = useAuth();
    const token = authContext.token;

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const data = await getDashboardStats(authContext.username, token);
            setDashboardData(data);
        } catch (err) {
            setError("Failed to fetch dashboard data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!dashboardData) {
        return <div>No data available</div>;
    }

    const {
        totalTasks = 0,
        completedTaskPercentage = 5,
        PendingTaskPercentage = 5,
        totalTimeLapsed = 0,
        totalEstimatedTimeLeft = 0,
        averageCompletionTime = 0,
        tableData = [],
    } = dashboardData || {};

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-6xl mx-auto bg-white rounded-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-left pb-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        <Link to="/dashboard">Your Dashboard</Link>
                    </h1>
                </div>

                <h2 className="text-xl font-bold text-left text-gray-800 mb-4">
                    Summary
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="p-4 rounded-lg text-center">
                        <h2 className="text-3xl font-semibold text-indigo-600">{totalTasks}</h2>
                        <p className="text-gray-600">Total tasks</p>
                    </div>
                    <div className="p-4 rounded-lg text-center">
                        <h2 className="text-3xl font-semibold text-indigo-600">
                            {completedTaskPercentage !== null && !isNaN(completedTaskPercentage)
                                ? completedTaskPercentage.toFixed(1)
                                : "0.0"}%
                        </h2>
                        <p className="text-gray-600">Tasks completed</p>
                    </div>
                    <div className="p-4 rounded-lg text-center">
                        <h2 className="text-3xl font-semibold text-indigo-600">
                            {PendingTaskPercentage !== null && !isNaN(PendingTaskPercentage)
                                ? PendingTaskPercentage.toFixed(1)
                                : "0.0"}%
                        </h2>
                        <p className="text-gray-600">Tasks pending</p>
                    </div>
                    <div className="p-4 rounded-lg text-center">
                        <h2 className="text-3xl font-semibold text-indigo-600">
                            {averageCompletionTime !== null && !isNaN(averageCompletionTime)
                                ? averageCompletionTime.toFixed(1)
                                : "0.0"} hrs
                        </h2>
                        <p className="text-gray-600">Average time per completed task</p>
                    </div>
                </div>


                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">
                        Pending task summary
                    </h2>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="p-4 rounded-lg text-center">
                            <h2 className="text-3xl font-semibold text-indigo-600">
                                {dashboardData.pendingTasks}
                            </h2>
                            <p className="text-gray-600">Pending tasks</p>
                        </div>
                        <div className="p-4 rounded-lg text-center">
                            <h2 className="text-3xl font-semibold text-indigo-600">
                                {totalTimeLapsed !== null && !isNaN(totalTimeLapsed)
                                    ? totalTimeLapsed.toFixed(1)
                                    : "0.0"} hrs
                            </h2>
                            <p className="text-gray-600">Total time lapsed</p>
                        </div>
                        <div className="p-4 rounded-lg text-center">
                            <h2 className="text-3xl font-semibold text-indigo-600">
                                {totalEstimatedTimeLeft !== null && !isNaN(totalEstimatedTimeLeft)
                                    ? totalEstimatedTimeLeft.toFixed(1)
                                    : "0.0"} hrs
                            </h2>
                            <p className="text-gray-600">Total time to finish</p>
                        </div>
                    </div>
                </div>


                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-400">
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Task priority
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Pending tasks
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Time lapsed (hrs)
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Time to finish (hrs)
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">
                                    {row.taskPriority}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {row.pendingTasks}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {row.timeLapsed}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {row.timeToFinish}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
