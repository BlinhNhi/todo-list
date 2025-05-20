import { useState } from "react";
import DarkMode from "./components/DarkMode/DarkMode";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [filter, setFilter] = useState("all");
  return (
    <div className="min-h-screen bg-gray-100 p-6 shadow-md  dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="max-w-xl mx-auto bg-white rounded shadow p-6 ">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4 text-center dark:text-gray-500">Todo App</h1>
          <DarkMode></DarkMode>
        </div>
        <h1 className="text-gray-500 font-bold text-base w-full p-2">Lọc theo:</h1>
        <div className="flex flex-col sm:flex-row gap-2 mb-4 justify-center ">
          <button onClick={() => setFilter("all")} className={`w-full sm:px-4 py-1 rounded  ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 dark:text-gray-500 "}`}>Tất cả</button>
          <button onClick={() => setFilter("active")} className={`w-full sm:px-4 py-1 rounded  ${filter === "active" ? "bg-blue-500 " : "bg-gray-200 dark:text-gray-500"}`}>Chưa hoàn thành</button>
          <button onClick={() => setFilter("completed")} className={`w-full sm:px-4 py-1 rounded  ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200 dark:text-gray-500"}`}>Đã hoàn thành</button>
        </div>
        <TodoInput />
        <TodoList filter={filter} />
      </div>
    </div>
  );
}

export default App;
