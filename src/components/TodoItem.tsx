import { useState, useRef, useEffect } from "react";

type Props = {
  id: number;
  completed: boolean;
  text: string;
  deleteTodoFunc: (id: number) => void;
  toggleCompletedFunc: (id: number) => void;
  editTodoFunc: (id: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function TodoItem({
  id,
  completed,
  text,
  deleteTodoFunc,
  toggleCompletedFunc,
  editTodoFunc,
  editingId,
  setEditingId,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId === id && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  return (
    <div className="relative select-none">
      <li className="relative flex items-center justify-between h-[3rem] rounded-xl overflow-hidden bg-slate-300/40 shadow-xl shadow-slate-700/30">
        {editingId !== id ? (
          <div
            onClick={() => toggleCompletedFunc(id)}
            className="w-full h-full flex gap-x-2 items-center pl-2 pr-3"
          >
            <input
              type="checkbox"
              // onChange={() => toggleCompletedFunc(id)}
              className="border-none outline-none w-[20px] _h-full aspect-square _rounded-full"
            />
            <p
              className={`${
                completed
                  ? "line-through decoration-slate-800 decoration-[4px] text-8xl"
                  : "no-underline"
              } font-semibold text-xl text-slate-100`}
            >
              {text}
            </p>
          </div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            maxLength={80}
            value={text}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditingId(null);
              }
            }}
            onBlur={() => setEditingId(null)}
            onChange={(e) => editTodoFunc(id, e)}
            className="w-full h-full relative _absolute _top-full _left-0 z-20 px-2 text-lg tracking-wide rounded-xl bg-white outline-none border-2 border-amber-500 shadow-2xl shadow-indigo-600/40"
          />
        )}
        <button
          onClick={() => setEditingId(id)}
          className="relative z-30 h-full font-bold cursor-pointer px-7 py-2 bg-amber-500 text-white"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTodoFunc(id)}
          className="relative z-30 h-full font-bold cursor-pointer px-7 py-2 bg-rose-500 text-white"
        >
          Delete
        </button>
      </li>
    </div>
  );
}
