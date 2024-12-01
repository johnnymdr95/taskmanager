const { pool } = require("../db");

async function getDashboardStats(req, res) {
  const userId = req.userId;

  // Total tasks count
  const totalTasksResult = await pool.query(
    "SELECT COUNT(*) FROM tasks.tasks WHERE user_id = $1",
    [userId]
  );

  // Count of completed and pending tasks
  const completedTasksResult = await pool.query(
    "SELECT COUNT(*) FROM tasks.tasks WHERE user_id = $1 AND status = $2",
    [userId, "finished"]
  );
  const pendingTasksResult = await pool.query(
    "SELECT COUNT(*) FROM tasks.tasks WHERE user_id = $1 AND status = $2",
    [userId, "pending"]
  );

  // Time calculations
  const timeLapsedResult = await pool.query(
    "SELECT * FROM tasks.tasks WHERE user_id = $1",
    [userId]
  );

  let totalTimeLapsed = 0;
  let totalEstimatedTimeLeft = 0;
  let totalCompletedTime = 0;
  let completedTaskCount = 0;

  // Initialize the table rows array
  const tableRows = {};

  timeLapsedResult.rows.forEach((task) => {
    const currentTime = new Date();
    const startTime = new Date(task.start_time);
    const endTime = new Date(task.end_time);

    if (!tableRows[task.priority]) {
      tableRows[task.priority] = {
        pendingTasks: 0,
        timeLapsed: 0,
        timeToFinish: 0,
      };
    }

    if (task.status === "finished") {
      totalCompletedTime += (endTime - startTime) / 1000 / 60 / 60; // in hours
      completedTaskCount++;
    } else {
      const timeLapsed = (currentTime - startTime) / 1000 / 60 / 60; // in hours
      totalTimeLapsed += timeLapsed;

      const estimatedTimeLeft = (endTime - currentTime) / 1000 / 60 / 60; // in hours
      totalEstimatedTimeLeft += Math.max(estimatedTimeLeft, 0); // prevent negative values

      tableRows[task.priority].pendingTasks +=
        task.status === "pending" ? 1 : 0;
      tableRows[task.priority].timeLapsed +=
        task.status !== "pending"
          ? (currentTime - startTime) / 1000 / 60 / 60
          : 0;
      tableRows[task.priority].timeToFinish +=
        task.status !== "finished"
          ? (endTime - currentTime) / 1000 / 60 / 60
          : 0;
    }
  });

  // Average completion time for completed tasks
  const averageCompletionTime =
    completedTaskCount > 0 ? totalCompletedTime / completedTaskCount : 0;

  const tableData = Object.keys(tableRows).map((priority) => {
    const { pendingTasks, timeLapsed, timeToFinish } = tableRows[priority];
    return {
      taskPriority: priority,
      pendingTasks,
      timeLapsed: timeLapsed.toFixed(2),
      timeToFinish: timeToFinish.toFixed(2),
    };
  });

  res.json({
    totalTasks: totalTasksResult.rows[0].count,
    completedTasks: completedTasksResult.rows[0].count,
    pendingTasks: pendingTasksResult.rows[0].count,
    completedTaskPercentage:
      (completedTasksResult.rows[0].count / totalTasksResult.rows[0].count) *
      100,
    PendingTaskPercentage:
      (pendingTasksResult.rows[0].count / totalTasksResult.rows[0].count) * 100,
    totalTimeLapsed,
    totalEstimatedTimeLeft,
    averageCompletionTime,
    tableData,
  });
}

module.exports = { getDashboardStats };
