import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../store/store";

export default function EditTaskModal({ task, onClose }) {
  const [taskText, setTaskText] = useState(task.text || "");
  const [taskDate, setTaskDate] = useState(task.date || "");
  const [taskTime, setTaskTime] = useState(task.time || "");
  const [priority, setPriority] = useState(task.priority || "Medium");
  const dispatch = useDispatch();

  const handleSaveChanges = () => {
    if (taskText.trim() === "" || taskDate === "" || taskTime === "") return;

    const updatedTask = {
      ...task,
      text: taskText,
      date: taskDate,
      time: taskTime,
      priority,
    };

    dispatch(editTask(task.firebaseKey, updatedTask));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Task Description:</label>
          <textarea
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 rounded p-2 text-black resize-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Time:</label>
          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-black"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
