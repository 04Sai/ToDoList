import React, { createContext, useState, useContext, useEffect } from "react";
import { initialLists } from "../data/initialData";

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  // Initialize state from localStorage or use default data
  const [todoLists, setTodoLists] = useState(() => {
    const savedLists = localStorage.getItem("todoLists");
    return savedLists ? JSON.parse(savedLists) : initialLists;
  });

  const [activeView, setActiveView] = useState("lists"); // lists, starred, deleted
  const [sortOption, setSortOption] = useState("");

  // Save to localStorage whenever todoLists changes
  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
  }, [todoLists]);

  // Add a new list
  const addList = (listName) => {
    const newList = {
      id: Date.now(),
      name: listName,
      tasks: [],
    };
    setTodoLists([...todoLists, newList]);
  };

  // Delete a list
  const deleteList = (listId) => {
    setTodoLists(todoLists.filter((list) => list.id !== listId));
  };

  // Add a task to a list
  const addTask = (
    listId,
    taskName,
    dueDate = new Date().toISOString().split("T")[0]
  ) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      date: dueDate,
      done: false,
      starred: false,
      deleted: false,
    };

    setTodoLists(
      todoLists.map((list) =>
        list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list
      )
    );
  };

  // Toggle task done status
  const toggleTaskDone = (listId, taskId) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task
              ),
            }
          : list
      )
    );
  };

  // Toggle task starred status
  const toggleTaskStarred = (listId, taskId) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, starred: !task.starred } : task
              ),
            }
          : list
      )
    );
  };

  // Mark task as deleted (soft delete)
  const markTaskDeleted = (listId, taskId) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, deleted: true } : task
              ),
            }
          : list
      )
    );
  };

  // Restore deleted task
  const restoreTask = (listId, taskId) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, deleted: false } : task
              ),
            }
          : list
      )
    );
  };

  // Permanently delete task
  const permanentlyDeleteTask = (listId, taskId) => {
    setTodoLists(
      todoLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
          : list
      )
    );
  };

  // Get filtered tasks based on active view
  const getFilteredTasks = () => {
    let filtered;

    switch (activeView) {
      case "starred":
        filtered = todoLists.map((list) => ({
          ...list,
          tasks: list.tasks.filter((task) => task.starred && !task.deleted),
        }));
        break;
      case "deleted":
        filtered = todoLists.map((list) => ({
          ...list,
          tasks: list.tasks.filter((task) => task.deleted),
        }));
        break;
      default: // "lists"
        filtered = todoLists.map((list) => ({
          ...list,
          tasks: list.tasks.filter((task) => !task.deleted),
        }));
        break;
    }

    // Sort the filtered lists and tasks based on sortOption
    return sortLists(filtered);
  };

  // Sort lists and tasks
  const sortLists = (lists) => {
    if (!sortOption) return lists;

    let sortedLists = [...lists];

    // Sort lists by name if applicable
    if (sortOption === "nameAsc") {
      sortedLists.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "nameDesc") {
      sortedLists.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Sort tasks within each list
    return sortedLists.map((list) => {
      let sortedTasks = [...list.tasks];

      switch (sortOption) {
        case "nameAsc":
          sortedTasks.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "nameDesc":
          sortedTasks.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "dateAsc":
          sortedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "dateDesc":
          sortedTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        default:
          // No sort
          break;
      }

      return { ...list, tasks: sortedTasks };
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todoLists,
        filteredLists: getFilteredTasks(),
        activeView,
        setActiveView,
        sortOption,
        setSortOption,
        addList,
        deleteList,
        addTask,
        toggleTaskDone,
        toggleTaskStarred,
        markTaskDeleted,
        restoreTask,
        permanentlyDeleteTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
