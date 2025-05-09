import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useTodoContext } from "../context/TodoContext";

const AddTaskModal = ({ isOpen, onClose, listId }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { addTask, todoLists } = useTodoContext();

  const listName = todoLists.find((list) => list.id === listId)?.name || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTask(listId, taskName.trim(), taskDate);
      setTaskName("");
      setTaskDate(new Date().toISOString().split("T")[0]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        <div className="bg-white rounded-lg shadow-xl max-w-md w-full z-10 relative">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-medium">Add Task to {listName}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <RxCross1 className="size-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter task name"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="taskDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Due Date
              </label>
              <input
                type="date"
                id="taskDate"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#106688] text-white rounded-md hover:bg-[#17526a]"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
