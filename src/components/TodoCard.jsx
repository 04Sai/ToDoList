import React from "react";
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

const TodoCard = ({
  list,
  isDeletedView = false,
  onAddTask,
  viewMode = "grid",
}) => {
  const {
    toggleTaskDone,
    toggleTaskStarred,
    markTaskDeleted,
    restoreTask,
    permanentlyDeleteTask,
    deleteList,
  } = useTodoContext();

  const handleDeleteList = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${list.name}" list and all its tasks?`
      )
    ) {
      deleteList(list.id);
    }
  };

  // List view style with more horizontal layout
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* List Header - positioned above tasks */}
        <div className="bg-[#0B4965] p-4 flex justify-between items-center">
          <h2 className="text-xl font-medium text-white">{list.name}</h2>
          <div className="flex items-center space-x-2">
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

        {/* Tasks - full width below header */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              {list.tasks.length} task{list.tasks.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* The tasks display */}
          {list.tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No tasks in this list
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {list.tasks.map((task) => (
                <li
                  key={task.id}
                  className={`py-3 ${task.done ? "opacity-70" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span
                          className={`${
                            task.done
                              ? "line-through text-gray-500"
                              : "text-gray-800"
                          }`}
                        >
                          {task.name}
                        </span>
                        {task.starred && !isDeletedView && (
                          <BsStarFill className="text-yellow-400 ml-2" />
                        )}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <span>{task.date}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {isDeletedView ? (
                        <>
                          <button
                            onClick={() => restoreTask(list.id, task.id)}
                            className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-opacity-80"
                            title="Restore task"
                          >
                            <BsArrowCounterclockwise className="text-lg" />
                          </button>
                          <button
                            onClick={() =>
                              permanentlyDeleteTask(list.id, task.id)
                            }
                            className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-opacity-80"
                            title="Delete permanently"
                          >
                            <BsX className="text-lg" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => toggleTaskDone(list.id, task.id)}
                            className={`p-1.5 rounded-full ${
                              task.done
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-500"
                            } hover:bg-opacity-80`}
                            title={
                              task.done ? "Mark as undone" : "Mark as done"
                            }
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
                            onClick={() => markTaskDeleted(list.id, task.id)}
                            className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-600"
                            title="Delete task"
                          >
                            <BsTrash className="text-lg" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  // Default grid view layout
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* List Header */}
      <div className="bg-[#0B4965] p-4 flex justify-between items-center">
        <h2 className="text-xl font-medium text-white">{list.name}</h2>
        <div className="flex items-center space-x-2">
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

      {/* Tasks */}
      <div className="p-4">
        {list.tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No tasks in this list
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {list.tasks.map((task) => (
              <li
                key={task.id}
                className={`py-3 ${task.done ? "opacity-70" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span
                        className={`${
                          task.done
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        }`}
                      >
                        {task.name}
                      </span>
                      {task.starred && !isDeletedView && (
                        <BsStarFill className="text-yellow-400 ml-2" />
                      )}
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <BsCalendar className="mr-1" />
                      <span>{task.date}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {isDeletedView ? (
                      <>
                        <button
                          onClick={() => restoreTask(list.id, task.id)}
                          className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-opacity-80"
                          title="Restore task"
                        >
                          <BsArrowCounterclockwise className="text-lg" />
                        </button>
                        <button
                          onClick={() =>
                            permanentlyDeleteTask(list.id, task.id)
                          }
                          className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-opacity-80"
                          title="Delete permanently"
                        >
                          <BsX className="text-lg" />
                        </button>
                      </>
                    ) : (
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
                          onClick={() => markTaskDeleted(list.id, task.id)}
                          className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-600"
                          title="Delete task"
                        >
                          <BsTrash className="text-lg" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
