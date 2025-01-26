import React from "react";

export default function DeleteTaskDialog({ task, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-lg text-black font-semibold mb-4">Delete Task</h2>
        <p className="mb-4 text-gray-700">
          Are you sure you want to delete the task: <strong>{task.text}</strong>
          ?
        </p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(task.firebaseKey)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
