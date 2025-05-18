import { useState } from "react";
import TodoItem from "./components/TodoItem";

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
    // e.target.focus();
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
        <div className="flex flex-col items-center gap-x-12 px-4 py-4 rounded-3xl shadow-indigo-950/45 shadow-2xl border-[1px] border-rose-300 backdrop-blur-[10px]">
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
              className="w-full h-full outline-0 bg-slate-600/50 rounded-xl text-white caret-amber-500 px-3 py-2 text-xl shadow-xl shadow-indigo-950/40"
            />
            <button
              onClick={addTodoFunc}
              className="h-full font-bold text-sm lg:text-xl cursor-pointer px-7 py-2 bg-amber-500 rounded-xl text-white"
            >
              Add
            </button>
          </div>
        </div>
        {/* container */}
        <div className="mt-12">
          <ul className="flex flex-col gap-y-4">
            {todos.map((todo, idx) => (
              <TodoItem
                key={idx}
                id={todo.id}
                completed={todo.completed}
                text={todo.text}
                deleteTodoFunc={deleteTodoFunc}
                toggleCompletedFunc={toggleCompletedFunc}
                editTodoFunc={editTodoFunc}
                setEditingId={setEditingId}
                editingId={editingId}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
