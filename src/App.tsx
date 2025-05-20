import { useState } from "react";
import TodoItem from "./components/TodoItem";
import { motion, Reorder } from "framer-motion";

type Todo = {
  id: number;
  completed: boolean;
  text: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  function addTodoFunc() {
    const clearInput = todoText.trim();

    if (clearInput !== "") {
      const todo: Todo = {
        id: Date.now(),
        completed: false,
        text: todoText,
      };

      setTodos([...todos, todo]);
      setTodoText("");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addTodoFunc();
    }
  }

  function setTodoTextFunc(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoText(e.target.value);
  }

  function deleteTodoFunc(id: number) {
    const filteredTodos = todos.filter((todo) => id !== todo.id);
    setTodos(filteredTodos);
  }

  function toggleCompletedFunc(id: number) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function editTodoFunc(id: number, e: React.ChangeEvent<HTMLInputElement>) {
    const editedText = e.target.value;
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: editedText };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div className="w-full h-screen bg-[url(/images/13.jpg)] bg-cover bg-center _bg-gray-900 flex items-center justify-center">
      <div className="px-4 py-4">
        <div className="flex flex-col items-center gap-x-12 px-8 py-8 rounded-3xl shadow-indigo-950/85 shadow-2xl border-[1px] border-rose-300 backdrop-blur-[10px] bg-slate-700/20">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-white text-center">
            Welcome to Todo App!
          </h1>
          <div className="h-[2rem] xl:h-[3rem] mt-12 w-full mx-auto flex items-center justify-center  gap-x-4">
            <input
              type="text"
              maxLength={55}
              onChange={setTodoTextFunc}
              onKeyDown={handleKeyDown}
              value={todoText}
              placeholder="Enter What You Want To Do..."
              className="w-full h-full outline-0 bg-slate-600/50 rounded-xl text-white caret-amber-500 px-3 py-2 text-xl shadow-xl shadow-indigo-950/40"
            />
            <button
              onClick={addTodoFunc}
              className="h-full font-bold text-sm lg:text-xl cursor-pointer px-7 py-2 bg-amber-400/40 rounded-xl text-white"
            >
              Add
            </button>
          </div>
        </div>
        <div className="mt-12">
          <Reorder.Group
            axis="y"
            values={todos}
            onReorder={setTodos}
            className="flex flex-col gap-y-4"
          >
            {todos.map((todo) => (
              <Reorder.Item
                key={todo.id}
                value={todo}
                className="cursor-grab active:cursor-grabbing"
                layout
                transition={{ duration: 0.25 }}
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                whileDrag={{ scale: 1.03 }}
                exit={{ scale: 1 }}
              >
                <TodoItem
                  id={todo.id}
                  completed={todo.completed}
                  text={todo.text}
                  deleteTodoFunc={deleteTodoFunc}
                  toggleCompletedFunc={toggleCompletedFunc}
                  editTodoFunc={editTodoFunc}
                  setEditingId={setEditingId}
                  editingId={editingId}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
    </div>
  );
}

export default App;
