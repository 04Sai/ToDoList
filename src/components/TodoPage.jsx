import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import TodoCard from "./TodoCard";
import AddTaskModal from "./AddTaskModal";
import { BsGrid, BsListUl } from "react-icons/bs";

const TodoPage = () => {
  const { filteredLists, activeView } = useTodoContext();
  const [addingTaskToList, setAddingTaskToList] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const getTitle = () => {
    switch (activeView) {
      case "starred":
        return "Favorites";
      case "deleted":
        return "Recently Deleted";
      default:
        return "To Do Lists";
    }
  };

  const getEmptyMessage = () => {
    switch (activeView) {
      case "starred":
        return "No favorite tasks";
      case "deleted":
        return "No deleted tasks";
      default:
        return "No tasks yet";
    }
  };

  // Determine if we should show a list based on its tasks
  const shouldShowList = (list) => {
    if (activeView === "deleted" || activeView === "starred") {
      return list.tasks.length > 0;
    }
    return true;
  };

  // Filter out empty lists when in starred or deleted views
  const visibleLists = filteredLists.filter(shouldShowList);

  return (
    <div className="h-full grid-background">
      <div className="max-w-7xl mx-auto sm:py-12 py-[10vh] sm:px-6 lg:px-8">
        {/* Header with title and view options */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#0B4965] shadow-[#052331] shadow-lg text-gray-100 mb-6 px-4 rounded-sm p-[2vh]">
          <h1 className="text-2xl font-bold">{getTitle()}</h1>

          <div className="flex mt-2 sm:mt-0 space-x-2">
            {/* View mode toggles */}
            <button
              className={`px-3 py-1 ${
                viewMode === "grid"
                  ? "bg-[#106688]"
                  : "bg-[#0b3d54] hover:bg-[#106688]"
              } rounded-md flex items-center`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <BsGrid className="mr-1" />
              <span className="text-sm hidden sm:inline">Grid</span>
            </button>

            <button
              className={`px-3 py-1 ${
                viewMode === "list"
                  ? "bg-[#106688]"
                  : "bg-[#0b3d54] hover:bg-[#106688]"
              } rounded-md flex items-center`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <BsListUl className="mr-1" />
              <span className="text-sm hidden sm:inline">List</span>
            </button>
          </div>
        </div>

        {/* Grid or List layout based on viewMode */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
              : "flex flex-col space-y-4 p-4"
          }
        >
          {visibleLists.length === 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "col-span-full flex flex-col items-center justify-center py-12"
                  : "flex flex-col items-center justify-center py-12"
              }
            >
              <p className="text-gray-500 mb-4">{getEmptyMessage()}</p>
              {activeView === "lists" && (
                <button
                  onClick={() => setAddingTaskToList(filteredLists[0]?.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add your first task
                </button>
              )}
            </div>
          ) : (
            visibleLists.map((list) => (
              <TodoCard
                key={list.id}
                list={list}
                isDeletedView={activeView === "deleted"}
                onAddTask={() => setAddingTaskToList(list.id)}
                viewMode={viewMode}
              />
            ))
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {addingTaskToList && (
        <AddTaskModal
          listId={addingTaskToList}
          isOpen={!!addingTaskToList}
          onClose={() => setAddingTaskToList(null)}
        />
      )}
    </div>
  );
};

export default TodoPage;
