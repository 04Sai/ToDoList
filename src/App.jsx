import React, { useState } from "react";
import Navigation from "./components/Navigation";
import TodoPage from "./components/TodoPage";
import { TodoProvider } from "./context/TodoContext";

const App = () => {
  return (
    <TodoProvider>
      <div className="flex h-screen overflow-hidden">
        <Navigation />
        <main className="flex-1 overflow-y-auto">
          <TodoPage />
        </main>
      </div>
    </TodoProvider>
  );
};

export default App;
