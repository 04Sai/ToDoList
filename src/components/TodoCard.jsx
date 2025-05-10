import React, { useState } from "react";
import {
  BsCheckCircle,
  BsTrash,
  BsCalendar,
  BsStar,
  BsStarFill,
  BsArrowCounterclockwise,
  BsX,
  BsPlusLg,
} from "react-icons/bs";
import { useTodoContext } from "../context/TodoContext";
import ConfirmationModal from "./ConfirmationModal";

const TodoCard = ({
  list,
  isDeletedView = false,
  onAddTask,
  viewMode = "grid",
}) => {
  const [showDeleteListModal, setShowDeleteListModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToPermanentlyDelete, setTaskToPermanentlyDelete] = useState(null);

  const {
    toggleTaskDone,
    toggleTaskStarred,
    markTaskDeleted,
    restoreTask,
    permanentlyDeleteTask,
    deleteList,
  } = useTodoContext();

  // Helper functions for task actions
  const handleDeleteList = () => setShowDeleteListModal(true);
  const confirmDeleteList = () => deleteList(list.id);
  const handleDeleteTask = (taskId) => setTaskToDelete(taskId);
  const confirmDeleteTask = () => {
    if (taskToDelete) {
      markTaskDeleted(list.id, taskToDelete);
      setTaskToDelete(null);
    }
  };
  const handlePermanentlyDeleteTask = (taskId) =>
    setTaskToPermanentlyDelete(taskId);
  const confirmPermanentlyDeleteTask = () => {
    if (taskToPermanentlyDelete) {
      permanentlyDeleteTask(list.id, taskToPermanentlyDelete);
      setTaskToPermanentlyDelete(null);
    }
  };

  // Render task action buttons based on view mode
  const renderTaskActions = (task) => {
    if (isDeletedView) {
      return (
        <>
          <button
            onClick={() => restoreTask(list.id, task.id)}
            className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-opacity-80"
            title="Restore task"
          >
            <BsArrowCounterclockwise className="text-lg" />
          </button>
          <button
            onClick={() => handlePermanentlyDeleteTask(task.id)}
            className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-opacity-80"
            title="Delete permanently"
          >
            <BsX className="text-lg" />
          </button>
        </>
      );
    }

    return (
      <>
        <button
          onClick={() => toggleTaskDone(list.id, task.id)}
          className={`p-1.5 rounded-full ${
            task.done
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-500"
          } hover:bg-opacity-80`}
          title={task.done ? "Mark as undone" : "Mark as done"}
        >
          <BsCheckCircle className="text-lg" />
        </button>
        <button
          onClick={() => toggleTaskStarred(list.id, task.id)}
          className={`p-1.5 rounded-full ${
            task.starred
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-100 text-gray-500"
          } hover:bg-opacity-80`}
          title={task.starred ? "Unstar task" : "Star task"}
        >
          {task.starred ? (
            <BsStarFill className="text-lg" />
          ) : (
            <BsStar className="text-lg" />
          )}
        </button>
        <button
          onClick={() => handleDeleteTask(task.id)}
          className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-600"
          title="Delete task"
        >
          <BsTrash className="text-lg" />
        </button>
      </>
    );
  };

  // Header with add/delete buttons
  const renderHeader = () => (
    <div className="bg-[#0B4965] p-4 flex justify-between items-center min-h-[4rem]">
      <h2
        className="text-xl font-medium text-white truncate max-w-[75%]"
        title={list.name}
      >
        {list.name}
      </h2>
      <div className="flex items-center space-x-2 shrink-0 ml-2">
        {!isDeletedView && (
          <>
            <button
              onClick={onAddTask}
              className="text-white bg-[#106688] hover:bg-[#17526a] rounded-full p-1.5"
              title="Add task"
            >
              <BsPlusLg />
            </button>
            <button
              onClick={handleDeleteList}
              className="text-red-400 hover:bg-[#0b3d54] rounded-full p-1.5 transition-colors"
              title="Delete list"
            >
              <BsTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );

  // task content - name, star, date
  const renderTaskContent = (task) => (
    <div className="flex-1">
      <div className="flex items-center">
        <span
          className={`${
            task.done ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {task.name}
        </span>
        {task.starred && !isDeletedView && (
          <BsStarFill className="text-yellow-400 ml-2" />
        )}
      </div>
      <div className="flex items-center mt-1 text-sm text-gray-500">
        {viewMode === "grid" && <BsCalendar className="mr-1" />}
        <span>{task.date}</span>
      </div>
    </div>
  );

  // tasks list
  const renderTasks = () => (
    <div className="p-4">
      {viewMode === "list" && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {list.tasks.length} task{list.tasks.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {list.tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks in this list</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {list.tasks.map((task) => (
            <li
              key={task.id}
              className={`py-3 ${task.done ? "opacity-70" : ""}`}
            >
              <div className="flex items-center justify-between">
                {renderTaskContent(task)}
                <div className="flex space-x-2">{renderTaskActions(task)}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  // confirmation modals
  const renderConfirmationModals = () => (
    <>
      <ConfirmationModal
        isOpen={showDeleteListModal}
        onClose={() => setShowDeleteListModal(false)}
        onConfirm={confirmDeleteList}
        title="Delete List"
        message={`Are you sure you want to delete "${list.name}" list and all its tasks?`}
      />

      <ConfirmationModal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={confirmDeleteTask}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
      />

      <ConfirmationModal
        isOpen={!!taskToPermanentlyDelete}
        onClose={() => setTaskToPermanentlyDelete(null)}
        onConfirm={confirmPermanentlyDeleteTask}
        title="Permanently Delete Task"
        message="This task will be permanently deleted and cannot be recovered. Continue?"
      />
    </>
  );

  // Main
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {renderHeader()}
      {renderTasks()}
      {renderConfirmationModals()}
    </div>
  );
};

export default TodoCard;
