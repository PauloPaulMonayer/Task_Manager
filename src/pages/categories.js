import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, createCategory, fetchTasks } from "../store/store";
import {
  editCategoryInFirebase,
  deleteCategoryWithTasksFromFirebase,
} from "../lib/firebaseTasks";

export default function Categories() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      dispatch(createCategory({ name: categoryName }));
      setCategoryName("");
    }
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setEditName(category.name);
  };

  const handleSaveEdit = async () => {
    if (editName.trim() === "" || !editCategory) return;
    await editCategoryInFirebase(editCategory.firebaseKey, { name: editName });
    setEditCategory(null);
    setEditName("");
    dispatch(fetchCategories());
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      await deleteCategoryWithTasksFromFirebase(categoryToDelete.name);
      setCategoryToDelete(null);
      dispatch(fetchCategories());
      dispatch(fetchTasks());
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Categories</h1>

        {/* Add New Category */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 border p-3 rounded text-black shadow-sm"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 shadow"
          >
            Add Category
          </button>
        </div>

        {/* Display Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.firebaseKey}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              {editCategory &&
              editCategory.firebaseKey === category.firebaseKey ? (
                <div>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border p-2 rounded w-full mb-3 text-black"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditCategory(null)}
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {category.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setCategoryToDelete(category)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Confirm Delete Modal */}
        {categoryToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-80">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Confirm Delete
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the category "
                {categoryToDelete.name}" and all its tasks?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCategoryToDelete(null)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
