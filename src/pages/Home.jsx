import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center "
      id="home-bg"
    >
      <div className="w-full max-w-screen-md mx-auto flex flex-col justify-center items-center p-5 text-center">
        <h1 className="text-2xl md:text-5xl font-black mb-3">
          Game Collection App
        </h1>
        <p className="mt-8 text-sm text-zinc-300">
          The Simple Game Collection App is designed to help users manage their
          personal collection of video games.This project is made with React and
          Supabase.
        </p>
        <Link to="/Dashboard" className="mt-24">
          <button className="bg-emerald-800 border border-emerald-400 rounded text-white text-sm font-bold w-[150px] h-[45px] flex justify-center items-center hover:opacity-80 transition-all duration-200">
            Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
