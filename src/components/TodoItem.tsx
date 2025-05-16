type Props = {
  id: number;
  completed: boolean;
  text: string;
  deleteTodoFunc: (id: number) => void;
  toggleCompletedFunc: (id: number) => void;
};

export default function TodoItem({
  id,
  completed,
  text,
  deleteTodoFunc,
  toggleCompletedFunc,
}: Props) {
  //   function completedFunc(comp: boolean) {
  //     // completed = !completed;
  //     comp = true;
  //     alert("bruh");
  //   }

  return (
    <div className="select-none">
      <li className="flex items-center justify-between h-[3rem] rounded-xl overflow-hidden bg-slate-600/20 shadow-xl shadow-slate-700/30">
        <div
          onClick={() => toggleCompletedFunc(id)}
          className="w-full h-full flex gap-x-2 items-center pl-2"
        >
          <input
            type="checkbox"
            // onChange={() => toggleCompletedFunc(id)}
            className="border-none outline-none w-[20px] _h-full aspect-square _rounded-full"
          />
          <p
            className={`${
              completed
                ? "line-through decoration-slate-800 decoration-[4px] text-slate-500 text-8xl"
                : "no-underline"
            } font-semibold text-xl`}
          >
            {text}
          </p>
        </div>
        <button
          onClick={() => deleteTodoFunc(id)}
          className="h-full font-bold cursor-pointer px-7 py-2 bg-rose-500 text-white"
        >
          Delete
        </button>
      </li>
    </div>
  );
}
