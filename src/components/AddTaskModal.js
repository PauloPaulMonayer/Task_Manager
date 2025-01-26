import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, fetchCategories } from "../store/store";

export default function AddTaskModal({ onClose }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [priority, setPriority] = useState("Medium");
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddTask = () => {
    if (
      text.trim() === "" ||
      category === "" ||
      taskDate === "" ||
      taskTime === ""
    )
      return;

    dispatch(
      addTask({
        id: Date.now(),
        category,
        text,
        date: taskDate,
        time: taskTime,
        priority,
      })
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 md:p-8 rounded shadow w-full sm:w-96 mx-4">
        <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-black"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.firebaseKey} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Task Description:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
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
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
