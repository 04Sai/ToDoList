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
    switch (activeView) {
      case "starred":
        return todoLists.map((list) => ({
          ...list,
          tasks: list.tasks.filter((task) => task.starred && !task.deleted),
        }));
      case "deleted":
        return todoLists.map((list) => ({
          ...list,
          tasks: list.tasks.filter((task) => task.deleted),
        }));
      default: // "lists" (formerly "all")
        return todoLists.map((list) => ({
          ...list,
          tasks: list.tasks.filter((task) => !task.deleted),
        }));
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todoLists,
        filteredLists: getFilteredTasks(),
        activeView,
        setActiveView,
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
