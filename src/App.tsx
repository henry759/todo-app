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
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
      <div className="px-4 py-4">
        <h1 className="text-6xl font-bold tracking-tight text-white text-center">
          Welcome to Todo App!
        </h1>
        <div className="h-[3rem] mt-12 w-full mx-auto flex items-center justify-center  gap-x-4">
          <input
            type="text"
            onChange={setTodoTextFunc}
            onKeyDown={handleKeyDown}
            value={todoText}
            className="w-full h-full border-2 border-amber-600 outline-0 rounded-xl text-white caret-amber-500 px-2 py-2 text-xl shadow-xl shadow-indigo-800/20"
          />
          <button
            onClick={addTodoFunc}
            className="h-full font-bold cursor-pointer px-7 py-2 bg-amber-500 rounded-xl text-white"
          >
            Add
          </button>
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
