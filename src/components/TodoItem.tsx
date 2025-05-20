import { useState, useRef, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

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
  }, [editingId, id]);

  return (
    <div className="relative select-none">
      <li className="relative flex items-center justify-between h-[3rem] rounded-xl overflow-hidden bg-slate-700/40 _bg-slate-300/40 backdrop-blur-[8px] shadow-xl shadow-slate-900/50">
        {editingId !== id ? (
          <div
            // onClick={() => toggleCompletedFunc(id)}
            className="w-full h-full flex gap-x-2 items-center pl-2 pr-3"
          >
            <input
              type="checkbox"
              checked={completed}
              onChange={() => toggleCompletedFunc(id)}
              className="cursor-pointer border-none outline-none w-[20px] _h-full aspect-square _rounded-full"
            />
            <p
              className={`${
                completed
                  ? "line-through decoration-slate-700 decoration-[4px] text-8xl text-slate-400"
                  : "no-underline"
              } font-semibold text-sm lg:text-xl xl:text-2xl text-slate-100 line-clamp-1`}
            >
              {text}
            </p>
          </div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            maxLength={55}
            value={text}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditingId(null);
              }
            }}
            onBlur={() => setEditingId(null)}
            onChange={(e) => editTodoFunc(id, e)}
            className="w-full h-full relative _absolute _top-full _left-0 z-20 px-2 text-xl tracking-wide rounded-xl bg-amber-500/20 outline-none border-2 border-amber-500 shadow-2xl shadow-indigo-600/40 text-white"
          />
        )}
        <button
          onClick={() => setEditingId(id)}
          className="relative z-30 h-[70%] _h-full rounded-2xl font-bold cursor-pointer px-3 lg:px-3 xl:px-5 py-2 bg-amber-900/20 _bg-amber-500 text-white text-sm lg:text-lg xl:text-xl flex items-center justify-center border-[1px] border-amber-400"
        >
          <FaEdit className="text-amber-400" />
        </button>
        <button
          onClick={() => deleteTodoFunc(id)}
          className="relative z-30 h-[70%] _h-full rounded-2xl font-bold cursor-pointer px-3 lg:px-3 xl:px-5 py-2 bg-rose-900/15 text-white text-sm lg:text-lg xl:text-xl mx-3 border-[1px] border-rose-400"
        >
          <FaTrashAlt className="text-rose-300" />
        </button>
      </li>
    </div>
  );
}
