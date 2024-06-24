import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import DeleteModal from "../components/DeleteModal";
import { useState } from "react";

export default function GamesCard({ game }) {
  const [open, setIsOpen] = useState(false);
  return (
    <div className="w-full flex flex-col gap-2 p-5 rounded-lg border border-zinc-800 bg-[#0d0d0d] relative ">
      <h1 className="text-lg md:text-xl font-bold mb-3">{game.title}</h1>
      <h2 className="text-xs text-zinc-200 font-semibold">{game.genre}</h2>
      <h3 className="text-xs text-zinc-500">{game.platform}</h3>

      <div className="size-[30px] flex justify-center items-center rounded-md bg-zinc-900 border border-zinc-700 absolute -top-4 -right-3 -rotate-2">
        <p className="text-sm font-bold">{game.rating}</p>
      </div>

      <div className="w-full flex justify-end items-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-5 cursor-pointer text-zinc-600 hover:text-zinc-200 transition-all duration-300"
          onClick={() => setIsOpen(true)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>

      <DeleteModal open={open} setIsOpen={setIsOpen} game={game} />
    </div>
  );
}
