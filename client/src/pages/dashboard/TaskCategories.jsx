import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const taskStatuses = ["Completed", "In Progress", "Not Started"];
const taskPriorities = ["Extreme", "Moderate", "Low"];

const TaskCategories = () => {
  return (
    <div className="rounded-xl shadow-sm text-sm">
      {/* Top Header */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold border-b-2 border-red-500 inline-block">
          Task Categories
        </h2>
        <a href="#" className="text-black underline hover:text-red-500">
          Go Back
        </a>
      </div>

      {/* Add Category Button */}
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm mb-6">
        Add Category
      </button>

      {/* Task Status Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">Task Status</p>
          <button className="text-red-500 hover:text-red-600 text-xs">
            + Add Task Status
          </button>
        </div>
        <div className="overflow-hidden border border-gray-300 rounded-lg bg-white">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">SN</th>
                <th className="p-3 border">Task Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {taskStatuses.map((status, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{status}</td>
                  <td className="p-3 border">
                    <div className="flex space-x-2">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded flex items-center space-x-1 text-xs">
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center space-x-1 text-xs">
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Priority Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">Task Priority</p>
          <button className="text-red-500 hover:text-red-600 text-xs">
            + Add New Priority
          </button>
        </div>
        <div className="overflow-hidden border border-gray-300 rounded-lg bg-white">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">SN</th>
                <th className="p-3 border">Task Priority</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {taskPriorities.map((priority, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{priority}</td>
                  <td className="p-3 border">
                    <div className="flex space-x-2">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded flex items-center space-x-1 text-xs">
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center space-x-1 text-xs">
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskCategories;
