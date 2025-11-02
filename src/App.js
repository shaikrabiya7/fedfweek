import React, { useState, useEffect } from "react";
import tasksData from "./tasks.json";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load initial tasks from JSON file
  useEffect(() => {
    setTasks(tasksData);
  }, []);

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const newItem = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };

    setTasks([...tasks, newItem]);
    setNewTask("");
  };

  // Toggle completion
  const toggleTask = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-96">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          📝 To-Do List
        </h1>

        <form onSubmit={addTask} className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border border-gray-300 rounded-l-lg px-3 py-2 w-full focus:outline-none"
            placeholder="Add a new task..."
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 rounded-r-lg hover:bg-indigo-600"
          >
            Add
          </button>
        </form>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found ✅</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-50 p-2 mb-2 rounded-lg"
              >
                <span
                  onClick={() => toggleTask(task.id)}
                  className={`cursor-pointer ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
