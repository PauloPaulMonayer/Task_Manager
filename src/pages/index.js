import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import AddTaskModal from "../components/AddTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import DeleteTaskDialog from "../components/DeleteTaskDialog";
import { fetchTasks, deleteTask, fetchCategories } from "../store/store";

export default function Dashboard() {
  const tasks = useSelector((state) => state.tasks);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // שדה חיפוש

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddTaskClick = () => {
    setShowAddModal(true);
  };

  const handleEditTaskClick = (task) => {
    setTaskToEdit(task);
  };

  const handleDeleteTaskClick = (task) => {
    setTaskToDelete(task);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete.firebaseKey));
      setTaskToDelete(null);
    }
  };

  const renderPriority = (priority) => {
    const priorityClasses = {
      High: "high-priority",
      Medium: "medium-priority",
      Low: "low-priority",
    };
    return (
      <span className={priorityClasses[priority]}>{priority} Priority</span>
    );
  };

  // סינון משימות לפי החיפוש
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-700">My Tasks</h2>
          <button onClick={handleAddTaskClick} className="button button-edit">
            + Add Task
          </button>
        </div>

        {/* שדה חיפוש */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        {/* חלק להצגת משימות לפי סדר עדיפויות ותאריכים כרשימה */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Tasks by Priority
          </h2>
          <ul className="divide-y divide-gray-200">
            {[...filteredTasks] // שימוש במשימות מסוננות
              .sort((a, b) => {
                const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                const priorityDiff =
                  priorityOrder[a.priority] - priorityOrder[b.priority];
                if (priorityDiff === 0) {
                  // אם העדיפויות שוות, מיון לפי תאריך
                  return new Date(a.date) - new Date(b.date);
                }
                return priorityDiff;
              })
              .map((task) => (
                <li
                  key={task.firebaseKey}
                  className="py-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-gray-800 font-medium">{task.text}</p>
                    <p className="text-sm text-gray-500">
                      Due Date: {new Date(task.date).toLocaleDateString()} at{" "}
                      {task.time}
                    </p>
                    {renderPriority(task.priority)}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTaskClick(task)}
                      className="button button-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTaskClick(task)}
                      className="button button-delete"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* חלק להצגת משימות לפי קטגוריות */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.firebaseKey}
              className="bg-white p-6 shadow-md rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {category.name}
              </h3>
              {[...filteredTasks]
                .filter((task) => task.category === category.name)
                .sort((a, b) => {
                  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                })
                .map((task) => (
                  <div key={task.firebaseKey} className="task-card mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-800 font-medium">{task.text}</p>
                      {renderPriority(task.priority)}
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEditTaskClick(task)}
                        className="button button-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTaskClick(task)}
                        className="button button-delete"
                      >
                        Delete
                      </button>
                    </div>
                    {task.date && task.time && (
                      <p className="text-sm text-gray-500 mt-2">
                        Due Date: {new Date(task.date).toLocaleDateString()} at{" "}
                        {task.time}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* מודלים */}
        {showAddModal && (
          <AddTaskModal onClose={() => setShowAddModal(false)} />
        )}
        {taskToEdit && (
          <EditTaskModal
            task={taskToEdit}
            onClose={() => setTaskToEdit(null)}
          />
        )}
        {taskToDelete && (
          <DeleteTaskDialog
            task={taskToDelete}
            onCancel={() => setTaskToDelete(null)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </div>
    </div>
  );
}
