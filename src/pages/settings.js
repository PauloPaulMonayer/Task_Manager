import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, clearTasks, clearCategories } from "../store/store";

export default function Settings() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleThemeChange = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all tasks and categories?")) {
      dispatch(clearTasks());
      dispatch(clearCategories());
      alert("All tasks and categories have been cleared!");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
        <div className="bg-white rounded shadow p-6">
          {/* Theme Settings */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Theme Settings
          </h2>
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => handleThemeChange("light")}
              className={`px-4 py-2 rounded ${
                theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Light Mode
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`px-4 py-2 rounded ${
                theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Dark Mode
            </button>
          </div>

          {/* Clear Data */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Data Management
          </h2>
          <button
            onClick={handleClearData}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow"
          >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}
