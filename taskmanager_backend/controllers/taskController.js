const { pool } = require("../db");

// create task
async function createTask(req, res) {
  try {
    const { title, start_time, end_time, priority } = req.body;
    if (
      title == null ||
      start_time == null ||
      end_time == null ||
      priority == null
    ) {
      return res.status(400).json({ message: "Invalid Input" });
    }
    const userId = req.userId;

    const pgStartTime = await dateConverter(start_time);
    const pgEndTime = await dateConverter(end_time);
    const result = await pool.query(
      "INSERT INTO tasks.tasks (title, start_time, end_time, priority, status, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, pgStartTime, pgEndTime, priority, "pending", userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: "Failed To Create New Task", error });
  }
}

// Get tasks with filters
async function getTasks(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const result = await pool.query("SELECT * FROM tasks.tasks WHERE user_id = $1", [userId]);

    res.status(200).json(result.rows);

  } catch (error) {
    res.status(400).json({ message: "Failed To Load Your tasks", error });
  }
}

// update task
async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { end_time, priority, status, title, start_time } = req.body;
    const userId = req.userId;

    const result = await pool.query(
      `UPDATE tasks.tasks
     SET
      title = COALESCE($6, title),
      start_time = COALESCE($7, start_time),
      end_time = COALESCE($1, end_time),
      priority = COALESCE($2, priority),
      status = COALESCE($3, status)
     WHERE id = $4 AND user_id = $5
     RETURNING *`,
      [end_time, priority, status, id, userId, title, start_time]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    res.status(400).json({ message: "Unable to Update the Task", error });
  }
}

// Delete task
async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const result = await pool.query(
      "DELETE FROM tasks.tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "failed to Delete Task", error });
  }
}

module.exports = { createTask, getTasks, updateTask, deleteTask };

async function dateConverter(dateString) {
  const [day, month, yearTime] = dateString.split("/"); // Split date parts
  const [year, time] = yearTime.split(" "); // Split year and time
  const [hours, minutes] = time.split(":"); // Split time into hours and minutes
  const jsDate = new Date(year, month - 1, day, hours, minutes); // Create Date object

  if (isNaN(jsDate.getTime())) {
    throw new Error("Invalid date format");
  }
  return await convertToISTFormat(jsDate); // Return the JavaScript Date object
}

async function convertToISTFormat(isoDateString) {
  const date = new Date(isoDateString); // Parse the ISO date string

  // Get UTC time and convert to IST by adding the offset (5 hours 30 minutes)
  const IST_OFFSET_MINUTES = 330; // +5:30 in minutes
  const istDate = new Date(date.getTime() + IST_OFFSET_MINUTES * 60 * 1000);

  // Format components for the final string
  const year = istDate.getFullYear();
  const month = String(istDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(istDate.getDate()).padStart(2, "0");
  const hours = String(istDate.getHours()).padStart(2, "0");
  const minutes = String(istDate.getMinutes()).padStart(2, "0");
  const seconds = String(istDate.getSeconds()).padStart(2, "0");
  const milliseconds = String(istDate.getMilliseconds()).padStart(3, "0");

  // Add timezone offset (+0530)
  const timezoneOffset = "+0530";

  // Combine components into the desired format
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds} ${timezoneOffset}`;
}
