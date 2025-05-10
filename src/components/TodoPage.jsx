import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import TodoCard from "./TodoCard";
import AddTaskModal from "./AddTaskModal";
import PageHeader from "./PageHeader";

const TodoPage = () => {
  const {
    filteredLists,
    activeView,
    sortOption,
    setSortOption,
    completionFilter,
  } = useTodoContext();

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
    let baseMessage = "";

    switch (activeView) {
      case "starred":
        baseMessage = "No favorite tasks";
        break;
      case "deleted":
        baseMessage = "No deleted tasks";
        break;
      default:
        baseMessage = "No tasks";
        break;
    }

    if (completionFilter !== "all" && activeView !== "deleted") {
      const filterText =
        completionFilter === "completed" ? "completed" : "to-do";
      return `No ${filterText} tasks found`;
    }

    return baseMessage;
  };

  const shouldShowList = (list) => {
    if (activeView === "deleted" || activeView === "starred") {
      return list.tasks.length > 0;
    }
    return true;
  };

  const visibleLists = filteredLists.filter(shouldShowList);

  return (
    <div className="h-full grid-background">
      <div className="max-w-7xl mx-auto sm:py-12 py-[10vh] sm:px-6 lg:px-8">
        <PageHeader
          title={getTitle()}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

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
