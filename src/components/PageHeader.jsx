import React from "react";
import {
  BsGrid,
  BsListUl,
  BsSortAlphaDown,
  BsSortAlphaUp,
  BsSortDown,
  BsSortUp,
  BsCheckCircle,
  BsCircle,
  BsFilterCircle,
} from "react-icons/bs";
import { useTodoContext } from "../context/TodoContext";

const PageHeader = ({
  title,
  viewMode,
  setViewMode,
  sortOption,
  setSortOption,
}) => {
  const { completionFilter, setCompletionFilter } = useTodoContext();

  // Sorting options
  const sortOptions = [
    {
      id: "nameAsc",
      label: "Name (A-Z)",
      icon: <BsSortAlphaDown className="mr-2" />,
    },
    {
      id: "nameDesc",
      label: "Name (Z-A)",
      icon: <BsSortAlphaUp className="mr-2" />,
    },
    {
      id: "dateAsc",
      label: "Date (Oldest)",
      icon: <BsSortDown className="mr-2" />,
    },
    {
      id: "dateDesc",
      label: "Date (Newest)",
      icon: <BsSortUp className="mr-2" />,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#0B4965] shadow-[#052331] shadow-lg text-gray-100 mb-6 px-4 rounded-sm p-[2vh]">
      <h1 className="text-2xl font-bold">{title}</h1>

      <div className="flex flex-col sm:flex-row sm:space-x-4 mt-2 sm:mt-0">
        {/* Completion filter buttons */}
        <div className="flex space-x-2 mb-2 sm:mb-0">
          <button
            className={`px-3 py-1 rounded-md flex items-center ${
              completionFilter === "all"
                ? "bg-[#106688]"
                : "bg-[#0b3d54] hover:bg-[#106688]"
            }`}
            onClick={() => setCompletionFilter("all")}
            title="Show all tasks"
          >
            <BsFilterCircle className="mr-1" />
            <span className="text-sm">All</span>
          </button>

          <button
            className={`px-3 py-1 rounded-md flex items-center ${
              completionFilter === "completed"
                ? "bg-[#106688]"
                : "bg-[#0b3d54] hover:bg-[#106688]"
            }`}
            onClick={() => setCompletionFilter("completed")}
            title="Show completed tasks"
          >
            <BsCheckCircle className="mr-1" />
            <span className="text-sm">Done</span>
          </button>

          <button
            className={`px-3 py-1 rounded-md flex items-center ${
              completionFilter === "active"
                ? "bg-[#106688]"
                : "bg-[#0b3d54] hover:bg-[#106688]"
            }`}
            onClick={() => setCompletionFilter("active")}
            title="Show active tasks"
          >
            <BsCircle className="mr-1" />
            <span className="text-sm">To Do</span>
          </button>
        </div>

        {/* Sort dropdown */}
        <div className="relative mb-2 sm:mb-0">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-[#0b3d54] text-white rounded-md px-3 py-1 appearance-none cursor-pointer pr-8"
          >
            <option value="">Sort by</option>
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* View mode toggles */}
        <div className="flex space-x-2">
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
    </div>
  );
};

export default PageHeader;
