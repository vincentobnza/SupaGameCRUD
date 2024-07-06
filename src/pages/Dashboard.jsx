import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import GamesCard from "../components/GamesCard";
import AddForm from "../components/AddForm";

export default function Dashboard() {
  const [fetchError, setFetchError] = useState(null);
  const [games, setGames] = useState(null);

  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    const getGames = async () => {
      try {
        const { data, error } = await supabase.from("gameCollection").select();
        if (error) {
          throw error;
        }
        setGames(data);
        console.log(data);
        setFetchError(null);
      } catch (error) {
        setFetchError("Could not fetch games");
        setGames([]);
        console.error("Error fetching games:", error.message);
      }
    };

    getGames();
  }, []);

  return (
    <div className="w-full min-h-[85vh] flex flex-col items-center p-4 md:p-8">
      <div
        className="w-full h-[150px] border border-zinc-900 rounded-2xl max-w-screen-md mx-auto flex justify-between items-start py-5 px-8"
        id="header"
      >
        <div className="flex flex-col text-left">
          <h3 className="font-black text-sm text-zinc-300 mb-3">Dashboard</h3>
          <h1 className="text-xl md:text-3xl font-black">Your Games</h1>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="text-xs font-medium py-2 px-2 rounded backdrop-blur-sm border border-emerald-600 bg-emerald-800 text-white hover:bg-emerald-600 hover:border-emerald-400 transition-all duration-300"
        >
          Create Game +
        </button>
      </div>

      <AddForm open={open} setIsOpen={setIsOpen} />

      {fetchError && (
        <div className="text-red-500 text-center">{fetchError}</div>
      )}
      {games && (
        <div className="w-full mt-10  max-w-screen-md mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {games.map((game) => {
            return <GamesCard key={game.id} game={game} />;
          })}
        </div>
      )}
    </div>
  );
}
