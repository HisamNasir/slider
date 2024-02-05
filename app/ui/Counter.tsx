"use client";
import { useStore } from "../utils/useStore";
function Counter() {
  const { count, increment, decrement } = useStore();
  return (
    <div className=" bg-white p-4 rounded-lg px-8 flex flex-col gap-4">
      <span className="text-3xl text-center">{count}</span>
      <div className=" flex gap-2 text-3xl">
        <button
          className=" bg-slate-300 p-2 px-8 rounded-lg"
          onClick={decrement}
        >
          -
        </button>
        <button
          className=" bg-slate-300 p-2 px-8 rounded-lg"
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
